const homelist = (req, res) => {
  res.render('location-list', { title: 'Home' });
};

const locationInfo = (req, res) => {
  res.render('location-info', { title: 'Location Info' });
};

const addReview = (req, res) => {
  res.render('location-review-form', { title: 'Add review' });
};

module.exports = {
  homelist,
  locationInfo,
  addReview,
};
