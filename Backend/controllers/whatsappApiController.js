const { Client, MessageMedia } = require('whatsapp-web.js');
const qrcode = require('qrcode-terminal'); 
const fs = require('fs');
const SESSION_FILE_PATH = '../session.json';

let sessionData;

if (fs.existsSync(SESSION_FILE_PATH)) {
    sessionData = require(SESSION_FILE_PATH);
}

const client = new Client();

// manage client events

client.on('qr', qr => {
    qrcode.generate(qr, { small: true });
    io.emit('qr', qr);
});

client.on('ready', () => {
    console.log('Client is ready!');
    console.log(client);

    io.emit('ready', {
        logged: true,
        wid: client.info.wid._serialized
    });
});

client.on('authenticated', (session) => {
    sessionData = session;
});

client.on('message', message => {
    io.emit('message', {
        from: message.from,
    });
    console.log('New message from ' + message.from);
});

client.on('message_create', message => {
    io.emit('message_create', true)
});

whatsappApiController = {
    init: (req, res) => {

        client.initialize();

        res.send({status: 200});
    },

    getClientInfo: (req, res) => {
        let clientInfo = {
            name: client.info.pushname,
            wid: client.info.wid._serialized,
            img: undefined
        }

        client.getProfilePicUrl(clientInfo.wid).then(url => {
            clientInfo.img = url;
            res.send(clientInfo);
        });
    },

    fetchChats: (req, res) => {
        client.getChats().then(chats => {
            res.send(chats)
        });
    },

    getProfilePic: (req, res) => {
        let wid = req.params.wid;

        client.getProfilePicUrl(wid).then(url => {
            res.send(url)
        });
    },

    getChatInfo: (req, res) => {
        let wid = req.params.wid;

        let chatInfo = {}

        client.getChatById(wid).then(chat => {
            chatInfo = chat;
            client.getProfilePicUrl(wid).then(data => {
                chatInfo.img = data;
                res.send(chatInfo);
            });
        });
    },

    fetchMessages: (req, res) => {
        let wid = req.params.wid;

        client.getChatById(wid).then(chat => {
            chat.fetchMessages().then(async messages => {
                for (message of messages) {
                    message.contactName = await message.getContact().then(contact => {
                        return contact.name;
                    })
                }
                res.send(messages);
            }).catch(err => console.log(err));
        }).catch(err => console.log(err));
    },

    sendMessage: (req, res) => {
        res.send("send message");
    },

    kill: (req, res) => {
        res.send("kill session");
    },

    client: (req, res) => {
        res.send("render client");
    }
};

module.exports = whatsappApiController;