({
  name: 'Cafe Hero',
  address: '126 Short Street, walking, RG6 1PS',
  rating: 4,
  facilities: ['Hot drinks', 'Food', 'Premium wifi'],
  coords: [-0.9690884, 51.455041],
  openingTimes: [
    {
      days: 'Monday - Friday',
      opening: '7:00am',
      closing: '7:00pm',
      closed: false,
    },
    { days: 'Saturday', opening: '8:00am', closing: '5:00pm', closed: false },
    { days: 'Sunday', closed: true },
  ],
  reviews: [
    {
      author: 'Simon Holmes',
      rating: 5,
      timestamp: new Date('Mar 12, 2017'),
      reviewText: 'What a great place.',
    },
  ],
});
