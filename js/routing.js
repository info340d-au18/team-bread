'use strict';

const R = 6371; // worlds radius in kilometers
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

let state = {};

var input = document.getElementById("searchBox");
var searchBox = new google.maps.places.SearchBox(input);


searchBox.addListener('places_changed', function () {
    if (state.routing != null) {
        mymap.removeControl(state.routing);
        state.routing = null;
    }
    
    var places = searchBox.getPlaces();
    var startLocation = {};
    startLocation.name = places[0].name;
    startLocation.lat = places[0].geometry.location.lat();
    startLocation.long = places[0].geometry.location.lng();
    //console.log(places);

    // startLocation = places;
    if (places.length == 0) {
        return;
    }
    var redIcon = new L.Icon({
        iconUrl: 'https://cdn.rawgit.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-red.png',
        shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.7/images/marker-shadow.png',
        iconSize: [35, 51],
        iconAnchor: [12, 41],
        popupAnchor: [1, -34],
        shadowSize: [41, 41]
      });

    var group = L.featureGroup();
    places.forEach(function (place) {
        var marker = L.marker([
            place.geometry.location.lat(),
            place.geometry.location.lng()
        ], {icon: redIcon});
        marker.bindPopup(startLocation.name);
        group.addLayer(marker);
    });

    group.addTo(mymap);
    mymap.fitBounds(group.getBounds());
    //console.log(startLocation);
    state.start = startLocation;
    state.start.group = group;
    // state.start.icon = greenIcon;
    //console.log(state);
});

let amenityTypes = ["bar", "cafe", "ice_cream", "restaurant"];
let leisureTypes = ["dog_park", "firepit", "fishing"]

function createSurvey(domName, placeTypes, overpassType) {
    let temp = {};
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
        //input.setAttribute("name", overpassType);
        input.addEventListener("click", () => {
            //input.checked = !input.checked;
            //console.log(placeTypes[i]);
            if (input.checked) {
                temp[placeTypes[i]] = true;
            } else {
                // temp[placeTypes[i]] = false;
                delete temp[placeTypes[i]];
            }
            //console.log(temp);
        });

        let label = document.createElement("label");
        label.setAttribute("for", placeTypes[i]);
        label.innerHTML = placeTypes[i].charAt(0).toUpperCase() + placeTypes[i].slice(1);

        wrapper.appendChild(input);
        wrapper.appendChild(label);
        
        //console.log(amenitySelected);
        parent.appendChild (wrapper);
    }
    state[overpassType] = temp;
}

document.addEventListener("DOMContentLoaded", function (event) { 
    createSurvey("amenityTypes", amenityTypes, "amenity");
    createSurvey("leisureTypes", leisureTypes, "leisure");
});


let submit = document.getElementById("submit");
submit.addEventListener("click", () => {
    // let maap = document.getElementById("mapid");
    // maap.style.display = submit.style.visibility === 'none' ? 'none' : '';
    // submit.style.display = "block";
    input.value = '';
    let dist = document.getElementById("distanceInput");
    state.distance = Number(dist.value);
    // console.log(state);
    // console.log(Object.keys(state.amenity))
    let oLink = typeStrings(Object.keys(state.amenity), Object.keys(state.leisure), state.start.lat, state.start.long, state.distance);

    // let bounds = calculateBB(state.start.lat, state.start.long, state.distance);
    fetch(oLink).then(
        function(response) {
            let dp = response.json();
            return dp;
        }
    ).then(function(data) {
        console.log(data);
        let y = data.elements;
        
        if (y.length > 100) {
            y = findRandom100(y);
        }
        //console.log(y.elements);
        // console.log(y);
        
        var markerGroup;
        if (y.length > 30) {
            markerGroup = L.markerClusterGroup();
        } else {
            markerGroup = L.featureGroup();
        }
        for (let i = 0; i < y.length; i++) {
            console.log(y[i]);
            // if (!(y[i].lat == null || y[i].lon == null)) {
            if (y[i] == undefined){
                i++;
            }
            else {
                // if (!(y == null || y == undefined) || !(y[i].lat == null || y[i].lon == null) || !(y[i].lat == undefined || y[i].lon == undefined) || !(y[i].tags.name == undefined || y[i].tags.name ==null)) 
                let lat = y[i].lat;
                let long = y[i].lon;

                var marker = L.marker([lat, long]);
                // thank you tim lohnes for the help!
                let placeName = y[i].tags.name;
                marker.bindPopup(placeName + '<br/><button id = "navTo" type="button" class="btn btn-primary">Navigate</button>').openPopup();

                let mapBounds = mymap.getBounds();
                if (mapBounds.contains(marker.getLatLng())) {
                    markerGroup.addLayer(marker);
                    mymap.addLayer(markerGroup);
                    marker.on("click", function() {
                        let nav = document.getElementById("navTo");
                        nav.addEventListener("click", function() {
                            state.end = {name: placeName, lat: lat, long: long};
                            mymap.removeLayer(markerGroup);
                            mymap.removeLayer(state.start.group);
    
                            var blueIcon = new L.Icon({
                                iconUrl: 'https://cdn.rawgit.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-blue.png',
                                shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.7/images/marker-shadow.png',
                                iconSize: [25, 41],
                                iconAnchor: [12, 41],
                                popupAnchor: [1, -34],
                                shadowSize: [41, 41]
                              });
                            var end = L.marker([
                                state.end.lat,
                                state.end.long
                            ], {icon: blueIcon});
                            end.bindPopup(state.end.name);
    
                            state.routing = L.Routing.control({
                                waypoints: [
                                    L.latLng(state.start.lat, state.start.long),
                                    L.latLng(state.end.lat, state.end.long)
                                ],
                                routeWhileDragging: false,
                                createMarker: function(i, waypoint, n) {
                                    console.log(i);
                                    console.log(state.start.group);
                                    if (i == 0) {
                                        return state.start.group;
                                    } else {
                                        return end;
                                    }
                                }
                            }).addTo(mymap);
                        });
                    });  
                }
            }
        }
        //mymap.fitBounds(markerGroup.getBounds());
    });
});

function findRandom100(data) {
    let places = [];
    let length = data.length;
    let numsUsed = [];
    for (let i = 0; i < 100; i++) {
        let index = Math.round(Math.random() * length);
        while (numsUsed.includes(index)) {
            index = Math.round(Math.random() * length);
        }
        numsUsed.push(index);
        places.push(data[index]);
    }
    return places;
}

// var overpassLink = 'http://overpass-api.de/api/interpreter?data=[out:json];node[amenity=ice_cream](47.481002,-122.459696,47.734136,-122.224433);node[amenity=bar](47.481002,-122.459696,47.734136,-122.224433);out;'
// let amenityTypes = ["bar", "park", "ice_cream", "restaurant"];

function typeStrings(amenitiesList, leisureList, lat, long, radius) {
    let link = 'http://overpass-api.de/api/interpreter?data=[out:json];';
    //l et bounds = '(47.481002,-122.459696,47.734136,-122.224433);' // should be a separate function call in the futuer

    let bounds = calculateBB(lat, long, radius / 2) + ';';
    console.log(bounds);
    let end = 'out;'
    
    if (amenitiesList.length > 0) {
        for (let i = 0; i < amenitiesList.length; i++) {
            link += 'node[amenity=' + amenitiesList[i] + ']' + bounds;
        }
        link += end;
    }
    if (leisureList.length > 0) {
        for (let i = 0; i < leisureList.length; i++) {
            link += 'node[leisure=' + leisureList[i] + ']' + bounds;
        }
        link += end;
    }
    
    //link += ';';
    console.log(link);
    return link;
}

function calculateBB(lat, long, radius) {
    let upperLat = (lat - getLatDiff(radius)).toFixed(6);
    let upperLong = (long - getLongDiff(radius, lat)).toFixed(6);

    let lowerLat = (lat + getLatDiff(radius)).toFixed(6);
    let lowerLong = (long + getLongDiff(radius, lat)).toFixed(6);

    // https://gis.stackexchange.com/questions/172554/calculating-bounding-box-of-given-set-of-coordinates-from-leaflet-draw
    // create a bounding rectangle that can be used in leaflet
    let mapBbox = [[upperLat,upperLong],[lowerLat,lowerLong]];

    // add the bounding box to the map, and set the map extent to it
    // L.rectangle(mapBbox).addTo(mymap);
    mymap.fitBounds(mapBbox);

    return '(' + upperLat + ',' + upperLong + ',' + lowerLat + ',' + lowerLong + ')';

    // console.log(lt1 + ' ' + lg1);
    // console.log(lt2 + ' ' + lg2)
    // console.log ('(' + lt1 + ',' + lg1 + ',' + lt2 + ',' + lg2 + ')')
    // return '(' + lt1 + ',' + lg1 + ',' + lt2 + ',' + lg2 + ')'
    // return '(' + lt[0] + ',' + lg[0] + ',' + lt[1] + ',' + lg[1] + ')'
}

// function dX(radius, lat) {
function getLongDiff(radius, lat) {
    // return (radius) * Math.cos(((Math.PI/ 180) * lat));
    return radius / (111 * Math.cos((Math.PI / 180) * lat));
}

// function dY(radius) {
function getLatDiff(radius) {
    return radius / 111;
}

// var marker = L.marker([45.52036,-122.67279]).addTo(mymap);
// fetch('http://overpass-api.de/api/interpreter?data=[out:json];node[amenity=ice_cream]%20(47.481002,,-122.459696,%2047.734136,%20-122.224433);out;').then(








// // Leaflet map
// var mymap = L.map('mapid').setView([47.606209, -122.332069], 13);
// console.log('hello');

// L.tileLayer('https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token=pk.eyJ1IjoibWFwYm94IiwiYSI6ImNpejY4NXVycTA2emYycXBndHRqcmZ3N3gifQ.rJcFIG214AriISLbB6B5aw', {
//     maxZoom: 18,
//     attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, ' +
//         '<a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, ' +
//         'Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
//     id: 'mapbox/streets-v11',
//     tileSize: 512,
//     zoomOffset: -1,
//     accessToken: 'pk.eyJ1IjoiYW5uYXF6aG91IiwiYSI6ImNrNnJoNXRxNzAwbWszbXNieGFkYzcwdTkifQ.LtCGfbNE6CMEeMYQWW0H7A'
// }).addTo(mymap);

// // make Favorite button
// function makeHeart() {
//     let fav = document.createElement('button');
//     // let fav = document.createElement('')
//     fav.classList.add('btn', 'btn-primary');
//     fav.setAttribute('type', 'button');
//     fav.innerHTML = 'hello';
//     console.log(fav);
//     return fav;
// }

// (new GooglePlacesSearchBox).addTo(mymap);

// var input = document.getElementById("searchBox");
// var searchBox = new google.maps.places.SearchBox(input);

// searchBox.addListener('places_changed', function() {
//     var places = searchBox.getPlaces();
//     if (places.length == 0) {
//         return;
//     }

//     var group = L.featureGroup();
//     places.forEach(function(place) {
//         var marker = L.marker([
//             place.geometry.location.lat(),
//             place.geometry.location.lng()
//         ]);
//         group.addLayer(marker);
//     });

//     group.addTo(mymap);
//     mymap.fitBounds(group.getBounds());
// });


// // tracking which cards are on the favorites pages rn
// let favPlaces = document.getElementById('favorite').getElementsByClassName('card-body');
// // console.log(favPlaces[2]);

// for (let i = 0; i < favPlaces.length; i++) {
//     placeState.favorites.push({name: favPlaces[i].querySelector('h3').textContent, onPage: true});
// }

// let caro = document.getElementsByClassName('carousel-item');
// for (let i = 0; i < caro.length; i++) {
//     placeState.carousel.push({name: caro[i].querySelector('h3').textContent, onFavs: false});
// }

// // console.log(placeState.favorites);

// // returns a dictionary with the place information
// function getPlaceInfo(place) {
//     let info = {
//         name: place.querySelector('h3').textContent,
//         des: place.querySelector('p').textContent,
//         img: place.querySelector('img')
//     };
//     return info;
// }

// function makeFavCard(place) {
//     let info = getPlaceInfo(place);
//     let c = document.createElement('div');
//     c.classList.add('col-xs-auto', 'col-s-4', 'col-md-5', 'col-lg-5', 'col-xl-3');
//     // create card body
//     let cb = document.createElement('div');
//     cb.classList.add('card-body');
//     // creating card elements
//     // card image
//     let ig = document.createElement('img');
//     ig.classList.add('card-img-top');
//     ig.setAttribute('src', info.img.src);
//     ig.setAttribute('alt', info.img.alt);
//     // card name
//     let n = document.createElement('h3');
//     n.classList.add('card-title');
//     n.textContent = info.name;
//     // rating
//     let rate = document.createElement('img');
//     rate.classList.add('cardRating');
//     rate.setAttribute('src', '../img/rating.png');
//     rate.setAttribute('alt', 'rating');
//     // note
//     let notes = document.createElement('p');
//     notes.classList.add('card-text');
//     notes.innerHTML = '<strong>Note: </strong>' + info.des;
//     // nav button
//     let but = document.createElement('a');
//     but.classList.add('btn', 'btn-dark', 'text-white');
//     but.textContent = 'Navigate';
//     but.setAttribute('href', '#');
//     // heart
//     let hrt = document.createElement('h2');
//     hrt.classList.add('favb');
//     let icon = document.createElement('i');
//     icon.classList.add('fa', 'fas', 'fa-heart');
//     icon.setAttribute('aria-label', 'heart');
//     hrt.appendChild(icon);
//     // buttons
//     let buttons = document.createElement('div');
//     buttons.appendChild(but);
//     buttons.appendChild(hrt);
//     // adding the elements to the body
//     cb.appendChild(ig);
//     cb.appendChild(n);
//     cb.appendChild(rate);
//     cb.appendChild(notes);
//     cb.appendChild(buttons);
//     c.appendChild(cb);
//     return c;
// }

// // row container of favorite places
// let favCon = document.getElementById('favorite');
// // console.log(favCon);

// // the heart icon in the carousel
// let carHeart = document.getElementsByClassName('unfav');

// let popPlaces = document.getElementsByClassName('wrap-item');
// // adding new places to favorites
// for (let i = 0; i < popPlaces.length; i++) {
//     popPlaces[i].querySelector('i').addEventListener('click', function() {
//         // document.querySelectorAll('.unfav .addFav').addEventListener('click', function() {
//         // $('.unfav').click(function() {
//         let newPlace = makeFavCard(popPlaces[i]);
//         let placeName = newPlace.querySelector('h3').textContent;
//         let ind = get(placeState.favorites, placeName);
//         if (ind == -1) {
//             favCon.appendChild(newPlace);
//             placeState.favorites.push({name: placeName, onPage: true});
//             placeState.carousel[get(placeState.carousel, placeName)].onFavs = true;
//             popPlaces[i].querySelector('i').classList.remove('far');
//             popPlaces[i].querySelector('i').classList.add('fa', 'fas');
//         }
//     })
// }

// let ind = get(placeState.favorites, "Washington Park Arboretum");
// console.log(ind)

// // returns index of the given card in state array
// function get(arr, name) {
//     for (let i = 0; i < arr.length; i++) {
//         if (arr[i].name == name) {
//             return i;
//         }
//     }
//     return -1;
// }

// // getting favorite cards
// let myFavs = document.getElementById('favorite').getElementsByClassName('card-body');
// // removing elements by clicking on favorited
// for (let i = 0; i < myFavs.length; i++) {
//     myFavs[i].querySelector('i').addEventListener('click', function() {
//         // myFavs.querySelectorAll('i').addEventListener('click', function() {
//         // $('#favorite .card-body').click(function () {
//         let place = myFavs[i].querySelector('h3').textContent;
//         let ind = get(placeState.favorites, place);
//         placeState.favorites[ind].onPage = false;
//         let carInd = get(placeState.carousel, place);
//         if (carInd != -1) {
//             placeState.carousel[carInd].onFavs = false;
//             caro[carInd].querySelector('i').classList.remove('fa', 'fas');
//             caro[carInd].querySelector('i').classList.add('far');
//         }
//         myFavs[i].parentNode.removeChild(myFavs[i]);
//     })
// }