export default [{
  header: 'Destination',
},
{
  title: 'Tourist Attraction',
  icon: 'MapPinIcon',
  children: [{
    title: 'List',
    route: 'tourist-attraction-list',
    resource: 'tourist-attraction',
    action: 'manage',
  },
  {
    title: 'Category',
    route: 'tourist-attraction-category',
    resource: 'tourist-attraction',
    action: 'manage',
  },
  {
    title: 'Facility',
    route: 'tourist-attraction-facility',
    resource: 'tourist-attraction',
    action: 'manage',
  },
  ],
},
{
  title: 'Culinary',
  icon: 'ShoppingBagIcon',
  children: [{
    title: 'List',
    route: 'culinary-list',
    resource: 'culinary',
    action: 'manage',
  },
  {
    title: 'Category',
    route: 'culinary-category',
    resource: 'culinary',
    action: 'manage',
  },
  {
    title: 'Facility',
    route: 'culinary-facility',
    resource: 'culinary',
    action: 'manage',
  },
  ],
},
]
