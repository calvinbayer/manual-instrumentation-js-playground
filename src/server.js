const tracer = require('dd-trace').init({
  logInjection: true
})
const express = require("express");

const app = express();

app.get("/sum", (req, res) => {
  const a = Number(req.query.a);
  const b = Number(req.query.b);

  if (Number.isNaN(a) || Number.isNaN(b)) {
    return res.status(400).json({ error: "Invalid numbers" });
  }

  return res.json({ result: a + b });
});


app.listen(3001, () => {
  console.log("Server started on port 3001");
});


