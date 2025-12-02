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

app.post('/todos', async (req,res) => {
    const todo = await todo.create({ text : req.body.text });
    res.json(todo);
})

app.delete("/todo/:id", async (req, res) => {
    await todo.findByIdAndDelete(req.params.id);
    res.json({message : "Deleted"})
})


app.listen(process.env.PORT,()=>{
    console.log(`running on ${process.env.PORT}`);
})