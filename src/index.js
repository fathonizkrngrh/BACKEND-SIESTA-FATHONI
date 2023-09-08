const express = require('express');
const bodyParser = require('body-parser');
const { StatusCodes: status } = require("http-status-codes");

const routes = require("./routes/index.route");
const { apiResponse, apiNotFoundResponse } = require("./utils/apiResponse.util");

const app = express();
const port = process.env.PORT || 3000;

app.use(bodyParser.json());

app.use('/api', routes);

app.get("/", (req, res) => res.status(status.OK).json(
  apiResponse(status.OK, "OK", "This is my API solution for SIESTA Backend Coding Test.")
)
);

app.use((req, res) => res.status(status.NOT_FOUND).json(apiNotFoundResponse('The requested resource could not be found')));

app.use((err, req, res, next) => res.status(status.INTERNAL_SERVER_ERROR).json(
  apiResponse(status.INTERNAL_SERVER_ERROR, "INTERNAL_SERVER_ERROR", err.message)
));

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
