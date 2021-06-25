export default [{
        path: '/hotel/list',
        name: 'hotel-list',
        component: () =>
            import ('@/views/accomodation/hotel/Index.vue'),
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
        component: () =>
            import ('@/views/accomodation/hotel/View.vue'),
        meta: {
            pageTitle: 'Hotel View',
            breadcrumb: [{
                    text: 'Hotel',
                },
                {
                    text: 'List',
                    to: '/hotel/list'
                },
                {
                    text: 'View',
                    active: true,
                },
            ],
        },
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