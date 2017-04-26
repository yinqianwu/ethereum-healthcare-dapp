Meteor.subscribe('CmxApiSearch');
Meteor.subscribe('Visitors');

var MAP_ZOOM = 15;

Meteor.startup(function() {  
  // GoogleMaps.load();
   GoogleMaps.load( {
    v: '3', key: 'AIzaSyBALtbko_V5AOa77RGBm-t3PPAyhYnjvak'
  } )
});

// Template.userList.helpers({
//   usersOnline() { return Meteor.users.find({}) }
// })

Template.map.helpers({  
  geolocationError: function() {
    var error = Geolocation.error();
    return error && error.message;
  },
  mapOptions: function() {

// only looking for one sample
  var visitor = Visitors.findOne({_id: "KXyPuyX63emuNcAuB"});

  var latLng = Geolocation.latLng();
    // Initialize the map once we have the latLng.
    if (GoogleMaps.loaded() && latLng) {
      return {
        center: new google.maps.LatLng(visitor.lat, visitor.lng),
        zoom: MAP_ZOOM
      };
    }
  }
});

Template.map.onCreated(function() {  
  var self = this;
  var visitor = Visitors.findOne({_id: "KXyPuyX63emuNcAuB"});

  GoogleMaps.ready('map', function(map) {
    var marker;

    // Create and move the marker when latLng changes.
    self.autorun(function() {
      var latLng = Geolocation.latLng();
      if (! latLng)
        return;

      // If the marker doesn't yet exist, create it.
      if (! marker) {
        marker = new google.maps.Marker({
          position: new google.maps.LatLng(visitor.lat, visitor.lng),
          map: map.instance
        });
      }
      // The marker already exists, so we'll just change its position.
      else {
        marker.setPosition(latLng);
      }

      // Center and zoom the map view onto the current position.
      map.instance.setCenter(marker.getPosition());
      map.instance.setZoom(MAP_ZOOM);
    });
  });
});


Template.cmxApiSearch.helpers({
  cmxApiSearch() {
    return CmxApiSearch.find();
  },
});

Template.visitor.helpers({
  visitor() {
    return Visitors.find();
  },
});


Template.visitor.events({
  'click li'(event, instance) {
      Meteor.call('newVisitor', instance.data);
    // invoke a meteor method with the patient record that was clicked
  },
});

