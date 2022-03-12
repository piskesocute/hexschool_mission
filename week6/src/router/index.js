import { createRouter, createWebHashHistory } from 'vue-router';
import HomeView from '../views/HomeView.vue';

const routes = [
  // {
  //   path: '/',
  //   name: 'home',
  //   component: HomeView,
  // },

  {
    path: '/',
    component: () => import('../views/FrontView.vue'),
    children: [
      {
        path: '',
        name: 'home',
        component: HomeView,
      },
      {
        path: 'products',
        component: () => import('../views/ProductsView.vue'),
      },
      {
        path: 'product/:id',
        component: () => import('../views/ProductView.vue'),
      },
      {
        path: 'cart',
        component: () => import('../views/CartView.vue'),
      },
    ],
  },
  {
    path: '/admin',
    component: () => import('../views/DashboardView.vue'),
    children: [
      {
        path: 'adminproduct',
        component: () => import('../views/AdminProduct.vue'),
      },
      {
        path: 'coupon',
        component: () => import('../views/AdminCoupon.vue'),
      },
    ],
  },

];

const router = createRouter({
  history: createWebHashHistory(),
  routes,
  linkActiveClass: 'active',
});

export default router;
