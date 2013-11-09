function other (req, res) {
  res.template('other.ejs', { title: 'page foo', data: {} });
};

module.exports = other;

