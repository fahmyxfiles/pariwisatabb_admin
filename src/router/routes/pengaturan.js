export default [{
        path: '/pengaturan/wilayah',
        name: 'pengaturan-wilayah',
        component: () =>
            import ('@/views/apps/calendar/Calendar.vue'),
    },
    {
        path: 'pengaturan/pengguna',
        name: 'pengaturan-pengguna',
        component: () =>
            import ('@/views/apps/calendar/Calendar.vue'),
    },
    {
        path: 'pengaturan/hak-akses',
        name: 'pengaturan-hak-akses',
        component: () =>
            import ('@/views/apps/calendar/Calendar.vue'),
    },
]