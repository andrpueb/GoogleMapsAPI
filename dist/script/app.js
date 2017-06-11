function populateInfoWindow(e,t){if(t.marker!=e){t.marker=e,console.log(e.title);var l="https://api.foursquare.com/v2/venues/"+e.id+"?v=20131016&client_id=AZHL0ZO2D4HUKB04UTI2DSNVX0TCG0L1BOOKA3YXBURZ1NVN&client_secret=DQSLA5NG3105YR4Q1QI1G3T1H1YJHMOTYRD4HLIMAAXI3GEM";$.ajax({url:l,data:{format:"json"},dataType:"jsonp",success:function(l){t.setContent('<div><img src="images/Foursquare.png" style="max-width: 100px" ><br>'+e.title+"<br>"+l.response.venue.categories[0].name+"<br><img src="+l.response.venue.bestPhoto.prefix+"100x100"+l.response.venue.bestPhoto.suffix+"><br>Rating: "+l.response.venue.rating+"<br></div>"),console.log(l.response.venue)},error:function(){t.setContent("<div> Please check your internet connection or try again later </div>")}}),t.setContent("<div>"+e.title+"</div>"),t.open(map,e),t.addListener("closeclick",function(){t.setMarker=null})}}function toggleBounce(e){null!==e.getAnimation()?e.setAnimation(null):(e.setAnimation(google.maps.Animation.BOUNCE),setTimeout(function(){e.setAnimation(null)},1400))}function initMap(){var e=new google.maps.StyledMapType([{elementType:"geometry",stylers:[{color:"#ebe3cd"}]},{elementType:"labels.text.fill",stylers:[{color:"#523735"}]},{elementType:"labels.text.stroke",stylers:[{color:"#f5f1e6"}]},{featureType:"administrative",elementType:"geometry.stroke",stylers:[{color:"#c9b2a6"}]},{featureType:"administrative.land_parcel",elementType:"geometry.stroke",stylers:[{color:"#dcd2be"}]},{featureType:"administrative.land_parcel",elementType:"labels",stylers:[{visibility:"off"}]},{featureType:"administrative.land_parcel",elementType:"labels.text.fill",stylers:[{color:"#ae9e90"}]},{featureType:"landscape.natural",elementType:"geometry",stylers:[{color:"#dfd2ae"}]},{featureType:"poi",elementType:"geometry",stylers:[{color:"#dfd2ae"}]},{featureType:"poi",elementType:"labels.text",stylers:[{visibility:"off"}]},{featureType:"poi",elementType:"labels.text.fill",stylers:[{color:"#93817c"}]},{featureType:"poi.business",stylers:[{visibility:"off"}]},{featureType:"poi.park",elementType:"geometry.fill",stylers:[{color:"#a5b076"}]},{featureType:"poi.park",elementType:"labels.text",stylers:[{visibility:"off"}]},{featureType:"poi.park",elementType:"labels.text.fill",stylers:[{color:"#447530"}]},{featureType:"road",elementType:"geometry",stylers:[{color:"#f5f1e6"}]},{featureType:"road.arterial",elementType:"geometry",stylers:[{color:"#fdfcf8"}]},{featureType:"road.highway",elementType:"geometry",stylers:[{color:"#f8c967"}]},{featureType:"road.highway",elementType:"geometry.stroke",stylers:[{color:"#e9bc62"}]},{featureType:"road.highway.controlled_access",elementType:"geometry",stylers:[{color:"#e98d58"}]},{featureType:"road.highway.controlled_access",elementType:"geometry.stroke",stylers:[{color:"#db8555"}]},{featureType:"road.local",elementType:"labels",stylers:[{visibility:"off"}]},{featureType:"road.local",elementType:"labels.text.fill",stylers:[{color:"#806b63"}]},{featureType:"transit.line",elementType:"geometry",stylers:[{color:"#dfd2ae"}]},{featureType:"transit.line",elementType:"labels.text.fill",stylers:[{color:"#8f7d77"}]},{featureType:"transit.line",elementType:"labels.text.stroke",stylers:[{color:"#ebe3cd"}]},{featureType:"transit.station",elementType:"geometry",stylers:[{color:"#dfd2ae"}]},{featureType:"water",elementType:"geometry.fill",stylers:[{color:"#b9d3c2"}]},{featureType:"water",elementType:"labels.text.fill",stylers:[{color:"#92998d"}]}],{name:"Retro"}),t=new google.maps.StyledMapType([{elementType:"geometry",stylers:[{color:"#242f3e"}]},{elementType:"labels.text.fill",stylers:[{color:"#746855"}]},{elementType:"labels.text.stroke",stylers:[{color:"#242f3e"}]},{featureType:"administrative.land_parcel",elementType:"labels",stylers:[{visibility:"off"}]},{featureType:"administrative.locality",elementType:"labels.text.fill",stylers:[{color:"#d59563"}]},{featureType:"poi",elementType:"labels.text",stylers:[{visibility:"off"}]},{featureType:"poi",elementType:"labels.text.fill",stylers:[{color:"#d59563"}]},{featureType:"poi.business",stylers:[{visibility:"off"}]},{featureType:"poi.park",elementType:"geometry",stylers:[{color:"#263c3f"}]},{featureType:"poi.park",elementType:"labels.text",stylers:[{visibility:"off"}]},{featureType:"poi.park",elementType:"labels.text.fill",stylers:[{color:"#6b9a76"}]},{featureType:"road",elementType:"geometry",stylers:[{color:"#38414e"}]},{featureType:"road",elementType:"geometry.stroke",stylers:[{color:"#212a37"}]},{featureType:"road",elementType:"labels.text.fill",stylers:[{color:"#9ca5b3"}]},{featureType:"road.highway",elementType:"geometry",stylers:[{color:"#746855"}]},{featureType:"road.highway",elementType:"geometry.stroke",stylers:[{color:"#1f2835"}]},{featureType:"road.highway",elementType:"labels.text.fill",stylers:[{color:"#f3d19c"}]},{featureType:"road.local",elementType:"labels",stylers:[{visibility:"off"}]},{featureType:"transit",elementType:"geometry",stylers:[{color:"#2f3948"}]},{featureType:"transit.station",elementType:"labels.text.fill",stylers:[{color:"#d59563"}]},{featureType:"water",elementType:"geometry",stylers:[{color:"#17263c"}]},{featureType:"water",elementType:"labels.text.fill",stylers:[{color:"#515c6d"}]},{featureType:"water",elementType:"labels.text.stroke",stylers:[{color:"#17263c"}]}],{name:"Night"}),l=new google.maps.Map(document.getElementById("map"),{center:{lat:51.508408,lng:-.127676},zoom:10,mapTypeControl:!0,mapTypeControlOptions:{style:google.maps.MapTypeControlStyle.DROPDOWN_MENU,position:google.maps.ControlPosition.TOP_CENTER,mapTypeIds:["roadmap","satellite","hybrid","terrain","retromap","nightmap"]},zoomControl:!0,zoomControlOptions:{position:google.maps.ControlPosition.LEFT_CENTER},scaleControl:!0,streetViewControl:!0,streetViewControlOptions:{position:google.maps.ControlPosition.TOP_CENTER},fullscreenControl:!0});l.mapTypes.set("nightmap",t),l.setMapTypeId("nightmap"),l.mapTypes.set("retromap",e),l.setMapTypeId("retromap");for(var o=new google.maps.InfoWindow,r=new google.maps.LatLngBounds,s=0;s<myVM.searchResults().length;s++){var a=myVM.searchResults()[s].location,i=myVM.searchResults()[s].title,n=myVM.searchResults()[s].id,y=myVM.markerIcon(),p=new google.maps.Marker({map:l,position:a,title:i,animation:google.maps.Animation.DROP,icon:y,id:n});myVM.searchResults()[s].marker=p,p.addListener("click",function(){populateInfoWindow(this,o)}),p.addListener("click",function(){toggleBounce(this)}),r.extend(myVM.searchResults()[s].marker.position)}google.maps.event.addDomListener(window,"resize",function(){l.fitBounds(r)})}var firstPlaces=[{title:"Gordons wine bar",location:{lat:51.508144,lng:-.123314},id:"4acdb591f964a520c7cc20e3"},{title:"Taro Asian Restaurant",location:{lat:51.511638,lng:-.135577},id:"4b7152d5f964a52022412de3"},{title:"Franco Manca Pizzeria",location:{lat:51.515339,lng:-.136489},id:"55aab651498e32cd64c46495"},{title:"Covent Garden",location:{lat:51.511852,lng:-.122594},id:"4ba6419bf964a520b23f39e3"},{title:"Dishoom Indian Restaurant",location:{lat:51.512664,lng:-.126932},id:"4c31c371a0ced13a150d146e"},{title:"Tortilla Mexican Food",location:{lat:51.508768,lng:-.126626},id:"531750e9498e3eae0c96b150"}],Location=function(e){this.title=e.title,this.location={},this.location.lat=e.location.lat,this.location.lng=e.location.lng,this.id=e.id,this.appear=ko.observable(!0)},ViewModel=function(){var e=this;e.iconList=ko.observableArray([]),e.markerIcon=ko.observable(),e.searchResults=ko.observableArray([]),e.Query=ko.observable(""),firstPlaces.forEach(function(t){e.searchResults.push(new Location(t))}),e.searchInput=ko.computed(function(){for(var t=e.Query().toLowerCase(),l=0;l<e.searchResults().length;l++)e.searchResults()[l].title.toLowerCase().indexOf(t)>=0?(e.searchResults()[l].appear(!0),e.searchResults()[l].marker&&e.searchResults()[l].marker.setVisible(!0)):(e.searchResults()[l].appear(!1),e.searchResults()[l].marker&&e.searchResults()[l].marker.setVisible(!1))}),e.toggleOptions=ko.observable(!0),e.showOptions=function(){!0===e.toggleOptions()?e.toggleOptions(!1):!1===e.toggleOptions()&&e.toggleOptions(!0)},console.log(e.toggleOptions()),e.showMyMarker=function(e){console.log(e.marker),google.maps.event.trigger(e.marker,"click")},e.changeIcon=function(t){e.markerIcon=t.url;for(var l=0;l<e.searchResults().length;l++)e.searchResults()[l].marker.setIcon(e.markerIcon),console.log(e.searchResults()[l].marker.icon)},console.log(this.searchResults())},myVM=new ViewModel;ko.applyBindings(myVM);