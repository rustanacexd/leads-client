export default [
  {
    name: 'Dashboard',
    icon: 'ti-panel',
    collapsed: false,
    children: [{
      name: 'Overview',
      path: '/admin/overview'
    },
    {
      name: 'Stats',
      path: '/admin/stats'
    }]
  },
  {
    name: 'Contacts',
    icon: 'ti-email',
    children: [
      {
        name: 'Contacts',
        path: '/admin/contacts'
      },
      {
        name: 'Add Contact',
        path: '/admin/contact/add'
      }
    ]
  },
  {
    name: 'Clients',
    icon: 'ti-user',
    children: [
      {
        name: 'Clients',
        path: '/admin/clients'
      },
      {
        name: 'Add Client',
        path: '/admin/client/add'
      }
    ]
  },
  {
    name: 'Organizations',
    icon: 'ti-home',
    children: [
      {
        name: 'Organizations',
        path: '/admin/organizations'
      },
      {
        name: 'Add Organization',
        path: '/admin/organization/add'
      }
    ]
  },
  {
    name: 'Segments',
    icon: 'ti-layers-alt',
    path: '/admin/segments'
  }
]
