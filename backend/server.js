const mongoose = require("mongoose");
const dotenv = require("dotenv");

// Catching uncaught exceptions

process.on("uncaughtException", (err) => {
  console.log(err.name, err.message);
  console.log("UNHANDLED EXCEPTION 💥 Shutting down...");
  process.exit(1);
});

//

dotenv.config({ path: "./config.env" });
const app = require("./app");

const DB = process.env.DATABASE;
mongoose
  .connect(DB, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("DB connection established 😎"));

// START SERVER

const port = process.env.PORT || 8000;
const server = app.listen(port, () =>
  console.log(`Server running on port ${port} 🔥`)
);

//Crash Server
process.on("unhandledRejection", (err) => {
  console.log(err.name, err.message);
  console.log("UNHANDLED REJECTION 💥 Shutting down...");
  server.close(() => {
    process.exit(1);
  });
});
