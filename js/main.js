$(document).ready(function(){

var x=0;


$(".nav_link:eq[0]").hover(
  function(){x=0;});

$(".nav_link:eq[1]").hover(
  function(){x=1;});

$(".nav_link:eq[2]").hover(
  function(){x=2;});

$(".nav_link:eq[x]").addClass("active");












})
