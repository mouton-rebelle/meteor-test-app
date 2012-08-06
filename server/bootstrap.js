// if the database is empty on server start, create some sample data.
Meteor.startup(function () {

  var data = [
    'vaisselle',
    'cuisine',
    'linge',
    'ménage',
    'paperasse',
    'courses',
    'enfants',
    'bricolage',
    'jardinage',
    'entretien'
    ]

  if (Categories.find().count() === 0) {
    _.each(data,function(i){
      Categories.insert({
        name:i
      });
    });
  }
});
