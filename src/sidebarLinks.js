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
    collapsed: false,
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
    name: 'Segments',
    icon: 'ti-layers-alt',
    path: '/admin/segments'
  }
]
