require("dotenv").config({ path: ".local.env" });
const mongoose = require("mongoose");
const router = require("./routes/index");
const express = require("express");
const app = express();

mongoose
    .connect(process.env.MONGODB_URI, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    })
    .then(() => {
        console.log("Connected to database");
    })
    .catch((err) => {
        console.log("Not Connected to database", err);
    });

app.listen(3000, () => {
    console.log("Server is running on port 3000");
});

app.use(express.json());
app.use("/api", router);
