function showAlert(selector,className,message){
  $(id).prepend('<div class="alert fade in '+className+'">'+message+'</div>');
}

function validateField(selector,minLength,message)
{
  if ($(selector).val().length<minLength)
  {
    displayFieldError(selector,message);
    return false;
  } else
  {
    displayFieldSuccess(selector);
    return true;
  }
}

function displayFieldError(selector,message)
{
  clearFieldValidation(selector);
  $(selector).closest('.control-group').addClass('error');
  $(selector).closest('.controls').find('.help-block').remove();
  $(selector).one('blur',function(){
    validateField(selector,minLength,message);
  });
  if (message) $(selector).closest('.controls').append('<p class="help-block">' + message+ '</p>');
}
function clearFieldValidation(selector)
{
  $(selector).closest('.control-group').removeClass('error').removeClass('success');
  $(selector).closest('.controls').find('.help-block').remove();
}

function displayFieldSuccess(selector)
{
  clearFieldValidation(selector);
  $(selector).closest('.control-group').addClass('success');
}