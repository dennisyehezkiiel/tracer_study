if (process.env.NODE_ENV !== "production") {
    require("dotenv").config();
}
const cors = require("cors");
const express = require("express");
const router = require("./router");

const app = express();
const port = 3000;

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use("/", router);

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
