// ========================
// HERO
// ========================

Template.hero.events = {
  'click #btn-login' : function(evt){
    Router.setPage('login');
  },
  'click #btn-register' : function(evt){
    Router.setPage('register');
  }
};


// ========================
// LIST MEMBERS
// ========================

Template.list_members.events = {
  'click #edit' : function(evt){
    // Session.set('editing_members',true);
    Router.setPage('edit_members');
  },
  'click .edit' : function(evt) {
    Session.set('edit_member_id',evt.target.id);
  }
};


// ========================
// ADD MEMBERS
// ========================

Template.add_members.events = {
  'submit #form_members' : function(evt){

    evt.preventDefault();
    if (Session.get('edit_member_id'))
    {
      Members.update(
      {
          _id:Session.get('edit_member_id')
      },
      {
        $set:
        {
          name: $('#member_name').val(),
          sex: $('.sex:checked').val()
        }
      });
      console.log(Session.get('edit_member_id'),Meteor.user()._id,$('#member_name').val());
      Tasks.update(
      {
        'member._id':Session.get('edit_member_id'),
        userId:Meteor.user()._id

      },
      {
        $set:
        {
          'member.name': $('#member_name').val(),
          'member.sex': $('.sex:checked').val()
        }
      },{
        multi: true
      },function(err){
        // @TODO gérer les éventuelles erreurs (mais c surtout pour not block)
      });
    } else {
      Members.insert( {
        name: $('#member_name').val(),
        sex: $('.sex:checked').val()
      });
    }
    evt.target.reset();
    Session.set('edit_member_id',null);
  },
  'click a' : function(evt){
    Session.set('edit_member_id',null);
    Router.setPage(null);
  }
};
Template.error.error = function() {
  return Session.get('ERROR_MESSAGE');
};


// ========================
// LIST CATEGORIES
// ========================

Template.list_categories.events = {
  'click #add' : function(evt){
    var now = new Date();
    var categorie = $('.btn-group').last().find('.active').attr('id');
    var member = Members.findOne($('.btn-group').first().find('.active').attr('id'));
    var time = $('#time').val();
    var tsp = now.getTime();

    Meteor.apply('addTask',[categorie,time,tsp,member],function(error,result){
      console.log(error,result);
    });
  }
};


// ========================
// REGISTER
// ========================

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

// ========================
// LOGIN
// ========================


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