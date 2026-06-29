const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const Submission = require("./models/Submission");

const app = express();

// middleware (IMPORTANT: keep this before routes)
app.use(cors());
app.use(express.json());

// MongoDB connection
mongoose.connect(
  "mongodb://boopathin58_db_user:Qq3Ge40ZPtgBWE9j@ac-3o7vhjx-shard-00-00.ptzagpu.mongodb.net:27017,ac-3o7vhjx-shard-00-01.ptzagpu.mongodb.net:27017,ac-3o7vhjx-shard-00-02.ptzagpu.mongodb.net:27017/passwordDB?ssl=true&replicaSet=atlas-jcwynu-shard-0&authSource=admin&retryWrites=true&w=majority&appName=Cluster0"
)
.then(() => console.log("MongoDB Connected"))
.catch((err) => console.log("MongoDB Error:", err));


// ✅ ROUTE: SAVE PASSWORD (FIXED VERSION)
app.post("/save-password", async (req, res) => {
  console.log("BODY:", req.body);

  try {
    const { oldPassword, newPassword } = req.body;

    const newEntry = new Submission({
      oldPassword,
      newPassword
    });

    await newEntry.save();

    res.json({ message: "Saved successfully" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Server error" });
  }
});

// start server
app.listen(process.env.PORT || 5000, () => {
  console.log("Server running on port 5000");
});

app.get("/health", (req, res) => {
    res.status(200).json({
        status: "OK",
        server: "Running"
    });
});
