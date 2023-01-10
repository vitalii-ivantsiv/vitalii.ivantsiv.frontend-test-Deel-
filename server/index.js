const express = require("express");
const countries = require("./countries.json");

const PORT = process.env.PORT || 3001;

const app = express();

app.get('/api/v1/autocomplete/countries', ((req, res) => {

  const proposals = countries.filter(c => new RegExp(`^${req.query.country}`, "i").test(c.name))

  return res.send(proposals);
}))

app.listen(PORT, () => {
  console.log(`Server listening on ${PORT}`);
});