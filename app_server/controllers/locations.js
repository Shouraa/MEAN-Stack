const request = require('request');

const apiOptions = {
  server: 'http://localhost:3000',
};
if (process.env.NODE_ENV === 'production') {
  apiOptions.server = 'https://fast-stream-03241.herokuapp.com';
}

// PUBLIC METHODS

/* GET 'home' page  */
const homelist = (req, res) => {
  const path = '/api/locations';
  requestOptions = {
    url: `${apiOptions.server}${path}`,
    method: 'GET',
    json: {},
    qs: {
      lng: -0.7992599,
      lat: 51.378091,
      maxDistance: 15000,
    },
  };
  request(requestOptions, (err, { statusCode }, body) => {
    let data = [];
    if (statusCode === 200) {
      data = body.map((item) => {
        item.distance = formatDistance(item.distance);
        return item;
      });

      renderHomepage(req, res, data);
    }
  });
};

/* GET 'location info' Page  */
const locationInfo = (req, res) => {
  getLocationInfo(req, res, (req, res, responseData) =>
    renderDetailPage(req, res, responseData)
  );
};

/* GET 'Add Review' page  */
const addReview = (req, res) => {
  getLocationInfo(req, res, (req, res, responseData) => {
    renderReviewForm(req, res, responseData);
  });
};

/* Submitting a new review */
const doAddReview = (req, res) => {
  const locationid = req.params.locationid;
  const path = `/api/locations/${locationid}/reviews`;
  const postdata = {
    author: req.body.name,
    rating: parseInt(req.body.rating, 10),
    reviewText: req.body.review,
  };
  const requestOptions = {
    url: `${apiOptions.server}${path}`,
    method: 'POST',
    json: postdata,
  };
  if (!postdata.author || !postdata.rating || !postdata.reviewText) {
    res.redirect(`/location/${locationid}/review/new?err=val`);
  } else {
    request(requestOptions, (err, { statusCode }, body) => {
      if (statusCode === 201) {
        res.redirect(`/location/${locationid}`);
      } else if (
        statusCode === 400 &&
        body.name &&
        body.name === 'ValidationError'
      ) {
        res.redirect(`/location/${locationid}/review/new?err=val`);
      } else {
        console.log(body);
        showError(req, res, statusCode);
      }
    });
  }
};

// PRIVATE METHODS

/* 'GET' location info */
const getLocationInfo = (req, res, callback) => {
  const path = `/api/locations/${req.params.locationid}`;
  const requestOptions = {
    url: `${apiOptions.server}${path}`,
    method: 'GET',
    json: {},
  };
  request(requestOptions, (err, { statusCode }, body) => {
    const data = body;
    if (statusCode === 200) {
      data.coord = {
        lng: body.coords[0],
        lat: body.coords[1],
      };
      callback(req, res, data);
    } else {
      showError(req, res, statusCode);
    }
  });
};

// Render Homepage
const renderHomepage = (req, res, responseBody) => {
  let message = null;
  if (!(responseBody instanceof Array)) {
    message = 'API lookup error';
    responseBody = [];
  } else {
    if (!responseBody.length) {
      message = 'No places found nearby';
    }
  }
  res.render('location-list', {
    title: 'Loc8r - find a place to work with wifi',
    pageHeader: {
      title: 'Loc8r',
      strapline: 'Find places to work with wifi near you!',
    },
    sidebar:
      "Looking for wifi and a seat? Loc8r helps you find places to work when out and about. Perhaps with coffee, cake or a pint? Let Loc8r help you find the place you're looking for.",
    locations: responseBody,
    message,
  });
};

// Render detailPage
const renderDetailPage = (req, res, location) => {
  res.render('location-info', {
    title: location.name,
    pageHeader: { title: location.name },
    sidebar: {
      context:
        'is on Loc8r because it has accessible wifi and space to sit down with your laptop and get some work done.',
      callToAction:
        "If you've been and you like it - or if you don't - please leave a review to help other people just like you.",
    },
    location,
  });
};

/* Render review form */
const renderReviewForm = (req, res, { name }) => {
  res.render('location-review-form', {
    title: `Review ${name} on Loc8r`,
    pageHeader: { title: `Review ${name}` },
    error: req.query.err,
  });
};

/* Formatting the Distance  */
const formatDistance = (distance) => {
  let thisDistance = 0;
  let unit = 'm';
  if (distance > 1000) {
    thisDistance = parseFloat(distance / 1000).toFixed(1);
    unit = 'km';
  } else {
    thisDistance = Math.floor(distance);
  }
  return thisDistance + unit;
};

/* Method for Showing Errors */
const showError = (req, res, status) => {
  let title = '';
  let content = '';
  if (status === 404) {
    title = '404, page not found';
    content = "Oh. Looks like you can't find this page. Sorry.";
  } else {
    title = `${status}, somthing's gone wrong`;
    content = 'Something, somewhere, has gone just a little bit wrong.';
  }
  res.status(status);
  res.render('generic-text', { title, content });
};

module.exports = {
  homelist,
  locationInfo,
  addReview,
  doAddReview,
};
