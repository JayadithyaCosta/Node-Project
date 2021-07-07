const User = require('../models/user')

exports.getLogin = (req, res, next) => {
  console.log(req.session.isLoggedIn);
  res.render('auth/login', {
    path: '/login',
    pageTitle: 'Login',
    isAuthenticated: false
  });
};

exports.postLogin = (req, res, next) => {
  User.findById('60df16b5fa6f7e20a0db23dc')
  .then(user => {
    req.session.isLoggedIn = true;
    req.session.user = user;
    //res.redirect('/') => This will sometimes redirect before the session data is saved into MongoDB. Hence using save() method
    req.session.save((err)=> {
      console.log(err);
      res.redirect('/')
    });
  })
  .catch(err => console.log(err));
};

exports.postLogout = (req, res, next) => {
  req.session.destroy(()=> {
      res.redirect('/')
  });
};
