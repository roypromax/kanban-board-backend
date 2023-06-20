const express = require("express");
const cors = require("cors");
const {connection} = require("./configs/db.js");
const {userRouter} = require("./routes/user.routes.js");

const app = express();

app.use(express.json());

app.use(cors());

app.get("/",(req,res)=>{
    res.status(200).send("Kanban Board Backend");
})

app.use("/user",userRouter);

app.listen(8080,async ()=>{
    try {
        await connection;
        console.log("connected to database");
    } catch (error) {
        console.log("Error in connecting to database");
        console.log(error);
    }
    console.log("Server is running at port 8080");
})
