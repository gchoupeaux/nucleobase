const models = require('../models');

var mockData = require('./mock_data');
var services = require('./services');
var services_join = {};
var reviewsArr = require('./reviews');
var reviewObj = {};
var messagesArr = require('./messages');
var messageObj = {};
var appointmentsArr = require('./appointments');
var appointmentObj = {};
var viewObj = {};
var ratingObj = {};


exports.seed = function (knex, Promise) {

  var services_ids = [];
  var profiles_ids = [];
  var trainers_ids = [];
  var users_ids = [];


  // delete all
  return models.ServiceJoin.where('id', '!=', '0').destroy()
    .then(models.Service.where('id', '!=', '0').destroy())
    .then(models.Auth.where('id', '!=', '0').destroy())
    .then(models.Payment.where('id', '!=', '0').destroy())
    .then(models.BankAccount.where('id', '!=', '0').destroy())
    .then(models.Review.where('id', '!=', '0').destroy())
    .then(models.Rating.where('id', '!=', '0').destroy())
    .then(models.Message.where('id', '!=', '0').destroy())
    .then(models.Appointment.where('id', '!=', '0').destroy())
    .then(models.UserTrainerJoin.where('id', '!=', '0').destroy())
    .then(models.Profile.where('id', '!=', '0').destroy())
    
    
    // write services table
    .then( () =>(Promise.each( services, el => {  
      //console.log(el.profile.first);
      return models.Service.forge(el.service).save()
        .then((service) => {

          // array of services id to build the join table
          services_ids.push(service.get('id'));
        })
        .catch((error) => {
          console.log(error);
        });
    })))

    // write user profile, auth, bank_account, payment 
    .then( () =>(Promise.each( mockData, el => {  
      
      //console.log(el.profile.first);

      return models.Profile.forge(el.profile).save()
        .then((profile) => {
          var profile_id = profile.get('id');
          var type = profile.get('type');
          
          // array of profile id to build the join table
          profiles_ids.push(profile_id);

          if (type !== 'trainer') {
            users_ids.push(profile_id);
          } else {
            // trainer by default if no type defined
            trainers_ids.push(profile_id);
          }

          el.auth.profile_id = profile_id;
          return models.Auth.forge(el.auth).save()
            // payment
            .then(() => {
              el.payment.user_id = profile_id;
              models.Payment.forge(el.payment).save();
            })
            // bank account
            .then(() => {
              el.bank_account.trainer_id = profile_id;
              models.BankAccount.forge(el.bank_account).save();
            });
        })
        .catch((error) => {
          console.log(error);
        });
    })))

    
    // Write the services join table
    .then( () =>(Promise.each( trainers_ids, id => {  
      
      // only treiner 
      services_join.user_id = id;
      // service are distributed randomly to user or trainer
      // Should filter on type on add service to only trainer
      services_join.service_id = services_ids[Math.floor(Math.random() * services_ids.length)]; 

      //console.log(el.profile.first);
      return models.ServiceJoin.forge(services_join).save()
        .catch((error) => {
          console.log(error);
        });
    })))

    // Write review table
    // user_id is the reviewer id (can be a trainer or a user)
    // trainer_id id the reviewed id (can be a trainer or a user)
    // user don't review each other
    // trainer don't review each other
    .then( () =>(Promise.each( profiles_ids, id => {  

      reviewObj.user_id = id; // reviewer id

      // check if user
      if (users_ids.indexOf(id) !== -1) {
        // can't review yourself
        let r = id;
        while ( id === r) {
          r = Math.floor(Math.random() * trainers_ids.length);
        }
        reviewObj.trainer_id = trainers_ids[r];

      } else {
        let r = id;
        while ( id === r) {
          r = Math.floor(Math.random() * users_ids.length);
        }
        reviewObj.trainer_id = users_ids[r];
      }

      // check if user or trainer
      reviewObj.review = reviewsArr[Math.floor(Math.random() * reviewsArr.length)].review.review;

      //console.log(el.profile.first);
      return models.Review.forge(reviewObj).save()
        .catch((error) => {
          console.log(error);
        });
    })))

    // write message table 
    // the sender can be a trainer or a user
    .then( () =>(Promise.each( profiles_ids, id => {  

      messageObj.sender = id; 

      // check if user
      if (users_ids.indexOf(id) !== -1) {
        // can't review yourself
        let r = id;
        while ( id === r) {
          r = Math.floor(Math.random() * trainers_ids.length);
        }
        messageObj.receiver = trainers_ids[r];

      } else {
        let r = id;
        while ( id === r) {
          r = Math.floor(Math.random() * users_ids.length);
        }
        messageObj.receiver = users_ids[r];
      }

      // check if user or trainer
      messageObj.message = messagesArr[Math.floor(Math.random() * messagesArr.length)].message.message;

      //console.log(el.profile.first);
      return models.Message.forge(messageObj).save()
        .catch((error) => {
          console.log(error);
        });
    })))

    // write appoitments table
    // the sender is ALWAYS the trainer
    .then( () =>(Promise.each( trainers_ids, id => {  

    // check if not USER (a TRAINER)
      appointmentObj.sender = id;
    
      // Choose a random user
      appointmentObj.receiver = users_ids[Math.floor(Math.random() * users_ids.length)];
      
      // Choose a random appoitment
      var r = Math.floor(Math.random() * appointmentsArr.length);
      appointmentObj.time = appointmentsArr[r].appointment.time;
      appointmentObj.date = appointmentsArr[r].appointment.date;
      appointmentObj.price = appointmentsArr[r].appointment.price;
      appointmentObj.location = appointmentsArr[r].appointment.location;

      //console.log(el.profile.first);
      return models.Appointment.forge(appointmentObj).save()
        .catch((error) => {
          console.log(error);
        });
    })))

    // write view table (user_trainer_join) 
    // A trainer can now which user see is profile
    // use random data
    .then( () =>(Promise.each( trainers_ids, id => {  
      
      // WARNING a trainer can be seen by multiple user

      viewObj.trainer_id = id;
      // each trainer is viewed by reandom user
      viewObj.user_id = users_ids[Math.floor(Math.random() * users_ids.length)];
      viewObj.view = true;

      //console.log(el.profile.first);
      return models.UserTrainerJoin.forge(viewObj).save()
        .catch((error) => {
          console.log(error);
        });      
    })))

    // write rating table
    // use random data
    // trainer reviewing customer
    .then( () =>(Promise.each( trainers_ids, id => {  

      ratingObj.trainer_id = id;
      ratingObj.user_id = users_ids[Math.floor(Math.random() * users_ids.length)];
      ratingObj.user_rating = Math.floor(Math.random() * 5) + 1; // between 1 an 5
      ratingObj.trainer_rating = 0;

      //console.log(el.profile.first);
      return models.Rating.forge(ratingObj).save()
        .catch((error) => {
          console.log(error);
        });      
    })))

    // customer reviewing trainer
    .then( () =>(Promise.each( users_ids, id => {  

      ratingObj.trainer_id = trainers_ids[Math.floor(Math.random() * users_ids.length)];
      ratingObj.user_id = id;
      ratingObj.trainer_rating = Math.floor(Math.random() * 5) + 1; // between 1 an 5
      ratingObj.user_rating = 0;

      //console.log(el.profile.first);
      return models.Rating.forge(ratingObj).save()
        .catch((error) => {
          console.log(error);
        });      
    })))

    .catch((error) => {
      console.log(error);
    });
};


/*
exports.seed = function (knex, Promise) {
  return models.Profile.where({ email: 'admin@domain.com' }).fetch()
    .then((profile) => {
      if (profile) {
        throw profile;
      }
      return models.Profile.forge({
        first: 'System',
        last: 'Admin',
        display: 'Administrator',
        email: 'admin@domain.com'
      }).save();
    })
    .error(err => {
      console.error('ERROR: failed to create profile');
      throw err;
    })
    .then((profile) => {
      return models.Auth.forge({
        type: 'local',
        password: 'admin123',
        profile_id: profile.get('id')
      }).save();
    })
    .error(err => {
      console.error('ERROR: failed to create auth');
    })
    .catch(() => {
      console.log('WARNING: defualt user already exists.');
    });
};
*/
