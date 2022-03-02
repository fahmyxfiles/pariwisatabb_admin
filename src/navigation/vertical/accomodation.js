export default [{
  header: 'Accomodation',
},
{
  title: 'Hotel',
  icon: 'HomeIcon',
  children: [{
    title: 'List',
    route: 'hotel-list',
    resource: 'hotel',
    action: 'manage',
  },
  {
    title: 'Facility',
    children: [
      {
        title: 'General',
        route: 'hotel-facility-general',
        resource: 'hotel',
        action: 'manage',
      },
      {
        title: 'Room',
        route: 'hotel-facility-room',
        resource: 'hotel',
        action: 'manage',
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
    resource: 'guest-house',
    action: 'manage',
  },
  {
    title: 'Facility',
    children: [
      {
        title: 'General',
        route: 'guest-house-facility-general',
        resource: 'guest-house',
        action: 'manage',
      },
      {
        title: 'Room',
        route: 'guest-house-facility-room',
        resource: 'guest-house',
        action: 'manage',
      },
    ],
  },
  ],
},
]
