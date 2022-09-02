const express = require("express");
const next = require("next");

const PORT = parseInt(process.env.PORT, 10) || 3000;
const dev = process.env.NODE_ENV !== "production";
const app = next({ dev });
const handle = app.getRequestHandler();

app.prepare().then(() => {
  const app = express();

  app.get("/getme", (req, res) => {
    res.status(200).json({ success: true, message: "Gotted" });
  });

  app.all("*", (req, res) => {
    return handle(req, res);
  });

  app.listen(PORT, () => {
    console.log(`> Ready on http://localhost:${PORT}`);
  });
});
