$(function(){

//go to: http://api.jquery.com to read about each of the methods below and then set the apropriate button to apply the method to the content below it.

  //hide
  $("#b1").click(function(){
    $(".d1").hide('1000');
  });

  //show
  $("#b2").click(function(){
    $(".d1").show('600');
  });

  //toggle
  $('#b3').click(function(){
    $(".d1").toggle('200');

  });


  //css

    $('#b4').click(function(){

    $("#p2").css("color","orange");

    });


  //css (multiple property changes)

    $('#b5').click(function(){

    $("#p2").css("color","purple").css("border", "2px solid black");

    });

  //html

  $('#b6').click(function(){

    $('#p3').html("Change Text to this");
  });


  //prepend

  $('#b7').click(function(){

    $('#p3').prepend("Before");
  });



  //append

    $('#b8').click(function(){

    $('#p3').append("After");
  });



  //before


    $('#b9').click(function(){

    $('#p4').before("<h4>Before</h4>");
  });


  //after

  $('#b10').click(function(){

  $('#p4').after("<h4>After</h4>");
});

  //wrap
  $('#b11').click(function(){

    $('#p5').wrap('<div class="pinky"></div>');
    });


  //addClass
  $('#b12').click(function() {
    $('#p5').addClass('texty');

  });


  // clone

    $('#b13').click(function() {

      $('li').clone().appendTo('ul');
    });


  //fadeOut

  $("#b14").click(function(){
    $("#p6").fadeOut(200);
  });



  //fadeIn

  $('#b15').click(function(){
    $('#p6').fadeIn(600);

  });


  //fadeToggle

  $('#b16').click(function(){
    $('#p6').fadeToggle(200);

  });


  //slideUp

  $('#b17').click(function(){
    $('.box-content').slideUp();

  });


  //slideDown

  $('#b18').click(function(){
    $('.box-content').slideDown();


  });


   //slideToggle

   $('.box-header').click(function(){
    $('.box-content').slideToggle();
   });


  //animate

  $('#b19').click(function(){
    $('.box-animate').animate({height: "300px"});
    $('.box-animate').animate({width: "400px"});
    $('.box-animate').animate({height: "100px"});
    $('.box-animate').animate({width: "100px"});

  });


});