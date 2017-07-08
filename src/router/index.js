import Vue from 'vue'
import Router from 'vue-router'
import detail from '@/components/detail/detail'
import list from '@/components/list/list'
import content from '@/components/detail/content/content'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'list',
      component: list
    },
    {
      path: '/:id',
      component: detail,
      children: [
        {
          path: '/',
          component: content
        }
      ]
    },
    {
      path: '/:id',
      component: detail,
      children: [
        {
          path: '/:id/:subid',
          component: content
        }
      ]
    }
  ]
})
