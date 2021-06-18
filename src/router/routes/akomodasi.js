export default [{
        path: '/hotel/list',
        name: 'hotel-list',
        component: () =>
            import ('@/views/apps/calendar/Calendar.vue'),
    },
    {
        path: '/hotel/fasilitas',
        name: 'hotel-fasilitas',
        component: () =>
            import ('@/views/apps/calendar/Calendar.vue'),
    },
    {
        path: '/wisma/list',
        name: 'wisma-list',
        component: () =>
            import ('@/views/apps/calendar/Calendar.vue'),
    },
    {
        path: '/wisma/fasilitas',
        name: 'wisma-fasilitas',
        component: () =>
            import ('@/views/apps/calendar/Calendar.vue'),
    },
    {
        path: '/homestay/list',
        name: 'homestay-list',
        component: () =>
            import ('@/views/apps/calendar/Calendar.vue'),
    },
    {
        path: '/homestay/fasilitas',
        name: 'homestay-fasilitas',
        component: () =>
            import ('@/views/apps/calendar/Calendar.vue'),
    },
]