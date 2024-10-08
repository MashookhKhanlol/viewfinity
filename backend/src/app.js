import express from 'express'
import cookieParser from 'cookie-parser'
import cors from 'cors'
import dotenv from 'dotenv'

dotenv.config();

const app = express()

const allowedOrigins = [
    process.env.CORS_ORIGIN,
  ];
  console.log("")
  const corsOptions = {
    origin: (origin, callback) => {
      if (!origin) {
        return callback(null, true); // Allow requests with no origin (like mobile apps or curl requests)
      }
      if (allowedOrigins.includes(origin)) {
        callback(null, true);
      } else {
        callback(new Error('Not allowed by CORS'));
      }
    },
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'], // Include OPTIONS method
    allowedHeaders: ['Content-Type', 'Authorization'], // Headers that the server allows
    credentials: true
  };
  

app.use(cors(corsOptions))

app.use(express.json({limit : '20mb'}))

app.use(express.urlencoded(
    {
        extended : true,
        limit : '20mb'
    }
))

app.use(express.static("public"))

app.use(cookieParser());


//routes 

import userRouter from '../src/routes/user.routes.js'
import tweetRouter from '../src/routes/tweet.routes.js'
import playlistRouter from '../src/routes/playlist.routes.js'
import dashboardRouter from '../src/routes/dashboard.routes.js'
import videoRouter from '../src/routes/video.routes.js'
import likeRouter from '../src/routes/like.routes.js'
import subscribeRouter from '../src/routes/subscription.routes.js'


app.use("/api/v1/users",userRouter)
app.use("/api/v1/tweets",tweetRouter)
app.use("/api/v1/playlist",playlistRouter)
app.use("/api/v1/dashboard",dashboardRouter)
app.use("/api/v1/videos",videoRouter)
app.use("/api/v1/likes",likeRouter)
app.use("/api/v1/subscribe",subscribeRouter)

app.get("/", (req, res) => {
    res.send("Welcome to Viewfinity API!");
  });

app.use((err, req, res, next) => {
console.error("Error details:", err);
console.error("Request details:", {
    method: req.method,
    url: req.url,
    headers: req.headers,
});

if (err.name === "UnauthorizedError") {
    return res.status(401).json({
    error: "Authentication error",
    details: "Invalid or missing token",
    });
}

if (err.message === "Not allowed by CORS") {
    return res.status(403).json({ error: "CORS error: Origin not allowed" });
}

res.status(err.status || 500).json({ error: "Something went wrong!", details: err.message });
  });

export {app}