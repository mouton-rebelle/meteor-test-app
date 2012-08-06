// Client-side JavaScript, bundled and sent to client.

Members = new Meteor.Collection("members");
Tasks = new Meteor.Collection("tasks");

Meteor.subscribe('members', function () {
});
Meteor.subscribe('tasks', function () {
});

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
  ]
  return data;
};
Template.list_members.members = function () {
  return Members.find({}, {sort: {name: 1}});
};
Template.list_tasks.tasks = function() {
  return Tasks.find({});
}

Template.add_members.events = {
  'submit #form_members' : function(evt){
    evt.preventDefault();
    Members.insert( {
      name: $('#member_name').val(),
      sex: $('.sex:checked').val()
    });
  }
};



$(document).ready(function(){
  $('body').on('click','#add',function(){
    var now = new Date();
    console.log(Tasks.insert({
      categorie:$('.btn-group').first().find('.active').attr('id'),
      member:Members.findOne($('.btn-group').last().find('.active').attr('id')),
      time:$('#time').val(),
      timestamp:now.getTime()
    }));
  });
})