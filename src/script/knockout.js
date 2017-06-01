var firstPlaces = [{
    title: 'London Eye',
    location: {
      lat: 51.503518,
      lng: -0.119704
    }
  },
  {
    title: 'Big Ben',
    location: {
      lat: 51.500943,
      lng: -0.124615
    }
  },
  {
    title: 'Covent Garden',
    location: {
      lat: 51.512194,
      lng: -0.122713
    }
  },
  {
    title: 'Hyde Park',
    location: {
      lat: 51.506966,
      lng: -0.169387
    }
  },
  {
    title: 'Waterloo',
    location: {
      lat: 51.503352,
      lng: -0.112327
    }
  },
  {
    title: 'Buckingham Palace',
    location: {
      lat: 51.501313,
      lng: -0.141820
    }
  }
];

var Location = function(data) {
  this.title = ko.observable(data.title);
  this.location = {};
  this.location.lat = data.location.lat;
  this.location.lng = data.location.lng;
};

var ViewModel = function() {
  var self = this;
  this.placeList = ko.observableArray([]);


  firstPlaces.forEach(function(placeItem) {
    self.placeList.push(new Location(placeItem));

  });

  this.Query = ko.observable('');
  this.searchResults = ko.computed(function() {
      var userInput = self.Query();
      return self.placeList().filter(function(i) {
        return i.title().toLowerCase().indexOf(userInput) >= 0;
      });

  });

  console.log(this.searchResults());

  this.searchArray = ko.observableArray([]);
  this.searchResults().forEach(function(searchItem){
    self.searchArray.push(searchItem);
  })

  console.log(this.searchArray());

}






var myVM = new ViewModel() //I need to create an instance to access the properties of the VM



ko.applyBindings(myVM);


// Activates knockout.js
