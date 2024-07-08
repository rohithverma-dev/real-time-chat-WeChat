const express = require('express');
const dotenv = require('dotenv');
const connectDB = require('./config/database');
const userRoutes = require("./routes/userRoutes")
const chatRoutes = require("./routes/chatRoutes")
const messageRoutes = require("./routes/messageRoutes")
const { notFound, errorHandler } = require("./middleware/errorMiddleware")

const app = express()
dotenv.config({ path: "config/config.env" })

const PORT = process.env.PORT || 4000
app.use(express.json())  // to accept json data from frontend

connectDB()

app.get('/', (req, res) => {
    res.send('Api working fine')
})


app.use('/api/user', userRoutes)
app.use('/api/chat', chatRoutes)
app.use('/api/message', messageRoutes)
app.use(notFound)
app.use(errorHandler)

const server = app.listen(PORT, console.log(`server is listening on port ${PORT}`));
const io = require('socket.io')(server, {     // ignore
    pingTimeout: 60000,    // to save the bandwidth
    cors: {
        origin: "http://localhost:3000",
    }
})




// selectedChat, setSelectedChat,
// user, setUser,
// notification, setNotification,
// chats, setChats,





// socket.emit("setup", user);
// socket.on("connected", () => setSocketConnected(true));
// socket.on("typing", () => setIsTyping(true));
// socket.on("stop typing", () => setIsTyping(false));


// ek baar connection ban gya // tab tak chalega jab tak frontend complitly band nhi ho jata h ( ya to khud hi disconnect ka code bhi likho backend m logout hone par disconnect ka)
io.on("connection", (socket) => {  
    console.log("connect to socket.io");  
    // run always on reload/frontend on useEffect run - emit("setup") - after login
    socket.on("setup", (userData) => {  // useerdata is user/setUser wala user 
        socket.join(userData._id);   // logged_in user._id
        console.log("inside setup --> roomID/userId", userData._id);
        // console.log(userData._id);
        socket.emit("connected");
    });


    socket.on("join chat", (room) => {  // custom event :: room === selectedChat._id
        socket.join(room);   // creating room / chammel
        console.log("User Joined Room: " + room);
    });

    socket.on("typing", (room) => socket.in(room).emit("typing"));  // custom event  room === selectedChat._id
    socket.on("stop typing", (room) => socket.in(room).emit("stop typing"));  // custom event  room === selectedChat._id
    socket.on("new message", (newMessageRecieved) => {   // custom event
        var chat = newMessageRecieved.chat;
        if (!chat.users) return console.log("chat.users not defined");
        chat.users.forEach((user) => {
            if (user._id == newMessageRecieved.sender._id) return;
            socket.in(user._id).emit("message recieved", newMessageRecieved);
        });
    });
    socket.off("setup", () => {
        console.log("USER DISCONNECTED");
        socket.leave(userData._id);
    });
})      




