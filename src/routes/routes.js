import DashboardLayout from '../components/Dashboard/Layout/DashboardLayout.vue'
// GeneralViews
import NotFound from '../components/GeneralViews/NotFoundPage.vue'
// Dashboard pages
import Overview from 'src/components/Dashboard/Views/Dashboard/Overview.vue'
import Stats from 'src/components/Dashboard/Views/Dashboard/Stats.vue'
import Contacts from 'src/components/Dashboard/Views/Dashboard/Contacts/Contacts.vue'
import AddContact from 'src/components/Dashboard/Views/Dashboard/Contacts/AddContact.vue'
import Segments from 'src/components/Dashboard/Views/Dashboard/Segments.vue'

const routes = [
  {
    path: '/',
    component: DashboardLayout,
    redirect: '/admin/overview'
  },
  {
    path: '/admin',
    component: DashboardLayout,
    redirect: '/admin/overview',
    children: [
      {
        path: 'overview',
        name: 'Overview',
        component: Overview
      },
      {
        path: 'stats',
        name: 'Stats',
        component: Stats
      },
      {
        path: 'contact',
        name: 'Contacts',
        component: Contacts
      },
      {
        path: 'contact/add',
        name: 'Add Contact',
        component: AddContact
      },
      {
        path: 'segments',
        name: 'Segments',
        component: Segments
      }
    ]
  },
  {path: '*', component: NotFound}
]

/**
 * Asynchronously load view (Webpack Lazy loading compatible)
 * The specified component must be inside the Views folder
 * @param  {string} name  the filename (basename) of the view to load.
 function view(name) {
   var res= require('../components/Dashboard/Views/' + name + '.vue');
   return res;
};**/

export default routes
