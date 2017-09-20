const models = require('../../db/models');

module.exports.create = (req, res) => {

  var newRating = 0;
  
  models.Rating.forge(req.body)
  .save()
  .then(rating => {

    // get profile rating and rating_count ( with req.body.trainer_id ) 
    // trainer_id is the id of the rated person can be a trainee or a trainer
    newRating = rating.attributes.user_rating;
    models.Profile.where({id: rating.attributes.trainer_id})
    .fetch()
    .then((profile) => {
      
      // calculate new average rating
      // new average rating = (( average rating * rating count ) + new rating) /  (rating count + 1)
      var newAverageRating = Math.round(((profile.attributes.rating * profile.attributes.rating_count) + Number(newRating)) / (profile.attributes.rating_count + 1));
      
      // update profile 
      req.body = {
        rating: newAverageRating,
        rating_count: profile.attributes.rating_count + 1
      };

      profile.save(req.body, { method: 'update' })
      .then((profile) => {
        res.status(201).send(profile);
      });      
    });
  })
  .catch(error => {
    res.status(500).send(error);
  });
};

module.exports.delete = (req, res) => {
  models.Rating.where(req.body)
  .fetch()
  .then(rating => {
    if (!rating) {
      throw rating;
    }

    return rating.destroy();
  })
  .then(() => {
    res.sendStatus(200);
  })
  .error(error => {
    res.status(503).send(error);
  })
  .catch(() => {
    res.sendStatus(404);
  });
};

module.exports.update = (req, res) => {

  var oldRating = 0;
  var newRating = 0;

  models.Rating.where({ id: req.body.id })
  .fetch()
  .then(rating => {
    if (!rating) {
      throw rating;
    }
    oldRating = rating.attributes.user_rating; 

    return rating.save(req.body, { method: 'update' });
  })
  .then(rating => {

    // get profile rating and rating_count ( with req.body.trainer_id ) 
    // trainer_id is the id of the rated person can be a trainee or a trainer
    newRating = rating.attributes.user_rating;
    models.Profile.where({id: rating.attributes.trainer_id})
    .fetch()
    .then((profile) => {

      var sum = profile.attributes.rating * profile.attributes.rating_count + (Number(newRating) - Number(oldRating));
      // calculate new average rating
      /// new average rating = (( average rating * rating count ) + (new rating - past rating)) /  (rating count)
      var newAverageRating = Math.round( sum / profile.attributes.rating_count);

      // update profile 
      req.body = {
        rating: newAverageRating,
      };

      profile.save(req.body, { method: 'update' })
      .then((profile) => {
        res.status(201).send(profile);
      });      
    });
    
  })
  .error(error => {
    res.status(500).send(error);
  })
  .catch(() => {
    res.sendStatus(404);
  });
};

module.exports.get = (req, res) => {
  models.Rating.where(req.query)
  .fetchAll()
  .then(ratings => {
    res.status(200).send(ratings);
  })
  .catch(error => {
    res.status(503).send(error);
  });
};