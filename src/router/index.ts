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
  ],
  scrollBehavior(to, _from, savedPosition) {
    if (savedPosition) {
      return savedPosition;
    }
    
    // Handle hash links
    if (to.hash) {
      return new Promise((resolve) => {
        // Wait for the component to mount before scrolling
        const scrollToElement = () => {
          const element = document.querySelector(to.hash);
          if (element) {
            const headerOffset = 80; // Account for fixed header
            const elementPosition = (element as HTMLElement).offsetTop;
            const offsetPosition = elementPosition - headerOffset;
            
            console.log('Scrolling to hash:', to.hash, 'Element found:', element, 'Position:', offsetPosition);
            
            resolve({
              top: offsetPosition,
              behavior: 'smooth'
            });
          } else {
            console.log('Hash element not found:', to.hash, 'Retrying...');
            // If element not found, retry after a longer delay
            setTimeout(scrollToElement, 200);
          }
        };
        
        // Initial attempt
        setTimeout(scrollToElement, 300);
      });
    }
    
    // Default behavior - scroll to top
    return { top: 0, behavior: 'smooth' };
  }
});

router.beforeEach((to, _from, next) => {
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