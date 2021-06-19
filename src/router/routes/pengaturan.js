export default [{
        path: '/pengaturan/wilayah',
        name: 'pengaturan-wilayah',
        component: () => import ('@/views/pengaturan/wilayah/Index.vue'),
        meta: {
            pageTitle: 'Wilayah',
            breadcrumb: [{
                    text: 'Pengaturan',
                },
                {
                    text: 'Wilayah',
                    active: true,
                },
            ],
        },
    },
    {
        path: '/pengaturan/pengguna',
        name: 'pengaturan-pengguna',
        component: () =>
            import ('@/views/apps/calendar/Calendar.vue'),
    },
    {
        path: '/pengaturan/hak-akses',
        name: 'pengaturan-hak-akses',
        component: () => import ('@/views/pengaturan/hak-akses/Index.vue'),
        meta: {
            pageTitle: 'Hak Akses',
            breadcrumb: [{
                    text: 'Pengaturan',
                },
                {
                    text: 'Hak Akses',
                    active: true,
                },
            ],
        },
    },
]