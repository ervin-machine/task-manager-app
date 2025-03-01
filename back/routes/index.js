const express = require('express');
const authRoutes = require('./auth.route');
const userRoute = require('./user.route');
const taskRoutes = require('./task.route');
const docsRoute = require('./docs.route');
const { NODE_ENV } = require('../config/dotenv')

const router = express.Router();

const defaultRoutes = [
    {
      path: '/api/auth',
      route: authRoutes,
    },
    {
      path: '/api/users',
      route: userRoute,
    },
    {
      path: '/api/task',
      route: taskRoutes,
  },
  ];

const devRoutes = [
  {
    path: '/docs',
    route: docsRoute
  }
];

defaultRoutes.forEach((route) => {
  router.use(route.path, route.route);
});

if (NODE_ENV === 'development') {
  devRoutes.forEach((route) => {
    router.use(route.path, route.route);
  });
}

module.exports = router;