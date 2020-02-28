'use strict';


var mymap = L.map('mapid').setView([47.606209, -122.332069], 13);

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

// // Search Bar to Map
// var GooglePlacesSearchBox = L.Control.extend({
//     onAdd: function() {
//         var element = document.createElement("input");
//         element.id = "searchBox";
//         return element;
//     }
// });

// (new GooglePlacesSearchBox).addTo(mymap);

var input = document.getElementById("searchBox");
var searchBox = new google.maps.places.SearchBox(input);
var startLocation = {};

searchBox.addListener('places_changed', function () {
    var places = searchBox.getPlaces();
    startLocation.name = places[0].name;
    startLocation.lat = places[0].geometry.location.lat();
    startLocation.long = places[0].geometry.location.lat();


    // startLocation = places;
    if (places.length == 0) {
        return;
    }

    var group = L.featureGroup();
    places.forEach(function (place) {
        var marker = L.marker([
            place.geometry.location.lat(),
            place.geometry.location.lng()
        ]);
        group.addLayer(marker);
    });

    group.addTo(mymap);
    mymap.fitBounds(group.getBounds());
});

let amenityTypes = ["bar", "park"];

function createSurvey(domName, placeTypes) {
    for (let i = 0; i < placeTypes.length; i++) {
        let parent = document.getElementById(domName);

        let wrapper = document.createElement("div");
        wrapper.classList.add("input-group-text");

        let input = document.createElement("input");
        input.classList.add("check");
        input.setAttribute("type", "checkbox");
        input.setAttribute("aria-label", "Checkbox for following text input");
        input.setAttribute("value", placeTypes[i]);
        input.setAttribute("name", placeTypes[i]);

        let label = document.createElement("label");
        label.setAttribute("for", placeTypes[i]);
        label.innerHTML = placeTypes[i].charAt(0).toUpperCase() + placeTypes[i].slice(1);

        wrapper.appendChild(input);
        wrapper.appendChild(label);
        parent.appendChild (wrapper);
    }
}

document.addEventListener("DOMContentLoaded", function (event) { 
    createSurvey("form", amenityTypes);
});

let checkboxes = document.querySelectorAll('input.radio');
function getData(domName) {
    let temp = [];
    for (let i = 0; i < domName.length; i++) {
        if (domName[i].checked & domName[i].value != 'none') {
            temp.push(domName[i].value);
        }
    }
    console.log(temp);
    return temp;
}