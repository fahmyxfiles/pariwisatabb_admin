export default [{
        header: 'Destination',
    },
    {
        title: 'Tourist Attraction',
        icon: 'MapPinIcon',
        children: [{
                title: 'List',
                route: 'tourist-attraction-list',
            },
            {
                title: 'Facilities',
                route: 'tourist-attraction-facilities',
            },
        ],
    },
    {
        title: 'Culinary',
        icon: 'ShoppingBagIcon',
        children: [{
                title: 'Restaurant',
                route: 'culinary-restaurant',
            },
            {
                title: 'Streetfood',
                route: 'culinary-streetfood',
            },
            {
                title: 'Facilities',
                route: 'culinary-facilities',
            },
        ],
    },
]