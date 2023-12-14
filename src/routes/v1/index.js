const express = require('express');
const authRoute = require('./auth.route');
const userRoute = require('./user.route');
const lawyerRoute = require('./lawyer.route');
const memberRoute = require('./member.route');
const chatRoute = require('./chat.route');
const categoryRoute = require('./category.route');
const docsRoute = require('./docs.route');
const config = require('../../config/config');

const router = express.Router();

const defaultRoutes = [
  {
    path: '/auth',
    route: authRoute,
  },
  {
    path: '/users',
    route: userRoute,
  },
  {
    path: '/lawyer',
    route: lawyerRoute,
  },
  {
    path: '/member',
    route: memberRoute,
  },
  {
    path: '/chat',
    route: chatRoute,
  },
  {
    path: '/category',
    route: categoryRoute,
  },
];

const devRoutes = [
  // routes available only in development mode
  {
    path: '/docs',
    route: docsRoute,
  },
];

defaultRoutes.forEach((route) => {
  router.use(route.path, route.route);
});

/* istanbul ignore next */
if (config.env === 'development') {
  devRoutes.forEach((route) => {
    router.use(route.path, route.route);
  });
}

module.exports = router;
