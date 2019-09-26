require("dotenv").config();

const server = require("./src/index");
const port = process.env.PORT || 3000;

server.listen(port, () => console.log("listening on port 3000"));
