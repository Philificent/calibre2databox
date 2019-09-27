require("dotenv").config();
const url = require("url");
const express = require("express");
const app = express();
const exphbs = require("express-handlebars");

// Register Handlebars view engine
app.engine("handlebars", exphbs());
// Use Handlebars view engine
app.set("view engine", "handlebars");
// config public folder for static asset delivery/routing
app.use(express.static("public"));
// set config for parsing JSON
app.use(express.json({ strict: false, limit: "10mb" }));
app.use((err, req, res, next) => {
  if (err) {
    console.error("Unable to parse", err.message);
    return res.status(500).json({ status: "error" });
  }
  return next();
});

// routes
app.get("/", (req, res) => {
  res.render("index", {
    webhook_url: url.format({
      protocol: req.protocol,
      host: req.get("host"),
      pathname: "webhook"
    })
  });
});

app.post("/webhook", (req, res) => {
  // check to see if the request is empty
  if (Object.keys(req.body).length === 0) {
    // POST was empty... but respond so the client knows the server is alive
    res.status(200).json({ status: "ok" });
  } else {
    // another test to make sure the POST actually has data we want
    if (req.body.hasOwnProperty("pages")) {
      var payloadDate = req.body.created_at;
      var Databox = require("databox");
      var client = new Databox({
        push_token: process.env.DATABOX_TOKEN
      });
      for (var index in req.body.pages) {
        var pageName = req.body.pages[index].name;
        var profileName = req.body.pages[index].profile;

        for (var innerdex in req.body.pages[index].metrics) {
          client.push(
            {
              key: req.body.pages[index].metrics[innerdex].name,
              value: req.body.pages[index].metrics[innerdex].value,
              attributes: {
                page: pageName.toString(),
                profile: profileName,
                date: payloadDate.toString()
              }
            },
            function(result) {
              // server log debugging
              console.log("Response from Databox:", result);
            }
          );
        }
      }
      res.status(200).json({
        status: "ok",
        message: "payload delivered to Databox, check logs for details"
      });
    } else {
      res.status(200).json({ status: "ok" });
    }
  }
});

const port = process.env.PORT || 3000;
app.listen(port, function() {
  console.log("express started on :", port);
});
