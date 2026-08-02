module.exports = {

    name: "owner",

    description: "Affiche le contact du propriétaire",

    async execute(sock, msg, args) {


        const ownerNumber = "224669094865";


        await sock.sendMessage(
            msg.key.remoteJid,
            {
                contacts: {
                    displayName: "𑲭𑲭𑲭𑲭𑲭𑲭𑲭𑲭𑲭𑲭𑲭𑲭𑲭𑲭𑲭𑲭𑲭𑲭𑲭𑲭𑲭𑲭𑲭𑲭𑲭𑲭𑲭𑲭𑲭𑲭𑲭𑲭𑲭𑲭𑲭𑲭𑲭𑲭𑲭𑲭𑲭 亗K͜͡ɪɴɢウ 🅰🅽🅾🅽🆈🅼🅾🆄🆂",
                    contacts: [
                        {
                            vcard: `BEGIN:VCARD
VERSION:3.0
FN:𑲭𑲭𑲭𑲭𑲭𑲭𑲭𑲭𑲭𑲭𑲭𑲭𑲭𑲭𑲭𑲭𑲭𑲭𑲭𑲭𑲭𑲭𑲭𑲭𑲭𑲭𑲭𑲭𑲭𑲭𑲭𑲭𑲭𑲭𑲭𑲭𑲭𑲭𑲭𑲭𑲭 亗K͜͡ɪɴɢウ 🅰🅽🅾🅽🆈🅼🅾🆄🆂
TEL;type=CELL;type=VOICE:+${ownerNumber}
END:VCARD`
                        }
                    ]
                }
            }
        );


    }

};