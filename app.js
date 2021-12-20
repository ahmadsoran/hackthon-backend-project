import express  from 'express'
import mongoose from 'mongoose'
import dotenv from 'dotenv'
import cors from 'cors'
import userRoute from './src/userRouter/authRoute.js';

dotenv.config('dotenv');

let ENV = process.env


const app = express();
app.get('/' , (req , res)=>{
    res.send('hello')
})
app.use(cors())

DBconnection()
async function DBconnection(){

mongoose.Promise = global.Promise;

await mongoose.connect(ENV.DATABASE_URL, {
    useNewUrlParser: true,

}).then(()=>{console.log('db connected')}).catch((err)=>{console.log(err.message+"connection faild")})


}
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(userRoute)
 app.listen(ENV.PORT , ()=>{
    console.log("server online"+ENV.PORT)
})



const io = socket('loca');

 io.on("connection", (socket) => {
  //for a new user joining the room
  socket.on("joinRoom", ({ username, roomname }) => {
    //* create user
    const p_user = join_User(socket.id, username, roomname);
    console.log(socket.id, "=id");
    socket.join(p_user.room);

    //display a welcome message to the user who have joined a room
    socket.emit("message", {
      userId: p_user.id,
      username: p_user.username,
      text: `Welcome ${p_user.username}`,
    });

    //displays a joined room message to all other room users except that particular user
    socket.broadcast.to(p_user.room).emit("message", {
      userId: p_user.id,
      username: p_user.username,
      text: `${p_user.username} has joined the chat`,
    });
  });

  //user sending message
  socket.on("chat", (text) => {
    //gets the room user and the message sent
    const p_user = get_Current_User(socket.id);

    io.to(p_user.room).emit("message", {
      userId: p_user.id,
      username: p_user.username,
      text: text,
    });
  });

  //when the user exits the room
  socket.on("disconnect", () => {
    //the user is deleted from array of users and a left room message displayed
    const p_user = user_Disconnect(socket.id);

    if (p_user) {
      io.to(p_user.room).emit("message", {
        userId: p_user.id,
        username: p_user.username,
        text: `${p_user.username} has left the room`,
      });
    }
  });
});

export default app

