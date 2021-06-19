export default [{
        path: '/hotel/list',
        name: 'hotel-list',
        component: () =>
            import ('@/views/apps/calendar/Calendar.vue'),
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