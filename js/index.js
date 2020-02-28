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

// Leaflet map
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

// make Favorite button
function makeHeart() {
    let fav = document.createElement('button');
    // let fav = document.createElement('')
    fav.classList.add('btn', 'btn-primary');
    fav.setAttribute('type', 'button');
    fav.innerHTML = 'hello';
    console.log(fav);
    return fav;
}

// var marker = L.marker([45.52036,-122.67279]).addTo(mymap);
fetch('http://overpass-api.de/api/interpreter?data=[out:json];node[amenity=ice_cream]%20(47.481002,,-122.459696,%2047.734136,%20-122.224433);out;').then(
    function(response) {
        let dp = response.json();
        return dp;
    }
).then(function(data) {
    // console.log(data);
    let y = data;
    console.log(y.elements);
    for (let i = 0; i < 100; i++) {
        let lat = y.elements[i].lat;
        let long = y.elements[i].lon;
        console.log(lat);
        console.log(long);
        var marker = L.marker([lat, long]).addTo(mymap);
        // thank you tim lohnes for the help!
        marker.bindPopup(y.elements[i].tags.name + '<br><button id = "navTo" type="button" class="btn btn-primary">hello</button> <button id = "saveFav" type="button" class="btn btn-primary">bye</button>');
    }
})

// var popup = L.popup()
//     .setLatLng([51.5, -0.09])
//     // .setContent("I am a standalone popup.")
//     // .setContent(this.makeHeart())
//     .openOn(mymap);

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

// submit.addEventListener('click', newRoute);

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

let placeState = {
    favorites: [],
    carousel: []
};


// tracking which cards are on the favorites pages rn
let favPlaces = document.getElementById('favorite').getElementsByClassName('card-body');
// console.log(favPlaces[2]);

for (let i = 0; i < favPlaces.length; i++) {
    placeState.favorites.push({name: favPlaces[i].querySelector('h3').textContent, onPage: true});
}

let caro = document.getElementsByClassName('carousel-item');
for (let i = 0; i < caro.length; i++) {
    placeState.carousel.push({name: caro[i].querySelector('h3').textContent, onFavs: false});
}

// console.log(placeState.favorites);

// returns a dictionary with the place information
function getPlaceInfo(place) {
    let info = {
        name: place.querySelector('h3').textContent,
        des: place.querySelector('p').textContent,
        img: place.querySelector('img')
    };
    return info;
}

function makeFavCard(place) {
    let info = getPlaceInfo(place);
    let c = document.createElement('div');
    c.classList.add('col-xs-auto', 'col-s-4', 'col-md-5', 'col-lg-5', 'col-xl-3');
    // create card body
    let cb = document.createElement('div');
    cb.classList.add('card-body');
    // creating card elements
    // card image
    let ig = document.createElement('img');
    ig.classList.add('card-img-top');
    ig.setAttribute('src', info.img.src);
    ig.setAttribute('alt', info.img.alt);
    // card name
    let n = document.createElement('h3');
    n.classList.add('card-title');
    n.textContent = info.name;
    // rating
    let rate = document.createElement('img');
    rate.classList.add('cardRating');
    rate.setAttribute('src', '../img/rating.png');
    rate.setAttribute('alt', 'rating');
    // note
    let notes = document.createElement('p');
    notes.classList.add('card-text');
    notes.innerHTML = '<strong>Note: </strong>' + info.des;
    // nav button
    let but = document.createElement('a');
    but.classList.add('btn', 'btn-dark', 'text-white');
    but.textContent = 'Navigate';
    but.setAttribute('href', '#');
    // heart
    let hrt = document.createElement('h2');
    hrt.classList.add('favb');
    let icon = document.createElement('i');
    icon.classList.add('fa', 'fas', 'fa-heart');
    icon.setAttribute('aria-label', 'heart');
    hrt.appendChild(icon);
    // buttons
    let buttons = document.createElement('div');
    buttons.appendChild(but);
    buttons.appendChild(hrt);
    // adding the elements to the body
    cb.appendChild(ig);
    cb.appendChild(n);
    cb.appendChild(rate);
    cb.appendChild(notes);
    cb.appendChild(buttons);
    c.appendChild(cb);
    return c;
}

// row container of favorite places
let favCon = document.getElementById('favorite');
// console.log(favCon);

// the heart icon in the carousel
let carHeart = document.getElementsByClassName('unfav');

let popPlaces = document.getElementsByClassName('wrap-item');
// adding new places to favorites
for (let i = 0; i < popPlaces.length; i++) {
    popPlaces[i].querySelector('i').addEventListener('click', function() {
        // document.querySelectorAll('.unfav .addFav').addEventListener('click', function() {
        // $('.unfav').click(function() {
        let newPlace = makeFavCard(popPlaces[i]);
        let placeName = newPlace.querySelector('h3').textContent;
        let ind = get(placeState.favorites, placeName);
        if (ind == -1) {
            favCon.appendChild(newPlace);
            placeState.favorites.push({name: placeName, onPage: true});
            placeState.carousel[get(placeState.carousel, placeName)].onFavs = true;
            popPlaces[i].querySelector('i').classList.remove('far');
            popPlaces[i].querySelector('i').classList.add('fa', 'fas');
        }
    })
}

let ind = get(placeState.favorites, "Washington Park Arboretum");
console.log(ind)

// returns index of the given card in state array
function get(arr, name) {
    for (let i = 0; i < arr.length; i++) {
        if (arr[i].name == name) {
            return i;
        }
    }
    return -1;
}

// getting favorite cards
let myFavs = document.getElementById('favorite').getElementsByClassName('card-body');
// removing elements by clicking on favorited
for (let i = 0; i < myFavs.length; i++) {
    myFavs[i].querySelector('i').addEventListener('click', function() {
        // myFavs.querySelectorAll('i').addEventListener('click', function() {
        // $('#favorite .card-body').click(function () {
        let place = myFavs[i].querySelector('h3').textContent;
        let ind = get(placeState.favorites, place);
        placeState.favorites[ind].onPage = false;
        let carInd = get(placeState.carousel, place);
        if (carInd != -1) {
            placeState.carousel[carInd].onFavs = false;
            caro[carInd].querySelector('i').classList.remove('fa', 'fas');
            caro[carInd].querySelector('i').classList.add('far');
        }
        myFavs[i].parentNode.removeChild(myFavs[i]);
    })
}