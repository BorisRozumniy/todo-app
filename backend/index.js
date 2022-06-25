import express from "express";
import config from "config";
import howToRoute from "./routes/howToPage.routes.js";
import todoRoute from "./routes/todo.routes.js";
import mongoose from "mongoose";

const url = "mongodb://localhost:27017/my_test_mongodb";

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use("/api/how-to-page/", howToRoute);
app.get("/api", (req, res) => {
  res.json({ message: "Hello from server!" });
});
app.use(todoRoute);

const PORT = config.get("port") || 5000;

async function start() {
  try {
    mongoose.connect(url, { useNewUrlParser: true });
    app.listen(PORT, () =>
      console.log(`App has been starder on port ${PORT}...`)
    );
  } catch (e) {
    console.log("Server Error", e.message);
    process.exit(1);
  }
}

start();
