'use strict';

// function initMap() {
//     var uluru = {lat: -25.344, lng: 131.036};
//     var map = new google.maps.Map(
//         document.getElementById('map'), {zoom: 4, center: uluru}
//     );
//     // var marker = new google.maps.Marker({position: uluru, map: map});
// }

// var map;
// function initMap(){
//   map = new google.maps.Map(document.getElementById('map'), {
//     center: {lat: 40.0519752, lng: -76.314270999999},
//     zoom: 15 // typical is usually 8 or 9
//   });
// }// end initMap function

// initMap();

// function initMap() {} // now it IS a function and it is in global

// $(() => {
//   initMap = function() {
//     // your code like...
//     var uluru = {lat: -25.344, lng: 131.036};
//     var map = new google.maps.Map(document.getElementById('map'), {zoom: 4, center: uluru});
//     // and other stuff...
//   }
// })

// initMap();

var mymap = L.map('mapid').setView([47.606209, -122.332069], 13);
console.log('hello');

L.tileLayer('https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token=pk.eyJ1IjoibWFwYm94IiwiYSI6ImNpejY4NXVycTA2emYycXBndHRqcmZ3N3gifQ.rJcFIG214AriISLbB6B5aw', {
    maxZoom: 18,
    attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, ' +
        '<a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, ' +
        'Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
    id: 'mapbox/streets-v11',
    tileSize: 512,
    zoomOffset: -1,
    accessToken: 'pk.eyJ1IjoiYW5uYXF6aG91IiwiYSI6ImNrNnJoNXRxNzAwbWszbXNieGFkYzcwdTkifQ.LtCGfbNE6CMEeMYQWW0H7A'
}).addTo(mymap);

// Search Bar to Map
var GooglePlacesSearchBox = L.Control.extend({
    onAdd: function() {
        var element = document.createElement("input");
        element.id = "searchBox";
        return element;
    }
});

(new GooglePlacesSearchBox).addTo(mymap);

var input = document.getElementById("searchBox");
var searchBox = new google.maps.places.SearchBox(input);

searchBox.addListener('places_changed', function() {
    var places = searchBox.getPlaces();
    if (places.length == 0) {
        return;
    }

    var group = L.featureGroup();
    places.forEach(function(place) {
        var marker = L.marker([
            place.geometry.location.lat(),
            place.geometry.location.lng()
        ]);
        group.addLayer(marker);
    });

    group.addTo(mymap);
    mymap.fitBounds(group.getBounds());
});

// form js
let state = {
    curLocation: 'Mary Gates Hall',
    distance: 5,
    distanceUnits: 'miles',
    purpose: 'explore',
    type: ['nature'],
}

let autocomplete = document.getElementById('locationInput');
let distanceInput = document.getElementById('distanceInput');
let distanceUnitsInput = document.getElementById('distance-units');
let radio = document.querySelectorAll('input.radio');
let checkboxes = document.querySelectorAll('input.check');
let submit = document.getElementById("submit");


function newRoute() {
    state.curLocation = autocomplete.value;
    state.distance = distanceInput.value;
    state.distanceUnits = distanceUnitsInput.value;
    state.purpose = selectRadio(radio);
    state.type = selectCheckboxes(checkboxes);
    console.log(state);
}

submit.addEventListener('click', newRoute);

// later --> disable submit if no cur location input
// autocomplete.addEventListener('input', () => {
//     if ()
// })

function selectRadio(domName) {
    for (let i = 0; i < domName.length; i++) {
        if (domName[i].checked) {
            return domName[i].value;
        }
    }
}

function selectCheckboxes(domName) {
    let temp = [];
    for (let i = 0; i < domName.length; i++) {
        if (domName[i].checked) {
            temp.push(domName[i].value);
        }
    }
    return temp;
}


