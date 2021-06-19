export default [{
        path: '/tourist-attraction/list',
        name: 'tourist-attraction-list',
        component: () =>
            import ('@/views/apps/calendar/Calendar.vue'),
    },
    {
        path: '/tourist-attraction/facilities',
        name: 'tourist-attraction-facilities',
        component: () =>
            import ('@/views/apps/calendar/Calendar.vue'),
    },
    {
        path: '/culinary/restaurant',
        name: 'culinary-restaurant',
        component: () =>
            import ('@/views/apps/calendar/Calendar.vue'),
    },
    {
        path: '/culinary/streetfood',
        name: 'culinary-streetfood',
        component: () =>
            import ('@/views/apps/calendar/Calendar.vue'),
    },
    {
        path: '/culinary/facilities',
        name: 'culinary-facilities',
        component: () =>
            import ('@/views/apps/calendar/Calendar.vue'),
    },
]