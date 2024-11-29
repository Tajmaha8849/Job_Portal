import mongoose from "mongoose";

export const dbConnection=()=>{
    mongoose.connect(process.env.MONGO_URL,{
        dbName:"MERN_STACK_JOB_SEEKING",
    }).then(()=>{
        console.log("Connected to database.")
    }).catch(()=>{
        console.log("Some error ocurred.")
    })
}