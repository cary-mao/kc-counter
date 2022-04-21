import express from "express";

const app = express();

app.use("/get", (req, res) => {
  res.send("get");
});

app.listen(8080, () => {
  console.log("server listening...");
});
