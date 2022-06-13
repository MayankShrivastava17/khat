const path = require('path');
const http = require('http');
const express = require('express');
const socketio = require('socket.io');
const formatMessage = require('./utils/message');
const {
    userJoin,
    getCurrentUser,
    userLeave,
    getRoomUsers
} = require('./utils/users');

const app = express();
const server = http.createServer(app);
const io = socketio(server);
const nodemailer = require('nodemailer');
const {
    google
} = require('googleapis');
const bodyParser = require('body-parser');
app.use(bodyParser());

// Set static folder
app.use(express.static(path.join(__dirname, 'views')));


// redirect to home page 
app.get("/", function (req, res) {
    res.redirect('index.html');
});

// redirect to signup page 
app.get('/signup', function (req, res) {
    res.redirect('signup.html');
});

// redirect to login page 
app.get('/login', function (req, res) {
    res.redirect('login.html');
});

// redirect to login page 
app.get('/secret', function (req, res) {
    res.redirect('after-login.html');
});

app.post('/send', function (req, res) {

    const To = req.body.To;
    const Subject = 'Come lets join on Khat';
    const Message = req.body.Message;
    const code = req.body.Code;
    myFunction(To, Subject, Message, code);
    res.redirect('enter-chat-room.html');

});



// redirect to chat room 
app.get('/chat', function (req, res) {
    res.redirect('chat.html');
});

// redirect to prechat room
app.get('/prechat', function (req, res) {
    res.redirect('enter-chat-room.html');
});






const botName = 'Khat Bot';

// Run when client connects
io.on('connection', socket => {
    socket.on('joinRoom', ({
        username,
        room
    }) => {
        const user = userJoin(socket.id, username, room);

        socket.join(user.room);

        // Welcome current user
        socket.emit('message', formatMessage(botName, 'Welcome to ChatCord!'));

        // Broadcast when a user connects
        socket.broadcast
            .to(user.room)
            .emit(
                'message',
                formatMessage(botName, `${user.username} has joined the chat`)
            );

        // Send users and room info
        io.to(user.room).emit('roomUsers', {
            room: user.room,
            users: getRoomUsers(user.room)
        });
    });

    // Listen for chatMessage
    socket.on('chatMessage', msg => {
        const user = getCurrentUser(socket.id);

        io.to(user.room).emit('message', formatMessage(user.username, msg));
    });

    // Runs when client disconnects
    socket.on('disconnect', () => {
        const user = userLeave(socket.id);

        if (user) {
            io.to(user.room).emit(
                'message',
                formatMessage(botName, `${user.username} has left the chat`)
            );

            // Send users and room info
            io.to(user.room).emit('roomUsers', {
                room: user.room,
                users: getRoomUsers(user.room)
            });
        }
    });
});



const PORT = process.env.PORT || 3000;

server.listen(PORT, () => console.log(`Server running on port ${PORT}`));


//OAuth details
const CLIENT_ID = '707895967980-g6t3plkggnb1c19i1h8q9ei5ljo5nbs1.apps.googleusercontent.com'
const CLEINT_SECRET = '-60bUG_BnYE_xaUWD6GtLcSk'
const REDIRECT_URI = 'https://developers.google.com/oauthplayground';
// const REFRESH_TOKEN = '1//04XoEFHZ1Ing3CgYIARAAGAQSNwF-L9IrxlxFdIKnlgPxMAQbIUPiXV8MQm8KljODoxtJDmp1Qg4HAh3g07Otg_Rib91MV-mCAKQ';
const REFRESH_TOKEN = '1//04Ll9AtRl8s3gCgYIARAAGAQSNwF-L9IrG5hGN2eJGV-18KlKZ5wEsC29fCfCRCIqkDMN8LXkh4whyaFdRUYj0QAhYvpTyU907Kg'

// Sending Email





function myFunction(To, Subject, Message, code) {
    console.log("Sending Mail.....");




    const oAuth2Client = new google.auth.OAuth2(CLIENT_ID, CLEINT_SECRET, REDIRECT_URI);
    oAuth2Client.setCredentials({
        refresh_token: REFRESH_TOKEN
    });

    async function sendMail() {
        try {
            const accessToken = await oAuth2Client.getAccessToken()

            const transport = nodemailer.createTransport({
                service: 'gmail',
                auth: {
                    type: 'OAuth2',
                    user: 'join.khat@gmail.com',
                    clientId: CLIENT_ID,
                    clientSecret: CLEINT_SECRET,
                    refreshToken: REFRESH_TOKEN,
                    accessToken: accessToken
                }
            })



            const mailOptions = {
                from: 'Khat-Messaging,<join.khat@gmail.com>',
                to: To,
                subject: Subject,
                text: Message + '.\nThe code for joining is ' + code,
                //html: '<p> </p>'

            };


            const result = await transport.sendMail(mailOptions)
            return result


        } catch (error) {
            return error
        }
    }


    sendMail()
        .then((result) => console.log('Mail sent.... ', result))
        .catch((error) => console.log(error.message));
}
