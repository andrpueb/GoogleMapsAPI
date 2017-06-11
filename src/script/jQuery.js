var $options = $('.options');
var $arrow = $('.arrow');

/*$arrow.on('click', function(){
  $options.toggleClass('options_appear');
})*/


function weHaveAProblem(){
    alert('We are having problems loading google maps :(');
  }


//async http request using jquery

$.get("json/icons.json", callback);

function callback (mydata){
  myVM.iconList(mydata);
  myVM.markerIcon(myVM.iconList()[1].url);
}
