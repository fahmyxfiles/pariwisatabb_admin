export default [{
  header: 'Accomodation',
},
{
  title: 'Hotel',
  icon: 'HomeIcon',
  children: [{
    title: 'List',
    route: 'hotel-list',
  },
  {
    title: 'Facilities',
    children: [
      {
        title: 'Hotel',
        route: 'facilities-hotel',
      },
      {
        title: 'Room',
        route: 'facilities-room',
      },
    ],
  },
  ],
},
{
  title: 'Guest House',
  icon: 'FileTextIcon',
  children: [{
    title: 'List',
    route: 'guest-house-list',
  },
  {
    title: 'Facilities',
    route: 'guest-house-facilities',
  },
  ],
},
]
