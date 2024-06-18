const express = require('express');
const UserRouter = require("./user.js");
const AccountRouter = require("./account.js");
const mainRouter = express.Router();

mainRouter.use('/user', UserRouter);
mainRouter.use('/account', AccountRouter);

module.exports = mainRouter;
