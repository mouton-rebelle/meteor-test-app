Session.set('page_id',null);
Session.set('editing_members',false);

$(document).ready(function(){

  $('body').on('click','#logout',function(){
    Meteor.logout();
  });

});


////////// Tracking selected list in URL //////////

var BobonneRouter = Backbone.Router.extend({
  routes: {
    ":page_id": "main"
  },
  main: function (page_id) {
    Session.set("page_id", page_id);
    if (page_id == 'login') {
      $('#login').modal('show');
      $('#login').one('hide',function(){
        Router.setPage(null);
      });
    } else if (page_id == 'register') {
      $('#register').modal('show');
      $('#register').one('hide',function(){
        Router.setPage(null);
      });
    } else {
      // $('#login').modal('close');
      // $('#register').modal('close');
    }
  },
  setPage: function (page_id) {
    console.log('setPage ' + page_id);
    this.navigate(page_id, true);
  }
});

Router = new BobonneRouter();

Meteor.startup(function () {
  Backbone.history.start({pushState: true});
});
