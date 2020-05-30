{
    name: 'Costy',
    address: '25 High Street, Reading',
    rating: 4,
  facilities: ['Hot drinks', 'Food', 'Power'],
  coords: [-0.9630884, 51.451041],
  openingTimes: [{
  days: 'Monday - Friday',
  opening: '7:00am',
  closing: '7:00pm',
  closed: false
  }, {days: 'Saturday',
  opening: '8:00am',
  closing: '5:00pm',
  closed: false
  }, {
  days: 'Sunday',
  closed: true
  }]
  }
  
  
  {
    name: 'Costy'
  }, {
    $push: {
      reviews: {
        author: 'Bruce Maiden',
        _id: ObjectId(),
        rating: 4,
        timestamp: new Date("Mar 12, 2017"),
        reviewText: "What a great place."
  }
  }
  }