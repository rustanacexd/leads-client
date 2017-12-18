import DashboardLayout from '../components/Dashboard/Layout/DashboardLayout.vue'
// GeneralViews
import NotFound from '../components/GeneralViews/NotFoundPage.vue'
// Dashboard pages
import Overview from 'src/components/Dashboard/Views/Dashboard/Overview.vue'
import Stats from 'src/components/Dashboard/Views/Dashboard/Stats.vue'
import Contacts from 'src/components/Dashboard/Views/Dashboard/Contacts/Contacts.vue'
import AddContact from 'src/components/Dashboard/Views/Dashboard/Contacts/AddContact.vue'
import EditContact from 'src/components/Dashboard/Views/Dashboard/Contacts/EditContact.vue'
import Clients from 'src/components/Dashboard/Views/Dashboard/Clients/Clients.vue'
import AddClient from 'src/components/Dashboard/Views/Dashboard/Clients/AddClient.vue'
import EditClient from 'src/components/Dashboard/Views/Dashboard/Clients/EditClient.vue'
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
        path: 'contacts',
        name: 'Contacts',
        component: Contacts
      },
      {
        path: 'contact/add',
        name: 'Add contact',
        component: AddContact
      },
      {
        path: 'contact/edit/:id',
        name: 'Edit contact',
        component: EditContact
      },
      {
        path: 'clients',
        name: 'Clients',
        component: Clients
      },
      {
        path: 'client/add',
        name: 'Add client',
        component: AddClient
      },
      {
        path: 'client/edit/:id',
        name: 'Edit client',
        component: EditClient
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
