var $options = $('.options');
var $arrow = $('.arrow');

$arrow.on('click', function(){
  $options.toggleClass('options_appear');
})

//Google maps error handling
$.getScript("https://maps.googleapis.com/maps/api/js?libraries=places,drawing&key=AIzaSyCzglwScQnptg2QE0ydILSF10brDe3nTBs&v=3&callback=initMap")
  .fail(function() {
    $('.error').css('top', '30%');

  });
