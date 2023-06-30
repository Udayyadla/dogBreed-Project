const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
require("dotenv").config();
const cors = require("cors");
const jwt = require("jsonwebtoken");
const User = require("./models/UserSchema");
const app = express();
const bcrypt = require("bcrypt");
const port = process.env.PORT || 4000;
const Auth = require("./Authentication");
app.use(bodyParser.json());
app.use(cors());
mongoose
  .connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("db is connected"))
  .catch((err) => console.log(err));
app.post("/register", async (req, res) => {
  try {
    const { username, password, email } = req.body;

    // Check if the user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "User already exists" });
    }

    // Hash the password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // Create a new user
    const newUser = new User({ username, password: hashedPassword, email });
    await newUser.save();

    res.status(201).json({ message: "User registered successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Registration failed" });
  }
});
app.get("/get", async (req, res) => {
  try {
    let users = await User.find();
    res.status(200).json({ users });
  } catch (err) {
    res.status(500).json({ error: "error in retriving users data" });
  }
});

app.post("/login", async (req, res) => {
  const { email, password } = req.body;
  try {
    let user = await User.findOne({ email });
    if (!user) {
      res.status(400).json({ sucess:"false",message: "user not found" });
    }
    const isPasswordMatch = await bcrypt.compare(password, user.password);
    if (!isPasswordMatch) {
      res.status(400).json({ message: "invalid credentials" });
    }
    const token = jwt.sign({ userId: user._id }, process.env.SECRET_KEY, {
    });

    return res.status(200).json({ success: true, authToken: token });
  } catch (error) {
    res.status(400).json({ success: false });
    console.log(error);
  }
});


app.listen(port, () => console.log(`port is running on ${port}....`));
