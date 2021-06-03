var User = require('../model/users');
var bcrypt = require('bcryptjs');

exports.form = function (req, res) {
  res.render('users/register', { title: 'Register' });
};

//Funkcija za spremanje korisnika
exports.submit = function (req, res, next) {
  User.findOne({ username: req.body.username }, function (err, user) {
    if (err) return next(err);
    //Ako je korisničko ime zauzeto
    if (user) {
      res.error('User name has been taken!');
      res.redirect('back');
    } else {
      const passwordHash = bcrypt.hashSync(req.body.password, 10);
      //Stvori novog korisnika
      user = User.create({
          username: req.body.username,
          password: passwordHash,
        },
        function (err, user) {
          if (err) {
            res.send('There was a problem with adding the user.');
          } else {
            //Preusmjeri na naslovnu stranicu
            res.redirect('/');
          }
        }
      );
    }
  });
};
