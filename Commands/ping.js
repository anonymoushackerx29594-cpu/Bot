module.exports = {
    name: "ping",
    description: "Affiche la latence du bot",

    async execute(sock, msg, args) {
        const groupe = msg.key.remoteJid;
        const start = Date.now();

        await sock.sendMessage(
            groupe,
            {
                text: "📡 Pinging..."
            },
            {
                quoted: msg
            }
        );

        const latency = Date.now() - start;

        await sock.sendMessage(
            groupe,
            {
                text: `🚀 King Network\n\n⚡ Latence : ${latency} ms`
            },
            {
                quoted: msg
            }
        );
    }
};
