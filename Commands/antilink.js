const fs = require("fs");

const db = "./Database/antilink.json";

module.exports = {

    name: "antilink",

    description: "Active ou désactive l'antilink",

    async execute(sock, msg, args) {

        const groupe = msg.key.remoteJid;

        if (!groupe.endsWith("@g.us")) {

            return sock.sendMessage(
                groupe,
                {
                    text: "❌ Cette commande fonctionne uniquement dans un groupe."
                }
            );

        }

        const metadata =
            await sock.groupMetadata(groupe);

        const participants =
            metadata.participants;

        const expediteur =
            msg.key.participant;

        const admin =
            participants.find(
                p => p.id === expediteur
            );

        if (
            !admin ||
            (
                admin.admin !== "admin" &&
                admin.admin !== "superadmin"
            )
        ) {

            return sock.sendMessage(
                groupe,
                {
                    text: "❌ Seuls les administrateurs peuvent utiliser cette commande."
                }
            );

        }

        let data =
            JSON.parse(
                fs.readFileSync(db)
            );

        const option =
            args[0]?.toLowerCase();

        if (!option) {

            return sock.sendMessage(
                groupe,
                {
                    text:
                    "Utilisation :\n!antilink on\n!antilink off"
                }
            );

        }

        if (option === "on") {

            if (!data.includes(groupe)) {

                data.push(groupe);

                fs.writeFileSync(
                    db,
                    JSON.stringify(
                        data,
                        null,
                        2
                    )
                );

            }

            return sock.sendMessage(
                groupe,
                {
                    text:
                    "✅ Antilink activé."
                }
            );

        }

        if (option === "off") {

            data =
                data.filter(
                    id => id !== groupe
                );

            fs.writeFileSync(
                db,
                JSON.stringify(
                    data,
                    null,
                    2
                )
            );

            return sock.sendMessage(
                groupe,
                {
                    text:
                    "❌ Antilink désactivé."
                }
            );

        }

        return sock.sendMessage(
            groupe,
            {
                text:
                "Utilisation :\n!antilink on\n!antilink off"
            }
        );

    }

};