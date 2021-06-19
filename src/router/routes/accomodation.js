export default [{
        path: '/hotel/list',
        name: 'hotel-list',
        component: () =>
            import ('@/views/apps/calendar/Calendar.vue'),
    },
    {
        path: '/hotel/facitilies',
        name: 'hotel-facitilies',
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
        path: '/guest-house/fasilitas',
        name: 'guest-house-facitilies',
        component: () =>
            import ('@/views/apps/calendar/Calendar.vue'),
    },
]