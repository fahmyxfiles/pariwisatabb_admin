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
        title: 'General',
        route: 'hotel-facilities-general',
      },
      {
        title: 'Room',
        route: 'hotel-facilities-room',
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
    children: [
      {
        title: 'General',
        route: 'guest-house-facilities-general',
      },
      {
        title: 'Room',
        route: 'guest-house-facilities-room',
      },
    ],
  },
  ],
},
]
