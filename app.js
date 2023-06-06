require('dotenv').config()
const http = require('http');
let express = require('express');
let bodyParser = require('body-parser')
let cors = require('cors')

const port = process.env.PORT || 8080;

let app = express();

const server = http.createServer(app);



let corsOptions = {
  origin: '*',
  optionsSuccessStatus: 200
}

app.use(cors(corsOptions));
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))

app.use(express.json());
app.use(express.urlencoded({
  extended: true
}));

//v1
const apiRouter = require('./src/api/routes/router');
app.use(apiRouter);

app.get('/test', (req, res) => {
  res.json({
    success: true,
    data: "this is a test data"
  })
})

app.use((req, res, next) => {
  next({
    status: 404,
    message: 'Not Found',
  });
});

app.use((err, req, res, next) => {
  if (err.status === 404) {
    return res.status(400).json({
      status: 404,
      message: 'Not Found',
    });
  }

  if (err.status === 500) {
    return res.status(500).json({
      status: 500,
      message: 'Internal Server Error',
    });
  }
  //next();
});

// connect to Database and after start the server 
const dbService = require("./src/database/connection");
const start = async () => {
  try {
   let connect =  await dbService.serverConnection();
   server.listen(port, () =>
      console.log(`Server is listening on port ${port}...`)
    );
   console.log(connect)

  } catch (error) {
    console.error(error.message);
  }
}

start();

module.exports = server;