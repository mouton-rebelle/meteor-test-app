Members = new Meteor.Collection("members");
Tasks = new Meteor.Collection("tasks");
Statistics = new Meteor.Collection("statistics");
var defaultPermissions = {
  insert:function(userId,doc){
    doc.userId=userId;
    return true;
  },
  update:function(userId,docs,fields,modifier) {
    // Meteor._debug(fields,docs,modifier,userId);
    for(var i in docs)
    {
      if (docs[i].userId != userId) return false;
    }
    return true;
  },
  remove:function(userId,docs){
    return userId == docs.userId;
  }
};
Meteor.publish('members', function () {
  return Members.find( {userId:this.userId()} );
});
Members.allow(defaultPermissions);

Meteor.publish('tasks', function () {
  return Tasks.find( {userId:this.userId()} );
});
Tasks.allow(defaultPermissions);

Meteor.publish('statistics', function () {
  return Statistics.find(
    {
      userId:{
        $in:[
          this.userId(),
          'global'
        ]
      }
    }
  );
});

Meteor.methods({
  addTask : function(categorie,time,tsp,member)
  {
    Tasks.insert({
      categorie:categorie,
      time:time,
      timestamp:tsp,
      member:member,
      userId:this.userId()
    });
    var nb = Statistics.find({userId:this.userId()}).count();
    if (nb===0)
    {
      Statistics.insert({
        m: 0,
        f: 0,
        total: 0,
        userId: this.userId()
      });
    }
    Statistics.update(
      {
        userId:{$in:['global',this.userId()]}
      },
      {
        $inc:{
          m: member.sex=='m' ? time*1 : 0,
          f: member.sex=='f' ? time*1 : 0,
          total: time*1
        }
      },
      {
        multi:true
      }
    );
  }
});