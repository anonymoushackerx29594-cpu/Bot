const {
    default: makeWASocket,
    useMultiFileAuthState,
    DisconnectReason
} = require("@whiskeysockets/baileys");

const readline = require("readline");
const fs = require("fs");
const antilinkDB =
    "./Database/antilink.json";
const config = require("./Database/settings.json");

// ===============================
// CHARGEMENT DES COMMANDES
// ===============================

const commands = new Map();


if (fs.existsSync("./Commands")) {

    const files = fs.readdirSync("./Commands")
        .filter(file => file.endsWith(".js"));


    for (const file of files) {

        const command = require(
            "./Commands/" + file
        );


        commands.set(
            command.name,
            command
        );


        console.log(
            "✅ Commande chargée :",
            command.name
        );

    }

}


// ===============================
// PREFIXE
// ===============================

const prefix = "!";


// ===============================
// DEMANDER NUMERO
// ===============================

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});


function demanderNumero() {

    return new Promise((resolve) => {

        rl.question(
            "Numéro : ",
            (num) => {

                rl.close();

                resolve(
                    num.replace(/\D/g, "")
                );

            }
        );

    });

}



// ===============================
// DEMARRAGE BOT
// ===============================

async function start() {


    const { state, saveCreds } =
        await useMultiFileAuthState("./Session");



    const sock = makeWASocket({

        auth: state

    });



    sock.ev.on(
        "creds.update",
        saveCreds
    );



    // ===============================
    // PAIRING CODE
    // ===============================

    if (!state.creds.registered) {


        const numero =
            await demanderNumero();



        const code =
            await sock.requestPairingCode(
                numero
            );



        console.log(
            "CODE :",
            code
        );

    }



    // ===============================
    // CONNEXION
    // ===============================

    sock.ev.on(
        "connection.update",
        ({ connection, lastDisconnect }) => {



            if (connection === "open") {

                console.log(
                    "✅ Connecté !"
                );

            }



            if (connection === "close") {


                const reason =
                    lastDisconnect?.error?.output?.statusCode;



                console.log(
                    "Connexion fermée :",
                    reason
                );



                if (
                    reason !== DisconnectReason.loggedOut
                ) {


                    console.log(
                        "🔄 Redémarrage..."
                    );


                    start();


                }

            }

        }
    );




    // ===============================
    // RECEPTION DES MESSAGES
    // ===============================

    sock.ev.on(
        "messages.upsert",
        async ({ messages }) => {


            const msg = messages[0];

// pour l'antilink
if (!msg.message) return;

const groupe =
    msg.key.remoteJid;

const texte =
    msg.message?.conversation ||
    msg.message?.extendedTextMessage?.text ||
    "";

if (
    groupe.endsWith("@g.us") &&
    texte
) {

    const actifs =
        JSON.parse(
            fs.readFileSync(
                antilinkDB
            )
        );

    if (
        actifs.includes(groupe) &&
        texte.includes(
            "chat.whatsapp.com/"
        )
    ) {

        const metadata =
            await sock.groupMetadata(
                groupe
            );

        const participants =
            metadata.participants;

        const auteur =
            msg.key.participant;

        // Ne pas expulser les admins

        const admin =
            participants.find(
                p => p.id === auteur
            );

        if (
            !admin ||
            (
                admin.admin !== "admin" &&
                admin.admin !== "superadmin"
            )
        ) {

            const bot =
                participants.find(
                    p =>
                        p.id === sock.user.lid ||
                        p.phoneNumber ===
                        sock.user.id.split(":")[0] +
                        "@s.whatsapp.net"
                );

            if (
                bot &&
                (
                    bot.admin === "admin" ||
                    bot.admin === "superadmin"
                )
            ) {

                await sock.groupParticipantsUpdate(
                    groupe,
                    [auteur],
                    "remove"
                );

                await sock.sendMessage(
                    groupe,
                    {
                        text:
                        `🚫 @${auteur.split("@")[0]} a été expulsé pour avoir envoyé un lien.`,
                        mentions: [auteur]
                    }
                );

            }

        }

    }

}

            if (!msg.message)
                return;



            const text =
                msg.message.conversation ||
                msg.message.extendedTextMessage?.text ||
                "";



            if (!text.startsWith(prefix))
                return;



            const args =
                text
                .slice(prefix.length)
                .trim()
                .split(/ +/);



            const commandName =
                args.shift()
                .toLowerCase();



            const command =
                commands.get(commandName);



            if (!command)
                return;

              //pour le priver et public
const mode =
JSON.parse(
    fs.readFileSync("./Database/settings.json")
).mode;


const sender =
(
    msg.key.participant ||
    msg.key.remoteJid
).split("@")[0];


if (
    mode === "private" &&
    sender !== config.owner
) {

    return sock.sendMessage(
        msg.key.remoteJid,
        {
            text:
            "🔒 Le bot est en mode privé."
        }
    );

}

            try {


                await command.execute(
                    sock,
                    msg,
                    args
                );
                


            } catch(error) {


                console.log(
                    "Erreur commande :",
                    error
                );


            }


        }
    );


}


start();
