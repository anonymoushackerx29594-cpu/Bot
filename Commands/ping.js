module.exports = {
    name: "ping",

    async execute(sock, msg, args) {

        await sock.sendMessage(
            msg.key.remoteJid,
            {
                text: "🏓 Pong ! king Bot est en ligne."
            }
        );

    }
};