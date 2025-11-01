const express = require('express')
const app = express();
const cors = require("cors");
app.use(cors());

const urlRoute = require('./routes/url');
//const connectToMongoDB = require('./connect');
const URL = require('./models/url'); 

const mongoose = require('mongoose');
const dotenv = require('dotenv');

dotenv.config();

mongoose.connect(process.env.MONGO_URI)
.then(() => console.log("✅ MongoDB Connected"))
.catch((err) => console.error("❌ Mongo Error:", err));


// connectToMongoDB('mongodb://localhost:27017/short-url').then(()=>{
//     console.log("Connected to MongoDB")
// })

app.use(express.json());
app.use(express.urlencoded({extended: true}))
const PORT =  3000;

app.use('/url', urlRoute)

app.get('/:shortID',async (req,res)=>{
    const shortID = req.params.shortID;
    const entry = await URL.findOneAndUpdate(
        {shortId: shortID},
        {$push: {visitHistory: {timestamp: Date.now()}}}
    )
    if (!entry) {
        return res.status(404).json({ error: "Short URL not found" });
      }
    res.redirect(entry.redirectURL)

})


app.listen(PORT, ()=>{
    console.log("Server started at port 3000")
})