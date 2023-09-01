const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const helmet = require("helmet");
const morgan = require("morgan");
const cors = require("cors");

const authRoute = require("./routes/auth.route");
const userRoute = require("./routes/user.route");
const blogRoute = require("./routes/blog.route");
const commentRoute = require("./routes/comment.route");

dotenv.config();

(async () => {
  try {
    console.log("Connecting to mongo...");

    // Connecting to mongoDb Atlas
    await mongoose.connect(process.env.MONGO_URL, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    console.log("Connected to mongo!");

    const app = express();

    // Middlewares
    app.use(
      cors({
        origin: process.env.FRONTEND,
      })
    );

    app.use(express.json());

    app.use(helmet());

    app.use(morgan("common"));

    app.use("/auth", authRoute);

    app.use("/users", userRoute);

    app.use("/blogs", blogRoute);

    app.use("/comments", commentRoute);

    app.listen(process.env.PORT || 3001, () => {
      console.log("Server running!");
    });
  } catch (err) {
    console.error(err);
    throw err;
  }
})();
