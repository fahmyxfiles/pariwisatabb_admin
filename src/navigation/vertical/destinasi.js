export default [{
        header: 'Destinasi',
    },
    {
        title: 'Wisata',
        icon: 'WindIcon',
        children: [{
                title: 'Daftar Wisata',
                route: 'wisata-list',
            },
            {
                title: 'Fasilitas Wisata',
                route: 'wisata-fasilitas',
            },
        ],
    },
    {
        title: 'Kuliner',
        icon: 'FileTextIcon',
        children: [{
                title: 'Restoran',
                route: 'kuliner-restoran',
            },
            {
                title: 'Street Food',
                route: 'kuliner-streetfood',
            },
            {
                title: 'Fasilitas Kuliner',
                route: 'kuliner-fasilitas',
            },
        ],
    },
]