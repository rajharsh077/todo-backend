import express from 'express'
import mongoose from 'mongoose'
import dotenv from 'dotenv'
import cors from 'cors'

dotenv.config()

const app=express();
app.use(cors())
app.use(express.json())

mongoose.connect(process.env.MONGO_URI)
.then(()=>{
    console.log("DB CONNECTED");
}).catch((err)=>{
  console.log(err);
})

const todo=mongoose.model("todo",new mongoose.Schema({
    text:String,
}))

app.get("/todos",async (req,res)=>{
    res.json(await todo.find());
})

app.listen(process.env.PORT,()=>{
    console.log(`running on ${process.env.PORT}`);
})