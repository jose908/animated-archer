/**
 * UserController
 *
 * @description :: Server-side logic for managing users
 * @help        :: See http://links.sailsjs.org/docs/controllers
 */

module.exports = {

  login: function (req, res) {

    User.findOne({
      user: req.param('user')
    }, function foundUser(err, user) {
      if (err) return res.negotiate(err);
      if (!user) return res.notFound();

      // Compare password attempt from the form params to the encrypted password
      // from the database (`user.password`)
      require('machinepack-passwords').checkPassword({
        passwordAttempt: req.param('password'),
        encryptedPassword: user.encryptedPassword
      }).exec({

        error: function (err){
          return res.negotiate(err);
        },

        // If the password from the form params doesn't checkout w/ the encrypted
        // password from the database...
        incorrect: function (){
          return res.notFound();
        },

        success: function (){

          // Store user id in the user session
          req.session.me = user.id;

          // All done- let the client know that everything worked.
          return res.ok();
        }
      });
    });
  },

  signup: function(req, res) {

    var Passwords = require('machinepack-passwords');

    // Encrypt a string using the BCrypt algorithm.
    Passwords.encryptPassword({
      password: req.param('password'),
      difficulty: 10
    }).exec({
      // An unexpected error occurred.
      error: function (err) {
        return res.negotiate(err);
      },
      // OK.
      success: function (encryptedPassword) {
        // Create a User with the params sent from
        // the sign-up form --> signup.ejs
        User.create({
          user: req.param('user'),
          encryptedPassword: encryptedPassword,
          lastLoggedIn: new Date(),
          isAdmin: req.param('isAdmin')
        }, function userCreated(err, newUser) {
          if (err) {

            console.log("err: ", err);
            console.log("err.invalidAttributes: ", err.invalidAttributes)

            // If this is a uniqueness error about the email attribute,
            // send back an easily parseable status code.
            if (err.invalidAttributes && err.invalidAttributes.email && err.invalidAttributes.email[0]
              && err.invalidAttributes.email[0].rule === 'unique') {
              return res.emailAddressInUse();
            }

            // Otherwise, send back something reasonable as our error response.
            return res.negotiate(err);
          }

          // Send back the id of the new user
          return res.json({
            id: newUser.id
          });
        });
      }
      })
    },

  logout: function (req, res) {

    // Look up the user record from the database which is
    // referenced by the id in the user session (req.session.me)
    User.findOne(req.session.me, function foundUser(err, user) {
      if (err) return res.negotiate(err);

      // If session refers to a user who no longer exists, still allow logout.
      if (!user) {
        sails.log.verbose('Session refers to a user who no longer exists.');
        return res.backToHomePage();
      }

      // Wipe out the session (log out)
      req.session.me = null;

      // Either send a 200 OK or redirect to the home page
      return res.backToHomePage();

    });
  },
  getInitValues: function (req, res) {

    User.findOne(req.session.me, function foundUser(err, user) {
      Alarm.count({viewed: 'false'}).exec(function countCB(err, count) {
      Alarm.watch(req);
        Alarm.find({}).exec(function countCB(err, alarms) {
        Alarm.subscribe(req.socket,alarms);
        res.json({
          user: user.user,
          alarms: count
        });
        });


      });
    });






  }


};




