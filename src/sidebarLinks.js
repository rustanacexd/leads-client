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
    icon: 'ti-user',
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
    name: 'Segments',
    icon: 'ti-layers-alt',
    path: '/admin/segments'
  }
]
