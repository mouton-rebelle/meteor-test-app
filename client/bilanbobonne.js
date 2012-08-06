// Client-side JavaScript, bundled and sent to client.

// Define Minimongo collections to match server/publish.js.
Categories = new Meteor.Collection("categories");
Members = new Meteor.Collection("members");
Tasks = new Meteor.Collection("tasks");

Meteor.subscribe('categories', function () {
});

Meteor.subscribe('members', function () {
});

Meteor.subscribe('stats', function (data) {
  console.log(data);
  Meteor.ui.render(function () {
    return Template.test({data: data});
  })
});
Template.list_categories.categories = function () {
  return Categories.find({}, {sort: {name: 1}});
};
Template.list_members.members = function () {
  return Members.find({}, {sort: {name: 1}});
};
Template.add_categories.events = {
  'submit #form_categories' : function(evt){
    evt.preventDefault();
    Categories.insert( {
      name: $('#cat_name').val(),
      place: $('#cat_place').val()
    });
    $('#form_categories').reset();
  }
};

Template.add_members.events = {
  'submit #form_members' : function(evt){
    evt.preventDefault();
    Members.insert( {
      name: $('#member_name').val(),
      sex: $('#member_sex').val()
    });
  }
};
$(document).ready(function(){
  $('body').on('click','#add',function(){
    Tasks.insert({
      catId:$('.btn-group').first().find('.active').attr('id'),
      memberId:$('.btn-group').last().find('.active').attr('id'),
      time:$('#time').val()
    });
  });
})