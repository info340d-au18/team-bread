'use strict';

let placeState = {
    favorites: [],
    carousel: [],
    startPlace: {},
    clickedPlace: [],
    favCards: document.getElementById('favorite'),
    endMarker: {}
};

// var input = document.getElementById("searchBox");
// var searchBox = new google.maps.places.SearchBox(input);
// var map = L.map('pMap').setView([47.606209, -122.332069], 13);
// L.tileLayer('https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token=pk.eyJ1IjoibWFwYm94IiwiYSI6ImNpejY4NXVycTA2emYycXBndHRqcmZ3N3gifQ.rJcFIG214AriISLbB6B5aw', {
//     maxZoom: 18,
//     attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, ' +
//         '<a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, ' +
//         'Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
//     id: 'mapbox/streets-v11',
//     tileSize: 512,
//     zoomOffset: -1,
//     accessToken: 'pk.eyJ1IjoiYW5uYXF6aG91IiwiYSI6ImNrNnJoNXRxNzAwbWszbXNieGFkYzcwdTkifQ.LtCGfbNE6CMEeMYQWW0H7A'
// }).addTo(map);

// returns index of the given card in state array
function get(arr, name) {
    for (let i = 0; i < arr.length; i++) {
        if (arr[i].name == name) {
            return i;
        }
    }
    return -1;
}

// returns a dictionary with the place information
function getPlaceInfo(place) {
    let info = {
        name: place.name,
        des: place.description,
        img: place.source,
        alt: place.alt
    };
    return info;

}

function makeFavHeart() {
    let heart = document.createElement('h2');
    heart.classList.add('favb');
    let icon = document.createElement('i');
    icon.classList.add('fa', 'fas', 'fa-heart');
    icon.setAttribute('aria-label', 'heart');
    heart.appendChild(icon);
    return heart;
}


// makes favorite button in carousel item
function makeFavButton() {
    let fb = document.createElement('div');
    fb.classList.add('favbut');
    let favb = document.createElement('a');
    favb.classList.add('btn', 'btn-dark', 'text-white', 'addFav');
    favb.setAttribute('href', '#');
    let fn = document.createElement('h3');
    fn.classList.add('unfav');
    let heart = document.createElement('i');
    heart.classList.add('far', 'fa-heart');
    fn.innerHTML = "<i class = 'far fa-heart'></i> " + 'Favorite';
    favb.appendChild(fn);
    fb.appendChild(favb);
    return fb;
}

// doesnt work in the carousel but works in the cards
function makeNavigateButton() {
    let b = document.createElement('a');
    b.classList.add('btn', 'btn-dark', 'text-white', 'navb');
    b.textContent = 'Navigate';
    return b;
}

var map = null;
function makeRouting(endLat, endLong) {
    var blueIcon = new L.Icon({
        iconUrl: 'https://cdn.rawgit.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-blue.png',
        shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.7/images/marker-shadow.png',
        iconSize: [35, 51],
        iconAnchor: [12, 41],
        popupAnchor: [1, -34],
        shadowSize: [41, 41]
      });
    var endMarker = L.marker([
        endLat,
        endLong
    ], {icon: blueIcon});
    placeState.endMarker = endMarker;

    placeState.group = L.featureGroup();
    placeState.group.addLayer(endMarker);
    var input = document.getElementById("searchBox");
    var searchBox = new google.maps.places.SearchBox(input);


    if (map === null) {
        map = L.map('pMap').setView([endLat, endLong], 16);
        L.tileLayer('https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token=pk.eyJ1IjoibWFwYm94IiwiYSI6ImNpejY4NXVycTA2emYycXBndHRqcmZ3N3gifQ.rJcFIG214AriISLbB6B5aw', {
            maxZoom: 18,
            attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, ' +
                '<a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, ' +
                'Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
            id: 'mapbox/streets-v11',
            tileSize: 512,
            zoomOffset: -1,
            accessToken: 'pk.eyJ1IjoiYW5uYXF6aG91IiwiYSI6ImNrNnJoNXRxNzAwbWszbXNieGFkYzcwdTkifQ.LtCGfbNE6CMEeMYQWW0H7A'
        }).addTo(map);
        placeState.group.addTo(map);

    } else {
        input.value = '';
        map.removeLayer(placeState.group);
        map.removeControl(placeState.route);
        placeState.group.addTo(map);
        map.setView([endLat, endLong], 16);
    }
    searchBox.addListener('places_changed', function () {
        // console.log(searchBox.getPlaces());
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
    
        //placeState.group = group;

        // console.log(group);
        places.forEach(function (place) {
            var marker = L.marker([
                place.geometry.location.lat(),
                place.geometry.location.lng()
            ], {icon: redIcon});
            placeState.startMarker = marker;
            marker.bindPopup(startLocation.name);
            placeState.group.addLayer(marker);
        });
    
        placeState.startPlace.lat = startLocation.lat;
        placeState.startPlace.long = startLocation.long;
        
        // group.addTo(map);
        // map.fitBounds(group.getBounds());

        placeState.route = L.Routing.control({
            waypoints: [
                L.latLng(placeState.startPlace.lat, placeState.startPlace.long),
                L.latLng(endLat, endLong)
            ],
            routeWhileDragging: false,
            createMarker: function(i, waypoint, n) {
                if (i == 0) {
                    return placeState.endMarker;
                } else {
                    return placeState.startMarker;
                }
            }
        }).addTo(map);
        map.fitBounds(placeState.group.getBounds());
    });

    
}

function makeFavCard(place, heart, navButton) {
    let info = getPlaceInfo(place);
    let c = document.createElement('div');
    c.classList.add('card','col-xs-auto', 'col-s-4', 'col-md-5', 'col-lg-5', 'col-xl-3');
    // create card body
    let cb = document.createElement('div');
    cb.classList.add('card-body');
    // creating card elements
    // card image
    let ig = document.createElement('img');
    ig.classList.add('card-img-top');
    ig.setAttribute('src', info.img);
    ig.setAttribute('alt', info.alt);
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
    // let but = document.createElement('a');
    // but.classList.add('btn', 'btn-dark', 'text-white');
    // but.textContent = 'Navigate';
    // but.setAttribute('href', '#');
    // heart
    // let hrt = document.createElement('h2');
    // hrt.classList.add('favb');
    // let icon = document.createElement('i');
    // icon.classList.add('fa', 'fas', 'fa-heart');
    // icon.setAttribute('aria-label', 'heart');
    // hrt.appendChild(icon);
    // buttons
    let buttons = document.createElement('div');
    buttons.appendChild(navButton);
    // console.log(buttons);
    buttons.appendChild(heart);
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

function makeFavFromMap() {
    let c = document.createElement('div');
    c.classList.add('card', 'col-xs-auto', 'col-s-4', 'col-md-5', 'col-lg-5', 'col-xl-3');
    // card body
    let cb = document.createElement('div');
    cb.classList.add('card-body');
    // card name
    let n = document.createElement('h3');
    n.classList.add('card-title');
    n.textContent = placeState.clickedPlace.name;
    // rating
    let rate = document.createElement('img');
    rate.classList.add('cardRating');
    rate.setAttribute('src', '../img/rating.png');
    rate.setAttribute('alt', 'rating');
    // note
    let notes = document.createElement('p');
    notes.classList.add('card-text');
    notes.innerHTML = '<strong>Note: </strong>';
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
    // add card elements to body
    cb.appendChild(n);
    cb.appendChild(rate);
    cb.appendChild(notes);
    cb.appendChild(buttons);
    c.appendChild(cb);
    return c;
}

// making carousel places
function makeCarousel(place, index, favB) {
    // let pInfo = getPlaceInfo(place);
    let car = document.createElement('div');
    car.classList.add('wrap-item');
    // img
    let ig = document.createElement('img');
    ig.classList.add('img-fluid', 'd-block', 'w-100');
    ig.setAttribute('src', place.source);
    ig.setAttribute('data-src', 'holder.js/900x400?theme=social');
    ig.setAttribute('alt', place.alt);
    ig.setAttribute('data-holder-rendered', 'true');
    // place description
    let des = document.createElement('div');
    des.classList.add('place-des');
    let name = document.createElement('h3');
    name.textContent = place.name;
    // console.log(name);
    let desc = document.createElement('h4');
    desc.textContent = place.description;
    // console.log(desc);
    // navigate and favorite buttons
    let buttons = document.createElement('div');
    buttons.appendChild(favB);
    // buttons.appendChild(fb);

    des.appendChild(name);
    des.appendChild(desc);
    des.appendChild(buttons);

    car.appendChild(ig);
    car.appendChild(des);

    let ci = document.createElement('div');
    ci.classList.add('carousel-item');
    if (index === 0) {
        ci.classList.add('active');
    }
    ci.appendChild(car);
    return(ci);
}

// creating route from start and end
function createRoute(start, end) {
    // let routes;
    L.Routing.control({
        waypoints: [
            // start pos
            L.latLng(start), 
            // end pos
            L.latLng(end)
        ],
        routeWhileDragging: true
    }).on('routesfound', function(e) {
        routes = e.routes;
    }).addTo(routepagemap) // placeholder map id rn 
}

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

// add card favs from csv file to page
fetch('https://info340d-au18.github.io/team-bread/data/cardPlaces.json').then(
    function(response) {
        let dp = response.json();
        return dp;
    }
).then(function(data) {
    // console.log(data);
    for (let i = 0; i < data.length; i++) {
        // console.log(data[i]);
        let r = document.getElementById('favorite');
        let xing = makeFavHeart();
        let nb = makeNavigateButton();
        // console.log(xing);
        let fc = makeFavCard(data[i], xing, nb);
        r.appendChild(fc);
        placeState.favorites.push({name: data[i].name, onPage: true});
        // let ind = get(placeSta)
        xing.addEventListener('click', function() {
            console.log('yeet');
            placeState.favorites[i].onPage = false;
            let button = document.querySelector('i');
            button.classList.remove('fa', 'fas');
            button.classList.add('far');
            fc.parentNode.removeChild(fc);
        });
        let route = document.getElementById('modal');
        nb.addEventListener('click', function() {
            route.style.display = 'block';
            makeRouting(data[i].lat, data[i].long);
            let gray = document.getElementById('wrapwrap');
            gray.style.display = 'block';
            gray.style.backgroundColor = 'rgba(111, 111, 111, 0.8)';
            document.getElementsByClassName('close')[0].addEventListener('click', function() {
                route.style.display = 'none';
                gray.style.display = 'none';
            });
        });
    }
})

// carousel images
fetch('https://info340d-au18.github.io/team-bread/data/carouselPlaces.json').then(
    function(response) {
        let dp = response.json();
        return dp;
    }
).then(function(data) {
    for(let i = 0; i < data.length; i++) {
        let favoriteButton = makeFavButton();
        let NAV = makeNavigateButton();
        let cItem = makeCarousel(data[i], i, favoriteButton);
        document.getElementsByClassName('carousel-inner')[0].appendChild(cItem);
        placeState.carousel.push({name: data[i].name, onCar: true});
        let h = makeFavHeart();
        let fc = makeFavCard(data[i], h, NAV);
        let route = document.getElementById('modal');
        favoriteButton.addEventListener('click', function() {
            if (get(placeState.favorites, data[i].name) === -1) {
                document.getElementById('favorite').appendChild(fc);
                placeState.favorites.push({name: data[i].name, onPage: true});
                let button = document.querySelector('i');
                button.classList.add('fa', 'fas');
                button.classList.remove('far');

            }
        })
        // allows for functionality when wanting to remove favorite card
        h.addEventListener('click', function() {
            placeState.favorites[i].onPage = false;
            let button = document.querySelector('i');
            button.classList.remove('fa', 'fas');
            button.classList.add('far');
            fc.parentNode.removeChild(fc);
        });

        NAV.addEventListener('click', function() {
            route.style.display = 'block';
            makeRouting(data[i].lat, data[i].long);
            let g = document.getElementById('wrapwrap');
            g.style.display = 'block';
            g.style.backgroundColor = 'rgba(111, 111, 111, 0.8)';
            document.getElementsByClassName('close')[0].addEventListener('click', function() {
                route.style.display = 'none';
                g.style.display = 'none';
            });
        });
    }
})

