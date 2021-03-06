const db = require('../');

const Service = db.Model.extend({
  tableName: 'services',
  profiles: function() {
    return this.belongsToMany('Profile').through('ServiceJoin');
  }
});

module.exports = db.model('Servcice', Service);