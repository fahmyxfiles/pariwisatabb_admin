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
  path: '/tourist-attraction/facility',
  name: 'tourist-attraction-facility',
  component: () => import('@/views/destination/tourist-attraction/Facility.vue'),
  meta: {
    pageTitle: 'Facility',
    breadcrumb: [{
      text: 'Tourist Attraction',
    },
    {
      text: 'Facility',
      active: true,
    },
    ],
  },
},
{
  path: '/tourist-attraction/category',
  name: 'tourist-attraction-category',
  component: () => import('@/views/destination/tourist-attraction/Category.vue'),
  meta: {
    pageTitle: 'Category',
    breadcrumb: [{
      text: 'Tourist Attraction',
    },
    {
      text: 'Category',
      active: true,
    },
    ],
  },
},
{
  path: '/culinary/list',
  name: 'culinary-list',
  component: () => import('@/views/destination/culinary/Index.vue'),
  meta: {
    pageTitle: 'Culinary List',
    breadcrumb: [{
      text: 'Culinary',
    },
    {
      text: 'List',
      active: true,
    },
    ],
  },
},
{
  path: '/culinary/category',
  name: 'culinary-category',
  component: () => import('@/views/destination/culinary/Category.vue'),
  meta: {
    pageTitle: 'Culinary Category',
    breadcrumb: [{
      text: 'Culinary',
    },
    {
      text: 'Category',
      active: true,
    },
    ],
  },
},
{
  path: '/culinary/menu',
  name: 'culinary-menu',
  component: () => import('@/views/destination/culinary/Menu.vue'),
  meta: {
    pageTitle: 'Culinary Menu',
    breadcrumb: [{
      text: 'Culinary',
    },
    {
      text: 'Menu',
      active: true,
    },
    ],
  },
},
{
  path: '/culinary/facility',
  name: 'culinary-facility',
  component: () => import('@/views/destination/culinary/Facility.vue'),
  meta: {
    pageTitle: 'Culinary Facility',
    breadcrumb: [{
      text: 'Culinary',
    },
    {
      text: 'Facility',
      active: true,
    },
    ],
  },
},
]
