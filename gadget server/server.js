
const express = require("express");
const app = express();
const mongoose = require("mongoose");
const cors = require("cors");
const path = require('path');
const fs = require('fs');
const morgan = require('morgan');
const rfs = require('rotating-file-stream');
const cookieParser = require('cookie-parser');
const session = require('express-session');
const User = require("./api/models/User");

const https=require('https');
// const server=https.createServer({key,cert},app);
require("dotenv").config();

// Ensure log directory exists
const logDirectory = path.join(__dirname, 'log');
fs.existsSync(logDirectory) || fs.mkdirSync(logDirectory);

// Create a rotating write stream for logging
const accessLogStream = rfs.createStream('access.log', {
  interval: '1d', // Rotate daily
  path: logDirectory
});

// Setup the logger
app.use(morgan('combined', { stream: accessLogStream }));

// Middleware for CORS and JSON parsing
app.use(
  cors({
    origin: function (origin, callback) {
      console.log("url", process.env.URL);
      const allowedOrigins = process.env.URL;

      if (!origin || allowedOrigins.includes(origin)) {
        callback(null, true);
      } else {
        callback(new Error('Not allowed by CORS'));
      }
    },
    credentials: true
  })
);
app.use(express.json());
app.use(cookieParser());

// Configure session
app.use(session({
  secret: 'af38da72a21577883617dfcacdaa03c2f927e00d3f205286598d4fbcd14a2775', 
  resave: false,
  saveUninitialized: true,
  cookie: { secure: false } 
}));

async function connectionDB(app) {
  try {
    await mongoose.connect(
      process.env.NODE_ENV === "test" ? process.env.MONGO_DB_REMOTE_TEST : process.env.MONGO_DB_REMOTE
      
    );

    // Check if there are no superAdmins in the database
    console.log("Mongodb connected successfully!", process.env.NODE_ENV === "test" ? process.env.MONGO_DB_REMOTE_TEST : process.env.MONGO_DB_REMOTE);

    const superAdminExists = await User.exists({ role: 'super-admin' });
    if (!superAdminExists) {
      // Create a superAdmin user
      const superAdminData = {
        name: "Super Admin",
        email: "superadmin@gmail.com",
        password: "$2a$10$ftbcHodcZtWQ0Bp9gfDZe.cCi6yetoKTL0zVQVHuOtmq4MsJ44g2y", //password
        role: "super-admin"
      };

      await User.create(superAdminData);
      console.log("SuperAdmin created successfully!");
    }
  } catch (error) {
    console.log("Error connecting to MongoDB: " + error);
  }
}

module.exports.initializeApp = async () => {
  await connectionDB();
  app.use(express.static(path.join(__dirname, '/')));

  app.use('/', require('./api/routes/index'));
  return app;
};




