import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import ProductView from '../views/Product/View.vue'
import ProductCreateView from '../views/Product/Create.vue'
import ProductEditView from '../views/Product/Edit.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView
    },
    {
      path: '/about',
      name: 'about',
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import('../views/AboutView.vue')
    },
    {
      path: '/product',
      name: 'ProductList',
      component: ProductView
    },
    {
      path: '/product/create',
      name: 'CreateNewProduct',
      component: ProductCreateView
    },
    {
      path: '/product/:id',
      name: 'EditProductView',
      component: ProductEditView
    }
  ]
})

export default router
