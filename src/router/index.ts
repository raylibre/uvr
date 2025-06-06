import { createRouter, createWebHistory } from 'vue-router';
import { ROUTES, ROUTE_NAMES } from '~/constants/router-constants';
import { Permission } from '~/constants/permission-constants';
import { usePermissions } from '~/composables/use-permissions';

const router = createRouter({
  history: createWebHistory(),
  routes: [
    ...ROUTES,
    {
      path: '/:pathMatch(.*)*',
      name: ROUTE_NAMES.NOT_FOUND,
      component: () => import('~/components/pages/p-not-found')
    }
  ]
});

router.beforeEach((to, from, next) => {
  const { hasAnyPermission } = usePermissions();
  const currentUser = localStorage.getItem('currentUser');

  if (to.meta.requiresAuth && !currentUser) {
    next({ name: ROUTE_NAMES.HOME });
    return;
  }

  if (to.meta.permissions && !hasAnyPermission(to.meta.permissions as Permission[])) {
    next({ name: ROUTE_NAMES.HOME });
    return;
  }

  next();
});

export default router; 
