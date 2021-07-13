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
    title: 'Facility',
    children: [
      {
        title: 'General',
        route: 'hotel-facility-general',
      },
      {
        title: 'Room',
        route: 'hotel-facility-room',
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
    title: 'Facility',
    children: [
      {
        title: 'General',
        route: 'guest-house-facility-general',
      },
      {
        title: 'Room',
        route: 'guest-house-facility-room',
      },
    ],
  },
  ],
},
]
