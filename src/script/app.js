
//MODEL

var firstPlaces = [{    title: 'Gordons wine bar',
    location: {
      lat: 51.508144,
      lng: -0.123314
    },
    id: '4acdb591f964a520c7cc20e3'
  },
  {
    title: 'Taro Asian Restaurant',
    location: {
      lat: 51.511638,
      lng: -0.135577
    },
    id: '4b7152d5f964a52022412de3'
  },
  {
    title: 'Franco Manca Pizzeria',
    location: {
      lat: 51.515339,
      lng: -0.136489
    },
    id: '55aab651498e32cd64c46495'
  },
  {
    title: 'Covent Garden',
    location: {
      lat: 51.511852,
      lng: -0.122594
    },
    id: '4ba6419bf964a520b23f39e3'
  },
  {
    title: 'Dishoom Indian Restaurant',
    location: {
      lat: 51.512664,
      lng: -0.126932
    },
    id: '4c31c371a0ced13a150d146e'
  },
  {
    title: 'Tortilla Mexican Food',
    location: {
      lat: 51.508768,
      lng: -0.126626
    },
    id: '531750e9498e3eae0c96b150'
  }
];

//VIEWMODEL

var Location = function(data) {
  this.title = data.title;
  this.location = {};
  this.location.lat = data.location.lat;
  this.location.lng = data.location.lng;
  this.id = data.id;
  this.appear = ko.observable(true);
};


var ViewModel = function() {
  var self = this;
  self.iconList = ko.observableArray([]);//In this array we put the icon objects after the http request
  self.markerIcon = ko.observable();

  self.searchResults = ko.observableArray([]);
  self.Query = ko.observable('');
  firstPlaces.forEach(function(placeItem) {
    self.searchResults.push(new Location(placeItem));
  });

//Filters the input and shows or not the markers and the elewments of the list
  self.searchInput = ko.computed(function() {
    var userInput = self.Query().toLowerCase();
    for (var i = 0; i < self.searchResults().length; i++) {
      if (self.searchResults()[i].title.toLowerCase().indexOf(userInput) >= 0) {
        self.searchResults()[i].appear(true);
        if (self.searchResults()[i].marker) {
          self.searchResults()[i].marker.setVisible(true);
        }
      } else {
        self.searchResults()[i].appear(false);
        if (self.searchResults()[i].marker) {
          self.searchResults()[i].marker.setVisible(false);
        }
      }
    }
  });


  self.toggleOptions = ko.observable(true);




  self.showOptions = function(){
    if(self.toggleOptions() === true ){
      self.toggleOptions(false);
    }else if (self.toggleOptions() === false ){
      self.toggleOptions(true);
    }
  };

  console.log(self.toggleOptions());


//When the element in the list is clicked it triggers the event attached to the marker
  self.showMyMarker = function(location) {
    console.log(location.marker);
    google.maps.event.trigger(location.marker, "click");
  };


//Changes the icon
  self.changeIcon = function(icon) {
    self.markerIcon = (icon.url);
    for (var i = 0; i < self.searchResults().length; i++) {
      self.searchResults()[i].marker.setIcon(self.markerIcon);
      console.log(self.searchResults()[i].marker.icon);
    }
  };
  console.log(this.searchResults());
};

var myVM = new ViewModel();

ko.applyBindings(myVM);


//getIconsJson ();

function populateInfoWindow(marker, infowindow) {  // Check to make sure the infowindow is not already opened on this marker.
  if (infowindow.marker != marker) {
    infowindow.marker = marker;
    console.log(marker.title);
    var theUrl = "https://api.foursquare.com/v2/venues/" + marker.id + "?v=20131016&client_id=AZHL0ZO2D4HUKB04UTI2DSNVX0TCG0L1BOOKA3YXBURZ1NVN&client_secret=DQSLA5NG3105YR4Q1QI1G3T1H1YJHMOTYRD4HLIMAAXI3GEM";
    $.ajax({
      url: theUrl,
      data: {
        format: 'json'
      },
      dataType: 'jsonp',
      success: function(data) {
        infowindow.setContent(
          '<div>' +
          '<img src="images/Foursquare.png" style="max-width: 100px" ><br>' +
          marker.title + '<br>' +
          data.response.venue.categories[0].name +
          '<br>' +
          '<img src=' + data.response.venue.bestPhoto.prefix + '100x100' + data.response.venue.bestPhoto.suffix + '>' +
          '<br>' +
          'Rating: ' + data.response.venue.rating +
          '<br>' +
          '</div>');
        console.log(data.response.venue);
      },
      error: function() {
        infowindow.setContent('<div> Please check your internet connection or try again later </div>');
      }
    });
    infowindow.setContent('<div>' + marker.title + '</div>');
    infowindow.open(map, marker);
    // Make sure the marker property is cleared if the infowindow is closed.
    infowindow.addListener('closeclick', function() {
      infowindow.setMarker = null;
    });
  }
}

//Makes the marker bounce after selected
function toggleBounce(marker) {
  if (marker.getAnimation() !== null) {
    marker.setAnimation(null);
  } else {
    marker.setAnimation(google.maps.Animation.BOUNCE);
    setTimeout(function() {
      marker.setAnimation(null);
    }, 1400);
  }
}


//  GOOGLE MAPS
function initMap() {

  //Two more styles mad
  var retroMap = new google.maps.StyledMapType(
    [{
        "elementType": "geometry",
        "stylers": [{
          "color": "#ebe3cd"
        }]
      },
      {
        "elementType": "labels.text.fill",
        "stylers": [{
          "color": "#523735"
        }]
      },
      {
        "elementType": "labels.text.stroke",
        "stylers": [{
          "color": "#f5f1e6"
        }]
      },
      {
        "featureType": "administrative",
        "elementType": "geometry.stroke",
        "stylers": [{
          "color": "#c9b2a6"
        }]
      },
      {
        "featureType": "administrative.land_parcel",
        "elementType": "geometry.stroke",
        "stylers": [{
          "color": "#dcd2be"
        }]
      },
      {
        "featureType": "administrative.land_parcel",
        "elementType": "labels",
        "stylers": [{
          "visibility": "off"
        }]
      },
      {
        "featureType": "administrative.land_parcel",
        "elementType": "labels.text.fill",
        "stylers": [{
          "color": "#ae9e90"
        }]
      },
      {
        "featureType": "landscape.natural",
        "elementType": "geometry",
        "stylers": [{
          "color": "#dfd2ae"
        }]
      },
      {
        "featureType": "poi",
        "elementType": "geometry",
        "stylers": [{
          "color": "#dfd2ae"
        }]
      },
      {
        "featureType": "poi",
        "elementType": "labels.text",
        "stylers": [{
          "visibility": "off"
        }]
      },
      {
        "featureType": "poi",
        "elementType": "labels.text.fill",
        "stylers": [{
          "color": "#93817c"
        }]
      },
      {
        "featureType": "poi.business",
        "stylers": [{
          "visibility": "off"
        }]
      },
      {
        "featureType": "poi.park",
        "elementType": "geometry.fill",
        "stylers": [{
          "color": "#a5b076"
        }]
      },
      {
        "featureType": "poi.park",
        "elementType": "labels.text",
        "stylers": [{
          "visibility": "off"
        }]
      },
      {
        "featureType": "poi.park",
        "elementType": "labels.text.fill",
        "stylers": [{
          "color": "#447530"
        }]
      },
      {
        "featureType": "road",
        "elementType": "geometry",
        "stylers": [{
          "color": "#f5f1e6"
        }]
      },
      {
        "featureType": "road.arterial",
        "elementType": "geometry",
        "stylers": [{
          "color": "#fdfcf8"
        }]
      },
      {
        "featureType": "road.highway",
        "elementType": "geometry",
        "stylers": [{
          "color": "#f8c967"
        }]
      },
      {
        "featureType": "road.highway",
        "elementType": "geometry.stroke",
        "stylers": [{
          "color": "#e9bc62"
        }]
      },
      {
        "featureType": "road.highway.controlled_access",
        "elementType": "geometry",
        "stylers": [{
          "color": "#e98d58"
        }]
      },
      {
        "featureType": "road.highway.controlled_access",
        "elementType": "geometry.stroke",
        "stylers": [{
          "color": "#db8555"
        }]
      },
      {
        "featureType": "road.local",
        "elementType": "labels",
        "stylers": [{
          "visibility": "off"
        }]
      },
      {
        "featureType": "road.local",
        "elementType": "labels.text.fill",
        "stylers": [{
          "color": "#806b63"
        }]
      },
      {
        "featureType": "transit.line",
        "elementType": "geometry",
        "stylers": [{
          "color": "#dfd2ae"
        }]
      },
      {
        "featureType": "transit.line",
        "elementType": "labels.text.fill",
        "stylers": [{
          "color": "#8f7d77"
        }]
      },
      {
        "featureType": "transit.line",
        "elementType": "labels.text.stroke",
        "stylers": [{
          "color": "#ebe3cd"
        }]
      },
      {
        "featureType": "transit.station",
        "elementType": "geometry",
        "stylers": [{
          "color": "#dfd2ae"
        }]
      },
      {
        "featureType": "water",
        "elementType": "geometry.fill",
        "stylers": [{
          "color": "#b9d3c2"
        }]
      },
      {
        "featureType": "water",
        "elementType": "labels.text.fill",
        "stylers": [{
          "color": "#92998d"
        }]
      }
    ],
    {name: 'Retro'});
  var nightMap = new google.maps.StyledMapType(
    [{
      "elementType": "geometry",
      "stylers": [{
        "color": "#242f3e"
      }]
    },
    {
      "elementType": "labels.text.fill",
      "stylers": [{
        "color": "#746855"
      }]
    },
    {
      "elementType": "labels.text.stroke",
      "stylers": [{
        "color": "#242f3e"
      }]
    },
    {
      "featureType": "administrative.land_parcel",
      "elementType": "labels",
      "stylers": [{
        "visibility": "off"
      }]
    },
    {
      "featureType": "administrative.locality",
      "elementType": "labels.text.fill",
      "stylers": [{
        "color": "#d59563"
      }]
    },
    {
      "featureType": "poi",
      "elementType": "labels.text",
      "stylers": [{
        "visibility": "off"
      }]
    },
    {
      "featureType": "poi",
      "elementType": "labels.text.fill",
      "stylers": [{
        "color": "#d59563"
      }]
    },
    {
      "featureType": "poi.business",
      "stylers": [{
        "visibility": "off"
      }]
    },
    {
      "featureType": "poi.park",
      "elementType": "geometry",
      "stylers": [{
        "color": "#263c3f"
      }]
    },
    {
      "featureType": "poi.park",
      "elementType": "labels.text",
      "stylers": [{
        "visibility": "off"
      }]
    },
    {
      "featureType": "poi.park",
      "elementType": "labels.text.fill",
      "stylers": [{
        "color": "#6b9a76"
      }]
    },
    {
      "featureType": "road",
      "elementType": "geometry",
      "stylers": [{
        "color": "#38414e"
      }]
    },
    {
      "featureType": "road",
      "elementType": "geometry.stroke",
      "stylers": [{
        "color": "#212a37"
      }]
    },
    {
      "featureType": "road",
      "elementType": "labels.text.fill",
      "stylers": [{
        "color": "#9ca5b3"
      }]
    },
    {
      "featureType": "road.highway",
      "elementType": "geometry",
      "stylers": [{
        "color": "#746855"
      }]
    },
    {
      "featureType": "road.highway",
      "elementType": "geometry.stroke",
      "stylers": [{
        "color": "#1f2835"
      }]
    },
    {
      "featureType": "road.highway",
      "elementType": "labels.text.fill",
      "stylers": [{
        "color": "#f3d19c"
      }]
    },
    {
      "featureType": "road.local",
      "elementType": "labels",
      "stylers": [{
        "visibility": "off"
      }]
    },
    {
      "featureType": "transit",
      "elementType": "geometry",
      "stylers": [{
        "color": "#2f3948"
      }]
    },
    {
      "featureType": "transit.station",
      "elementType": "labels.text.fill",
      "stylers": [{
        "color": "#d59563"
      }]
    },
    {
      "featureType": "water",
      "elementType": "geometry",
      "stylers": [{
        "color": "#17263c"
      }]
    },
    {
      "featureType": "water",
      "elementType": "labels.text.fill",
      "stylers": [{
        "color": "#515c6d"
      }]
    },
    {
      "featureType": "water",
      "elementType": "labels.text.stroke",
      "stylers": [{
        "color": "#17263c"
      }]
    }
  ],
  { name: 'Night'});

  var  map = new google.maps.Map(document.getElementById('map'), {
      center: {lat: 51.508408, lng: -0.127676},
      zoom: 10,
      mapTypeControl: true,
      mapTypeControlOptions: {
        style: google.maps.MapTypeControlStyle.DROPDOWN_MENU,
        position: google.maps.ControlPosition.TOP_CENTER,
        mapTypeIds: ['roadmap', 'satellite', 'hybrid', 'terrain',
                   'retromap', 'nightmap']
      },
      zoomControl: true,
      zoomControlOptions: {
        position: google.maps.ControlPosition.LEFT_CENTER
      },
      scaleControl: true,
      streetViewControl: true,
      streetViewControlOptions: {
        position: google.maps.ControlPosition.TOP_CENTER
      },
      fullscreenControl: true
    });

  //Two mor styled maps added to the options
    map.mapTypes.set('nightmap', nightMap);
    map.setMapTypeId('nightmap');
    map.mapTypes.set('retromap', retroMap);
    map.setMapTypeId('retromap');


  var myInfowindow = new google.maps.InfoWindow();
  var bounds = new google.maps.LatLngBounds();

  function insertInfoWindow (){
    populateInfoWindow(this, myInfowindow);
  }

  function insertBounce(){
    toggleBounce(this);
  }

  for (var i = 0; i < myVM.searchResults().length; i++) {
    // Get the position from the location array.
    var position = myVM.searchResults()[i].location;
    var title = myVM.searchResults()[i].title;
    var id = myVM.searchResults()[i].id;
    var icon = myVM.markerIcon();
    // Create a marker per location, and put into markers array.
    var marker = new google.maps.Marker({
      map: map,
      position: position,
      title: title,
      animation: google.maps.Animation.DROP,
      icon: icon,
      id: id
    });

    // Push the marker to our searchResults array adding a marker object to each location.
    myVM.searchResults()[i].marker = marker;

    // Create an onclick event to open the large infowindow at each marker.

    marker.addListener('click', insertInfoWindow);
    //Add the bounce event to the marker
    marker.addListener('click', insertBounce);

    bounds.extend(myVM.searchResults()[i].marker.position);
  }

  //Keeps the markers inside the window when resizing it
  google.maps.event.addDomListener(window, 'resize', function() {
  map.fitBounds(bounds);
  });

}
