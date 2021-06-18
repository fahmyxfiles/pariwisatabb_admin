export default [{
        path: '/wisata/list',
        name: 'wisata-list',
        component: () =>
            import ('@/views/apps/calendar/Calendar.vue'),
    },
    {
        path: '/wisata/fasilitas',
        name: 'wisata-fasilitas',
        component: () =>
            import ('@/views/apps/calendar/Calendar.vue'),
    },
    {
        path: '/kuliner/restoran',
        name: 'kuliner-restoran',
        component: () =>
            import ('@/views/apps/calendar/Calendar.vue'),
    },
    {
        path: '/kuliner/streetfood',
        name: 'kuliner-streetfood',
        component: () =>
            import ('@/views/apps/calendar/Calendar.vue'),
    },
    {
        path: '/kuliner/fasilitas',
        name: 'kuliner-fasilitas',
        component: () =>
            import ('@/views/apps/calendar/Calendar.vue'),
    },
]