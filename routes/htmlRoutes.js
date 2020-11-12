var path = require("path");

module.exports = function(app) {
  //redirect everything to the index.html page
  app.get("*", function(req, res) {
    res.sendFile(path.join(__dirname, "../public/index.html"));
  });
};
