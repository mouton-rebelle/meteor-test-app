Members = new Meteor.Collection("members");
Tasks = new Meteor.Collection("tasks");
Statistics = new Meteor.Collection("statistics");

Meteor.subscribe('members', function () {
    if (!enougthMembersToStart()) Session.set('editing_members',true);
});
Meteor.subscribe('tasks', function () {
});
Meteor.subscribe('statistics', function () {
});
Session.set('ERROR_MESSAGE','');