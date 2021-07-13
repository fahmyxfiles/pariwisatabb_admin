export default [{
  path: '/tourist-attraction/list',
  name: 'tourist-attraction-list',
  component: () => import('@/views/destination/tourist-attraction/Index.vue'),
  meta: {
    pageTitle: 'Tourist Attraction List',
    breadcrumb: [{
      text: 'Tourist Attraction',
    },
    {
      text: 'List',
      active: true,
    },
    ],
  },
},
{
  path: '/tourist-attraction/:id',
  name: 'tourist-attraction-view',
  component: () => import('@/views/destination/tourist-attraction/View.vue'),
  meta: {
    pageTitle: 'Tourist Attraction View',
    breadcrumb: [{
      text: 'Tourist Attraction',
    },
    {
      text: 'List',
      to: '/tourist-attraction/list',
    },
    {
      text: 'View',
      active: true,
    },
    ],
  },
},
{
  path: '/tourist-attraction/facilities',
  name: 'tourist-attraction-facilities',
  component: () => import('@/views/destination/tourist-attraction/Facility.vue'),
  meta: {
    pageTitle: 'Facilities',
    breadcrumb: [{
      text: 'Tourist Attraction',
    },
    {
      text: 'Facilities',
      active: true,
    },
    ],
  },
},
{
  path: '/culinary/restaurant',
  name: 'culinary-restaurant',
  component: () => import('@/views/apps/calendar/Calendar.vue'),
},
{
  path: '/culinary/streetfood',
  name: 'culinary-streetfood',
  component: () => import('@/views/apps/calendar/Calendar.vue'),
},
{
  path: '/culinary/facilities',
  name: 'culinary-facilities',
  component: () => import('@/views/apps/calendar/Calendar.vue'),
},
]
