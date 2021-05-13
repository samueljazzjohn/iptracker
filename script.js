var map = L.map("mapid", {
  center: [9.893099, 76.278076],
  zoom: 10,
});

var licon = L.icon({
  iconUrl: "/images/icon-location.svg",
  iconSize: [25, 40],
  iconAnchor: [22, 9],
});

var marker = L.marker([9.893099, 76.278076], {
  riseOnHover: true,
  draggable: true,
  icon: licon,
}).addTo(map);

var latlng = L.latLng(9.893099, 76.278076);
marker
  .bindPopup(
    "Latitude: " +
    latlng.lat.toFixed(8) +
    "<br />Longitude " +
    latlng.lng.toFixed(8)
  )
  .openPopup();

var popup = L.popup();

console.log(marker.getLatLng());

L.tileLayer(
  "https://api.maptiler.com/maps/streets/256/{z}/{x}/{y}@2x.png?key=goO2HYXkkgk0B3Bhvx4p",
  {
    attribution:
      '<a href="https://www.maptiler.com/copyright/" target="_blank">&copy; MapTiler</a> <a href="https://www.openstreetmap.org/copyright" target="_blank">&copy; OpenStreetMap contributors</a>',
    maxZoom: 18,
    minZoom: 0,
    id: "mapbox/streets-v11",
    tileSize: 512,
    zoomOffset: -1,
    accessToken: "your.mapbox.access.token",
  }
).addTo(map);

marker.on("dragend", function (ev) {
  // alert(ev.latlng);
  latlng = marker.getLatLng();
  console.log(latlng);
  map.setView([latlng.lat, latlng.lng]);
  marker.setPopupContent(
    "Latitude: " +
    latlng.lat.toFixed(8) +
    "<br />Longitude " +
    latlng.lng.toFixed(8)
  );
});

if (navigator.geolocation) {
  navigator.geolocation.getCurrentPosition(function (position) {
    let latLng = {
      lat: position.coords.latitude,
      lng: position.coords.longitude
    };
    marker.setLatLng(latLng)
    popup.setLatLng(latLng);
    popup.setContent('This is your current location');
    popup.openOn(map);
    map.setView(latLng);
  }, function () {
    geolocationErrorOccurred(true, popup, map.getCenter());
  });
} else {
  //No browser support geolocation service
  geolocationErrorOccurred(false, popup, map.getCenter());
}

//function for getting location,timezone and isp of given ip address
let getLocation = (a) => {
  let link = "http://ip-api.com/json/"
  link += a
  var request = new XMLHttpRequest();

  request.open("GET", link);

  request.setRequestHeader("Accept", "application/json");

  request.onreadystatechange = function () {
    if (this.readyState === 4) {
      var json = JSON.parse(this.responseText);
      let latLng = {
        lat: json.lat,
        lng: json.lon
      };
      console.log(json);
      marker.setLatLng(latLng)
      popup.setLatLng(latLng);
      popup.setContent("This is ip's location is " + json.city + " <br>And your isp is: " + json.isp);
      popup.openOn(map);
      map.setView(latLng);
      document.getElementById("ipa").innerHTML = a
      document.getElementById("loc").innerHTML = json.city
      document.getElementById("time").innerHTML = json.timezone
      document.getElementById("isp").innerHTML = json.isp
    }
  };

  request.send();
};