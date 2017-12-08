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
    path: '/admin/contacts'
  },
  {
    name: 'Segments',
    icon: 'ti-layers-alt',
    path: '/admin/segments'
  }
]
