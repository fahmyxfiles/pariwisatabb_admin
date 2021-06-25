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
  component: () => import('@/views/apps/calendar/Calendar.vue'),
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
