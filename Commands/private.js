const fs = require("fs");

const config = require("../config");

const db = "./Database/settings.json";


module.exports = {

    name: "private",

    description: "Met le bot en mode privé",

    async execute(sock, msg, args) {


        const sender =
(
    msg.key.participant ||
    msg.key.remoteJid
).split("@")[0];


const ownerNumber =
config.owner.replace(/\D/g, "");


if (
    sender !== ownerNumber &&
    sock.user.id.split(":")[0] !== ownerNumber
) {

            return sock.sendMessage(
                msg.key.remoteJid,
                {
                    text:
                    "❌ Seul le propriétaire peut utiliser cette commande."
                }
            );

        }


        let settings =
            JSON.parse(
                fs.readFileSync(db)
            );


        settings.mode = "private";


        fs.writeFileSync(
            db,
            JSON.stringify(
                settings,
                null,
                2
            )
        );


        await sock.sendMessage(
            msg.key.remoteJid,
            {
                text:
                "🔒 King 👑 Bot est maintenant en mode privé."
            }
        );


    }

};