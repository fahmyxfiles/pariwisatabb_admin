export default [{
        header: 'Akomodasi',
    },
    {
        title: 'Hotel',
        icon: 'WindIcon',
        children: [{
                title: 'Daftar Hotel',
                route: 'hotel-list',
            },
            {
                title: 'Fasilitas Hotel',
                route: 'hotel-fasilitas',
            },
        ],
    },
    {
        title: 'Wisma',
        icon: 'FileTextIcon',
        children: [{
                title: 'Daftar Wisma',
                route: 'wisma-list',
            },
            {
                title: 'Fasilitas Wisma',
                route: 'wisma-fasilitas',
            },
        ],
    },
    {
        title: 'Homestay',
        icon: 'FileTextIcon',
        children: [{
                title: 'Daftar Homestay',
                route: 'homestay-list',
            },
            {
                title: 'Fasilitas Homestay',
                route: 'homestay-fasilitas',
            },
        ],
    },
]