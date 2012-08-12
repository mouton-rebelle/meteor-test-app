Members = new Meteor.Collection("members");
Tasks = new Meteor.Collection("tasks");
var defaultPermissions = {
  insert:function(userId,docs){
    docs.userId=userId;
    return true;
  },
  update:function(userId,docs,fields,modifier) {
    return userId == docs.userId;
  },
  remove:function(userId,docs){
    return userId == docs.userId;
  }
}
Meteor.publish('members', function () {
  return Members.find( {userId:this.userId()} );
});
Members.allow(defaultPermissions);

Meteor.publish('tasks', function () {
  return Tasks.find( {userId:this.userId()} );
});
Tasks.allow(defaultPermissions);