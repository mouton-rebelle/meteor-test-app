// ========================
// GLOBALS
// ========================
Handlebars.registerHelper('fromNow', function(date) {
  return moment(date).fromNow();
});

Handlebars.registerHelper('checked', function(value,check) {
  if (value == check) return 'checked="checked"';
  return '';
});


function enougthMembersToStart(){
  return Members.find({}).count()>1;
}

// ========================
// LIST CATEGORIES
// ========================
Template.list_categories.categories = function () {
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
  ];
  return data;
};

Template.list_categories.show = function(){
  if ( Session.get('page_id') == 'edit_members')
    return false;
  else
    return enougthMembersToStart();
};

// ========================
// LIST MEMBERS
// ========================
Template.list_members.members = function () {
  return Members.find({}, {sort: {name: 1}});
};

Template.list_members.notEnough = function() {
    return !enougthMembersToStart();
};

Template.list_members.edit = function(){
  if (!enougthMembersToStart())
    return true;
  else
    return Session.get('page_id') == 'edit_members';
};
// ========================
// ADD MEMBERS
// ========================

Template.add_members.skip = function(){
  return enougthMembersToStart();
};
Template.add_members.member = function(){
  return Members.findOne({_id:Session.get('edit_member_id')});
};

// ========================
// LIST TASKS
// ========================


Template.list_tasks.tasks = function() {
  var tasks =  Tasks.find({},{sort:{tsp:1}}).fetch();
  return tasks.slice(-5);
};


Template.stats.global = function () {
  var data =  Statistics.findOne({userId:'global'});
  console.log(data);
  return data;
};
Template.stats.local = function () {
  return Statistics.findOne({userId:Meteor.user()._id});
};