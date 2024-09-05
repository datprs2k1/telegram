const express = require('express');
const routers = express.Router();
const RouterData = require('./index');

RouterData.forEach(function (router) {
  try {
    const middlewares = [];
    routers[router.method](router.route, middlewares, function (request, response) {
      return router.action(request, response);
    });
  } catch (error) {
    console.log(router);
    console.error('Init Router Fail\n', error);
    console.log(router);
  }
});

module.exports = routers;
