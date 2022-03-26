export default [{
  path: '/settings/region',
  name: 'settings-region',
  component: () => import('@/views/settings/region/Index.vue'),
  meta: {
    pageTitle: 'Region',
    breadcrumb: [{
      text: 'Settings',
    },
    {
      text: 'Region',
      active: true,
    },
    ],
  },
},
{
  path: '/settings/users',
  name: 'settings-users',
  component: () => import('@/views/settings/user/Index.vue'),
  meta: {
    pageTitle: 'Users',
    breadcrumb: [{
      text: 'Settings',
    },
    {
      text: 'Users',
      active: true,
    },
    ],
  },
},
{
  path: '/settings/access-control',
  name: 'settings-access-control',
  component: () => import('@/views/settings/access-control/Index.vue'),
  meta: {
    pageTitle: 'Access Control',
    breadcrumb: [{
      text: 'Settings',
    },
    {
      text: 'Access Control',
      active: true,
    },
    ],
  },
},
]
