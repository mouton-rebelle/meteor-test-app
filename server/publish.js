
Categories = new Meteor.Collection('categories');
Meteor.publish('categories', function () {
  return Categories.find();
});

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

Members = new Meteor.Collection('members');
Meteor.publish('members', function () {
  return Members.find( {userId:this.userId()} );
});



Tasks = new Meteor.Collection('tasks');
Meteor.publish('tasks'), function () {
  return Tasks.find( {userId:this.userId()} );
}
Tasks.allow(defaultPermissions);

Meteor.publish('stats'), function () {
  var self = this;
  var uuid = Meteor.uuid();
  var data = [
    {
      name:'camille',
      total:'200'
    }
  ]
  var handle = Tasks.find( {userId:this.userId()} ).observe({
    added: function(doc,idx) {
      self.set("data",data);
    }
  });

  // remove data and turn off observe when client unsubs
  self.onStop(function () {
    handle.stop();
    self.unset("data", uuid, ["data"]);
    self.flush();
  });
}
