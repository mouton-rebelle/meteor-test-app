Members = new Meteor.Collection("members");
Tasks = new Meteor.Collection("tasks");

Meteor.subscribe('members', function () {
    if (!enougthMembersToStart()) Session.set('editing_members',true);
});
Meteor.subscribe('tasks', function () {
});

Session.set('ERROR_MESSAGE','');