export default [{
        path: '/hotel/list',
        name: 'hotel-list',
        component: () =>
            import ('@/views/accomodation/hotel/Index.vue'),
    },
    {
        path: '/hotel/view',
        name: 'hotel-view',
        component: () =>
            import ('@/views/accomodation/hotel/View.vue'),
    },
    {
        path: '/hotel/facitilies',
        name: 'hotel-facilities',
        component: () =>
            import ('@/views/apps/calendar/Calendar.vue'),
    },
    {
        path: '/guest-house/list',
        name: 'guest-house-list',
        component: () =>
            import ('@/views/apps/calendar/Calendar.vue'),
    },
    {
        path: '/guest-house/facilities',
        name: 'guest-house-facilities',
        component: () =>
            import ('@/views/apps/calendar/Calendar.vue'),
    },
]