export default [{
        path: '/live/',
        name: 'live-index',
        component: () =>
            import ('@/views/live/LiveIndex.vue'),
        meta: {
            pageTitle: 'Live Manager',
            breadcrumb: [{
                text: 'Live Manager',
                active: true,
            }, ],
        },
    },
    {
        path: '/live/:liveId',
        name: 'live-studio',
        component: () =>
            import ('@/views/live/LiveStudio.vue'),
        meta: {
            pageTitle: 'Live Studio',
            breadcrumb: [{
                    text: 'Live Manager',
                },
                {
                    text: 'Live Studio',
                    active: true,
                },
            ],
        },
    },
]