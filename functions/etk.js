import * as functions from "firebase-functions";
import cors from "cors";
const corsHandler = cors({origin:true});
export const etkVIN = functions.https.onRequest((req,res)=>{
  corsHandler(req,res, async ()=>{
    try{
      const url = req.query.url;
      if(!url) return res.status(400).send("Missing url");
      const r = await fetch(url, {headers: {"User-Agent":"AKA-BMW-ISGM/5.0"}});
      const txt = await r.text();
      res.set("Access-Control-Allow-Origin","*");
      res.status(200).send(txt);
    }catch(e){ res.status(500).send(e.message); }
  });
});
export const etkPart = functions.https.onRequest((req,res)=>{
  corsHandler(req,res, async ()=>{
    try{
      const url = req.query.url;
      if(!url) return res.status(400).send("Missing url");
      const r = await fetch(url, {headers: {"User-Agent":"AKA-BMW-ISGM/5.0"}});
      const txt = await r.text();
      res.set("Access-Control-Allow-Origin","*");
      res.status(200).send(txt);
    }catch(e){ res.status(500).send(e.message); }
  });
});
