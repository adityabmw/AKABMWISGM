require("dotenv").config();

const express = require("express");
const {
default: makeWASocket,
DisconnectReason,
useMultiFileAuthState
} = require("@whiskeysockets/baileys");

const QRCode = require("qrcode");
const { Boom } = require("@hapi/boom");

const app = express();
app.use(express.json());

let sock = null;
let qrText = null;

async function startWhatsApp() {

const { state, saveCreds } =
await useMultiFileAuthState("./auth");

sock = makeWASocket({
auth: state,
printQRInTerminal: true
});

sock.ev.on("creds.update", saveCreds);

sock.ev.on("connection.update", async (update) => {

const { connection, qr, lastDisconnect } = update;

if (qr) {

qrText = qr;

console.log("");
console.log("==============================");
console.log("SCAN QR WHATSAPP");
console.log("==============================");

console.log(
await QRCode.toString(qr,{
type:"terminal",
small:true
})
);

console.log("==============================");
}

if (connection === "open") {

console.log("");
console.log("==============================");
console.log("WhatsApp Connected");
console.log("==============================");
}

if (connection === "close") {

const shouldReconnect =
new Boom(lastDisconnect?.error)
.output?.statusCode !==
DisconnectReason.loggedOut;

console.log("Disconnected");

if (shouldReconnect) {
startWhatsApp();
}

}

});

}

startWhatsApp();

app.get("/", (req, res) => {
    res.send("AKA BMW ISGM WhatsApp API");
});

app.get("/status", (req, res) => {
    res.json({
        connected: sock?.user ? true : false,
        user: sock?.user || null
    });
});

app.get("/qr", (req, res) => {

    if (!qrText) {
        return res.json({
            status: "connected"
        });
    }

    res.json({
        qr: qrText
    });

});

app.post("/send", async (req, res) => {

    try {

        const { number, message } = req.body;

        await sock.sendMessage(
            number + "@s.whatsapp.net",
            {
                text: message
            }
        );

        res.json({
            success: true
        });

    } catch (e) {

        res.status(500).json({
            success: false,
            error: e.message
        });

    }

});

const PORT = process.env.PORT || 3001;

app.listen(PORT, () => {

    console.log("");
    console.log("================================");
    console.log("AKA BMW ISGM");
    console.log("WhatsApp Server Started");
    console.log("http://localhost:" + PORT);
    console.log("================================");

});

