module.exports = {

    name: "add",

    description: "Ajoute un membre au groupe",

    async execute(sock, msg, args) {


        const groupe =
            msg.key.remoteJid;


        if (!groupe.endsWith("@g.us")) {

            return sock.sendMessage(
                groupe,
                {
                    text:
                    "❌ Cette commande fonctionne uniquement dans un groupe."
                }
            );

        }



        const metadata =
            await sock.groupMetadata(groupe);


        const participants =
            metadata.participants;



        // Vérifier si l'utilisateur est admin

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
                    text:
                    "❌ Seuls les administrateurs peuvent utiliser cette commande."
                }
            );

        }



        // Vérifier si un numéro est donné

        if (!args[0]) {

            return sock.sendMessage(
                groupe,
                {
                    text:
                    "⚠️ Exemple : !add 224xxxxxxxxxx"
                }
            );

        }



        let numero =
            args[0].replace(/\D/g, "");



        const jid =
            numero + "@s.whatsapp.net";



        // Vérifier que le bot est admin

        const bot =
    participants.find(
        p =>
        p.id === sock.user.lid ||
        p.phoneNumber === sock.user.id.split(":")[0] + "@s.whatsapp.net"
    );


        if (
            !bot ||
            (
                bot.admin !== "admin" &&
                bot.admin !== "superadmin"
            )
        ) {

            return sock.sendMessage(
                groupe,
                {
                    text:
                    "❌ Je dois être administrateur du groupe."
                }
            );

        }



        await sock.groupParticipantsUpdate(
            groupe,
            [
                jid
            ],
            "add"
        );



        await sock.sendMessage(
            groupe,
            {
                text:
                `✅ +${numero} a été ajouté au groupe.`
            }
        );


    }

};