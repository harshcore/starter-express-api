const express = require("express");
const router = express.Router();
const fs = require("fs");
const path = require("path");

const app = express();
app.use(express.static("public"));

router.get("/download/*", (req, res) => {
  const filePath = req.params[0];
  if (!filePath) {
    return res.status(400).send("File path not provided");
  }
  const fullPath = path.join(__dirname, filePath);

  res.writeHead(200, { "Content-Type": "audio/mp3" });
  fs.exists(fullPath, function (exists) {
    if (exists) {
      var rstream = fs.createReadStream(fullPath);
      rstream.pipe(res);
    } else {
      res.status(400).send("File path not provided");
    }
  });
});

router.get("/", (req, res) => {
  res.json({
    status: __dirname,
  });
});

app.use("/", router);

app.listen(3000, () => {
  console.log("STARTED");
});
