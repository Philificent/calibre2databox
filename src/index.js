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
      var payload = "";
      var payloadDate = req.body.created_at;
      for (var index in req.body.pages) {
        //----------------------------------
        // https://developers.databox.com/api/#data-attributes
        // Databox needs data in the following format:
        // key: 'dom-size',
        // value: 8300,
        // attributes: {
        //  'page': 'Home',
        //  'profile': 'Chrome Desktop'
        // },
        // date: payloadDate
        //----------------------------------

        //console.log("[index].name:", req.body.pages[index].name);
        //console.log("[index].profile:", req.body.pages[index].profile);
        //payload += "{key:" + req.body.pages[index].name + ",value:" + req.body.pages[index].value + "},";

        // so we can loop through pages, but we need to loop through the keys in the page
        var pageName = req.body.pages[index].name;
        var profileName = req.body.pages[index].profile;
        for (var innerdex in req.body.pages[index].metrics) {
          // console.log(
          //   "metrics[innerdex].name:",
          //   req.body.pages[index].metrics[innerdex].name
          // );
          // console.log(
          //   "[innerdex].value:",
          //   req.body.pages[index].metrics[innerdex].value
          // );

          payload +=
            "{ key: " +
            req.body.pages[index].metrics[innerdex].name +
            ",value: " +
            req.body.pages[index].metrics[innerdex].value +
            ",attributes: {" +
            "'page': " +
            pageName +
            ",'profile':" +
            profileName +
            "}," +
            "date: " +
            payloadDate +
            "}";
        }
      }
      res
        .status(200)
        .json({ status: "ok", pages: req.body.pages.length, payload: payload });
      var Databox = require("databox");
      var client = new Databox({
        push_token: process.env.DATABOX_TOKEN
      });
      client.insertAll([payload], function(result) {
        console.log(result);
      });
    } else {
      res.status(200).json({ status: "ok" });
    }
  }
});

app.listen(3000, function() {
  console.log("express started on :3000");
});
