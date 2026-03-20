const express = require("express");
const cookieParser = require("cookie-parser");
const cors = require("cors")

const app = express();
app.use(express.json());
app.use(cookieParser());
app.use(cors({
  credentials: true,
  // Vite dev server origin; accept both with/without trailing slash.
  // This prevents CORS from silently failing due to `Origin` header mismatch.
  origin: ["http://localhost:5173", "http://localhost:5173/"]
}))

// Quick request logger (helps debug "Cannot POST" issues)
app.use((req, _res, next) => {
  console.log(`[${new Date().toISOString()}] ${req.method} ${req.originalUrl}`);
  next();
});

/** require routes */
const authRouter = require("./routes/auth.routes");
const postRouter = require("./routes/post.routes");
const userRouter = require("./routes/user.routes");

/** using routes */
app.use("/api/auth", authRouter);
app.use("/api/posts", postRouter);
app.use("/api/users", userRouter);

module.exports = app;
