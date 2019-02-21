export default [
  // user
  {
    path: '/user',
    component: '../layouts/UserLayout',
    routes: [
      { path: '/user', redirect: '/user/login' },
      { path: '/user/login', component: './User/Login' },
      { path: '/user/register', component: './User/Register' },
      { path: '/user/register-result', component: './User/RegisterResult' },
    ],
  },
  // exception
  {
    name: 'exception',
    icon: 'warning',
    path: '/exception',
    hideInMenu: true,
    routes: [
      // exception
      {
        path: '/exception/403',
        name: 'not-permission',
        component: './Exception/403',
      },
      {
        path: '/exception/404',
        name: 'not-find',
        component: './Exception/404',
      },
      {
        path: '/exception/500',
        name: 'server-error',
        component: './Exception/500',
      },
      {
        path: '/exception/trigger',
        name: 'trigger',
        hideInMenu: true,
        component: './Exception/TriggerException',
      },
    ],
  },
  // app
  {
    path: '/',
    component: '../layouts/PanesLayout',
    Routes: ['src/pages/Authorized'],
    authority: ['admin', 'user'],
    routes: [
      // dashboard
      { path: '/', redirect: '/overview' },
      {
        path: '/home',
        name: 'home',
        icon: 'home',
        hideInMenu: true,
        component: './00_HomePage/index',
      },
      {
        path: '/overview',
        name: 'overview',
        icon: 'home',
        component: './10_Overview/index',
        closable: false,
      },
      {
        path: '/project',
        name: 'project',
        icon: 'dashboard',
        routes: [
          {
            path: '/project/amap',
            name: 'amap',
            component: './20_Project/AMap',
            closable: true,
          },
          {
            path: '/project/list',
            name: 'list',
            component: './20_Project/List',
            closable: true,
          },
          {
            path: '/project/new',
            name: 'new',
            hideInMenu: true,
            component: './20_Project/Form',
            closable: true,
          },
          {
            path: '/project/edit/:id',
            name: 'edit',
            hideInMenu: true,
            component: './20_Project/Form',
            closable: true,
          },
          {
            path: '/project/:id',
            name: 'detail',
            hideInMenu: true,
            component: './20_Project/Detail',
            closable: true,
          },
        ],
      },
      {
        component: '404',
      },
    ],
  },
];
