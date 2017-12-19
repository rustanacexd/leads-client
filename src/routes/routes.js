import DashboardLayout from '../components/Dashboard/Layout/DashboardLayout.vue'
// GeneralViews
import NotFound from '../components/GeneralViews/NotFoundPage.vue'
// Dashboard pages
import Overview from 'src/components/Dashboard/Views/Dashboard/Overview.vue'
import Contacts from 'src/components/Dashboard/Views/Dashboard/Contacts/Contacts.vue'
import AddContact from 'src/components/Dashboard/Views/Dashboard/Contacts/AddContact.vue'
import EditContact from 'src/components/Dashboard/Views/Dashboard/Contacts/EditContact.vue'
import Clients from 'src/components/Dashboard/Views/Dashboard/Clients/Clients.vue'
import AddClient from 'src/components/Dashboard/Views/Dashboard/Clients/AddClient.vue'
import EditClient from 'src/components/Dashboard/Views/Dashboard/Clients/EditClient.vue'
import Organizations from 'src/components/Dashboard/Views/Dashboard/Organizations/Organizations.vue'
import AddOrganization from 'src/components/Dashboard/Views/Dashboard/Organizations/AddOrganization.vue'
import EditOrganization from 'src/components/Dashboard/Views/Dashboard/Organizations/EditOrganization.vue'
import Campaigns from 'src/components/Dashboard/Views/Dashboard/Campaigns/Campaigns.vue'
import AddCampaign from 'src/components/Dashboard/Views/Dashboard/Campaigns/AddCampaign.vue'
import EditCampaign from 'src/components/Dashboard/Views/Dashboard/Campaigns/EditCampaign.vue'
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
        path: 'organizations',
        name: 'Organizations',
        component: Organizations
      },
      {
        path: 'organization/add',
        name: 'Add organization',
        component: AddOrganization
      },
      {
        path: 'organization/edit/:id',
        name: 'Edit organization',
        component: EditOrganization
      },
      {
        path: 'campaigns',
        name: 'Campaigns',
        component: Campaigns
      },
      {
        path: 'campaign/add',
        name: 'Add campaign',
        component: AddCampaign
      },
      {
        path: 'campaign/edit/:id',
        name: 'Edit campaign',
        component: EditCampaign
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
