export default [{
  path: '/hotel/list',
  name: 'hotel-list',
  component: () => import('@/views/accomodation/hotel/Index.vue'),
  meta: {
    pageTitle: 'Hotel List',
    breadcrumb: [{
      text: 'Hotel',
    },
    {
      text: 'List',
      active: true,
    },
    ],
  },
},
{
  path: '/hotel/view/:id',
  name: 'hotel-view',
  component: () => import('@/views/accomodation/hotel/View.vue'),
  meta: {
    pageTitle: 'Hotel View',
    breadcrumb: [{
      text: 'Hotel',
    },
    {
      text: 'List',
      to: '/hotel/list',
    },
    {
      text: 'View',
      active: true,
    },
    ],
  },
},
{
  path: '/hotel/facility-general',
  name: 'hotel-facility-general',
  component: () => import('@/views/accomodation/hotel/GeneralFacility.vue'),
  meta: {
    pageTitle: 'General Facility',
    breadcrumb: [{
      text: 'Hotel',
    },
    {
      text: 'Facility',
    },
    {
      text: 'General',
      active: true,
    },

    ],
  },
},
{
  path: '/hotel/facility-room',
  name: 'hotel-facility-room',
  component: () => import('@/views/accomodation/hotel/RoomFacility.vue'),
  meta: {
    pageTitle: 'Room Facility',
    breadcrumb: [{
      text: 'Hotel',
    },
    {
      text: 'Facility',
    },
    {
      text: 'Room',
      active: true,
    },
    ],
  },
},
{
  path: '/guest-house/list',
  name: 'guest-house-list',
  component: () => import('@/views/accomodation/guest-house/Index.vue'),
  meta: {
    pageTitle: 'Guest House List',
    breadcrumb: [{
      text: 'Guest House',
    },
    {
      text: 'List',
      active: true,
    },
    ],
  },
},
{
  path: '/guest-house/view/:id',
  name: 'guest-house-view',
  component: () => import('@/views/accomodation/guest-house/View.vue'),
  meta: {
    pageTitle: 'Guest House View',
    breadcrumb: [{
      text: 'Guest House',
    },
    {
      text: 'List',
      to: '/guest-house/list',
    },
    {
      text: 'View',
      active: true,
    },
    ],
  },
},
{
  path: '/guest-house/facility-general',
  name: 'guest-house-facility-general',
  component: () => import('@/views/accomodation/guest-house/GeneralFacility.vue'),
  meta: {
    pageTitle: 'General Facility',
    breadcrumb: [{
      text: 'Guest House',
    },
    {
      text: 'Facility',
    },
    {
      text: 'General',
      active: true,
    },

    ],
  },
},
{
  path: '/guest-house/facility-room',
  name: 'guest-house-facility-room',
  component: () => import('@/views/accomodation/guest-house/RoomFacility.vue'),
  meta: {
    pageTitle: 'Room Facility',
    breadcrumb: [{
      text: 'Guest House',
    },
    {
      text: 'Facility',
    },
    {
      text: 'Room',
      active: true,
    },
    ],
  },
},
]
