Handlebars.registerHelper('fromNow', function(date) {
  return moment(date).fromNow(true);
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
  ];
  return data;
};
Template.list_members.members = function () {
  return Members.find({}, {sort: {name: 1}});
};
Template.list_members.events = {
  'click #edit' : function(evt){
    Session.set('editing_members',true);
  }
};
Template.list_tasks.tasks = function() {
  return Tasks.find({});
};
Template.add_members.skip = function(){
  return enougthMembersToStart();
};
Template.add_members.events = {
  'submit #form_members' : function(evt){
    evt.preventDefault();
    Members.insert( {
      name: $('#member_name').val(),
      sex: $('.sex:checked').val()
    });
  },
  'click a' : function(evt){
    Session.set('editing_members',false);
  }
};
Template.error.error = function() {
  return Session.get('ERROR_MESSAGE');
};

Template.hero.events = {
  'click #btn-login' : function(evt){
    Router.setPage('login');
  },
  'click #btn-register' : function(evt){
    Router.setPage('register');
  }
};

function enougthMembersToStart(){
  return Members.find({}).count()>1;
}

Template.list_members.notEnough = !enougthMembersToStart();
Template.list_members.edit = function(){
  if (!enougthMembersToStart())
    return true;
  else
    return Session.get('editing_members');
};

Template.list_categories.show = function(){
  if ( Session.get('editing_members') === true)
    return false;
  else
    return enougthMembersToStart();
};
Template.list_categories.events = {
  'click add' : function(evt){
    var now = new Date();
    Tasks.insert({
      categorie:$('.btn-group').first().find('.active').attr('id'),
      member:Members.findOne($('.btn-group').last().find('.active').attr('id')),
      time:$('#time').val(),
      timestamp:now.getTime()
    },function(cb){

    });
  }
};
Template.inscription.events = {
  'submit #register' : function(evt){
    evt.preventDefault();
    var hasError = false;

    if (!validateField('#register_login',3,'Pas si vite papillon !')) hasError=true;
    if (!validateField('#register_password',6,'Le mot de passe fait au moins 6 caractères, petit scarabée !')) hasError=true;
    if (!validateField('#register_team',2,'Tu manques de sérieux!')) hasError=true;
    if ($('#register_password').val()!=$('#register_password2').val()) {
      displayFieldError('#register_password2', 'Trompage !');
      hasError=true;
    } else {
      displayFieldSuccess('#register_password2');
    }
    if (hasError)
    {
      return false;
    }
    Meteor.createUser(
      {
        username:$('#register_login').val(),
        password:$('#register_password').val()
      },
      {
        team:$('#register_team').val()
      },
      function (error, result){
        if (error) {
          if (error.reason == 'User already exists with username '+$('#register_login').val()) displayFieldError('#register_login', 'Déjà pris !');
        } else {
          $('#register').modal('hide');
        }

      });
  }
};
Template.login.events = {
  'submit #login' : function(evt){

    evt.preventDefault();

    var hasError = false;

    if (!validateField('#user_login',3,'Pas si vite papillon !')) hasError=true;
    if (!validateField('#user_password',6,'Le mot de passe fait au moins 6 caractères, petit scarabée !')) hasError=true;

    if (hasError)
    {
      return false;
    }

    Meteor.loginWithPassword(
      $('#user_login').val(),
      $('#user_password').val(),
      function (error, result){

        if (error) {
          if (error.reason == 'Incorrect password') displayFieldError('#user_password', 'Désolé mais ce mot ne passe est totalement faux');
          if (error.reason == 'User not found') displayFieldError('#user_login', 'Oups, connait pas');
        } else {
          $('#login').modal('hide');
        }

      });
  }
};