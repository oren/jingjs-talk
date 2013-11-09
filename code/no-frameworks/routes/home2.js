function home (req, res) {
  res.template('home.ejs', { title: 'Node.js Website Template', data: {} });
};

module.exports = home;

