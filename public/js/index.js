$('input[type="submit"]').mousedown(function(){
  $(this).css('background', '#2ecc71');
});
$('input[type="submit"]').mouseup(function(){
  $(this).css('background', '#1abc9c');
});

$('#loginform').click(function(){
  $('.login').fadeToggle('slow');
  $(this).toggleClass('green');
});

$('#register').click(function(){
  $('.register').fadeToggle('slow');
  $(this).toggleClass('green');
})

$(document).mouseup(function (e)
{
    var container = $(".login");
    var containers = $(".register");

    if (!container.is(e.target) // if the target of the click isn't the container...
        && container.has(e.target).length === 0) // ... nor a descendant of the container
    {
        container.hide();
        $('#loginform').removeClass('green');
    }

    if (!containers.is(e.target) // if the target of the click isn't the container...
        && containers.has(e.target).length === 0) // ... nor a descendant of the container
    {
        containers.hide();
        $('#register').removeClass('green');
    }
});
