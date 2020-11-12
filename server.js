var express = require("express");
var app = express();
var path = require("path");

// Sets an initial port. We"ll use this later in our listener
var PORT = 8080;

// Sets up the Express app to handle data parsing
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "public")));
app.use(express.json());

require("./routes/htmlRoutes")(app);

app.listen(PORT, function () {
  console.log("App listening on PORT: http://localhost:" + PORT);
});
