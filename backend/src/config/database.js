const mongoose = require("mongoose")

async function connectToDatabase() {
    await mongoose.connect(process.env.MONGO_URI)
    console.log("connected to mongoDb");
    
}


module.exports=connectToDatabase