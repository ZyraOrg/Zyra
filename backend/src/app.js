const express = require("express");
const cors = require("cors");
const helmet = require("helmet");
const morgan = require("morgan");
const cookieParser = require("cookie-parser");
const session = require("express-session");

const authRoutes = require("./routes/auth.routes");
const campaignRoutes = require("./routes/campaign.routes");
const profileRoutes = require("./routes/profile.routes");
const settingsRoutes = require("./routes/settings.routes");
const transactionRoutes = require("./routes/transaction.routes");
const { notFound, errorHandler } = require("./middleware/error.middleware");

const app = express();

app.use(
  cors({
    origin: process.env.FRONTEND_URL || "http://localhost:5173",
    credentials: true,
  }),
);
app.use(helmet());
app.use(morgan("dev"));
app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(
  session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
    cookie: {
      secure: process.env.NODE_ENV === "production",
      httpOnly: true,
      sameSite: process.env.NODE_ENV === "production" ? "none" : "lax",
      maxAge: 10 * 60 * 1000, // 10 mins — only needed during OAuth handshake
    },
  }),
);

app.use("/api/auth", authRoutes);
app.use("/api/campaigns", campaignRoutes);
app.use("/api/profile", profileRoutes);
app.use("/api/settings", settingsRoutes);
app.use("/api/transactions", transactionRoutes);

app.get("/", (req, res) => {
  res.json({ message: "Zyra API is running" });
});

app.get("/ping", (req, res) => {
  res.status(200).send("Server awake");
});

app.use(notFound);
app.use(errorHandler);

module.exports = app;
