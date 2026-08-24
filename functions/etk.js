import * as functions from "firebase-functions";
import axios from "axios";
import * as cheerio from "cheerio";

/**
 * ETK Proxy - Mirip bimmerrefs
 * Endpoint: /etk/vin/{vin7}, /etk/part/{partNumber}
 */
export const etkVIN = functions.https.onRequest(async (req, res) => {
  res.set("Access-Control-Allow-Origin", "*");
  const vin7 = req.path.split("/").pop() || req.query.vin;
  if (!vin7) return res.status(400).json({ error: "VIN 7 digit required" });

  try {
    // Proxy ke RealOEM / Bimmercat - contoh pakai bimmercat yang JSON friendly
    const url = `https://bimmercat.com/bmw/en/search/selectCarBrand/${vin7}`;
    const { data } = await axios.get(url, {
      headers: { "User-Agent": "AKA-BMW-ISGM/5.0" }
    });

    // Cache ke Firestore etk_cache
    // await admin.firestore().collection("etk_cache").doc(vin7).set({ data, updatedAt: new Date() });

    res.json({ vin: vin7, source: "bimmercat", data: data.slice(0, 5000) }); // trim biar gak gede
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
});

export const etkPart = functions.https.onRequest(async (req, res) => {
  res.set("Access-Control-Allow-Origin", "*");
  const part = req.query.q || req.path.split("/").pop();
  try {
    const url = `https://www.realoem.com/bmw/enUS/part?id=&q=${part}`;
    const { data: html } = await axios.get(url);
    const $ = cheerio.load(html);
    const results = [];
    $("table tr").each((i, el) => {
      const tds = $(el).find("td");
      if (tds.length > 2) results.push({ part: $(tds[0]).text().trim(), name: $(tds[1]).text().trim() });
    });
    res.json({ part, results: results.slice(0, 20) });
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
});
