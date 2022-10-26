
const express = require('express')
const app = express()
const port = 3001
const cors = require("cors");
const bodyParser = require('body-parser')
const { expressjwt: jwt } = require("express-jwt");
// setting files

// cors
app.use(cors())
// parse form data
app.use(express.urlencoded({ extended: false }));
// parse application/json
app.use(bodyParser.json())

const { secretKey }  = require('./utils/config')
app.use(
  jwt({ secret: secretKey, algorithms: ["HS256"] }).unless({
    path: [
      {url:'/api/register', methods:['POST']},
      {url:'/api/login', methods:['POST']},
      {url:'/api/me', methods:['POST']}
    ],
    // path: [/^\/register/, /^\/login/],
  }),
   (err, req, res, next)=>{
     console.log(req.url,'rrrr');
    if (err.name === "UnauthorizedError") {
      res.status(401).send("invalid token...");
    } else {
      next(err);
    }
   }
);
// use routes
const routes = require('./router/index')
routes(app)
// start serve
app.listen(port, () => console.log(`jira api server running at http://localhost:${port}`))