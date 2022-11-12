// Initialize map
const mapOptions = {
    // https://leafletjs.com/reference.html#map-option
}

let map = L.map('map').setView([0, 0], 10, mapOptions);

// Tile Layer is a grid of images 256 by 256px
let layer = L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
    "maxZoom": 18,
    "attribution": '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
}).addTo(map)

const pathOptions = {
    // https://leafletjs.com/reference.html#path
}

const testEvents = [
    {
        latlng: {
            lat: 43.6613873,
            lon: -94.4608589
        },
        latitude: 43.6613873,
        longitude: -94.4608589,
        accuracy: 15
    },
    {
        latlng: {
            lat: 43.6617699,
            lon: -94.4624869
        },
        latitude: 43.6617699,
        longitude: -94.4624869,
        accuracy: 15
    },
    {
        latlng: {
            lat: 43.6635148,
            lon: -94.4626107
        },
        latitude: 43.6635148,
        longitude: -94.4626107,
        accuracy: 15
    },
    {
        latlng: {
            lat: 43.6641523,
            lon: -94.4599669
        },
        latitude: 43.6641523,
        longitude: -94.4599669,
        accuracy: 15
    },
    {
        latlng: {
            lat: 43.6628773,
            lon: -94.4580785
        },
        latitude: 43.6628773,
        longitude: -94.4580785,
        accuracy: 15
    },
]

// geoJSON object with one LineString
const path = {
    "type": "Feature",
    "geometry": {
        "coordinates": [
            // [
            //     -94.4620212317282,
            //     43.661520238377875
            //   ],
            //   [
            //     -94.46350790397351,
            //     43.65970296741901
            //   ],
            //   [
            //     -94.46392061864728,
            //     43.65826046207823
            //   ],
            //   [
            //     -94.46220654035204,
            //     43.6575526562963
            //   ],
            //   [
            //     -94.45835043979338,
            //     43.6591292368029
            //   ],
            //   [
            //     -94.45963001089919,
            //     43.66128996978054
            //   ],
            //   [
            //     -94.46148546272119,
            //     43.6617034094557
            //   ]
        ],
        "type": "LineString"
    }
}

const accuracies = []
const timestamps = []
let distance = 0

const gOptions = {
    style: {
        "color": '#234099',
        "weight": 5,
        "opacity": 0.85
    }
}

// Sets map to current location, with tracking enabled
map.locate({
    watch: true,
    maxZoom: 20,
    enableHighAccuracy: true
})

pathIndex = 0

const drawPath = (e) => {
    console.log('found')
    if (pathIndex === 0) {
        console.log(e)
        map.setView(e.latlng, 19)
        // Add current location, timestamp, and accuracy to path
        path.geometry.coordinates.push([e.longitude, e.latitude])
        // accuracies.push(e.accuracy)
        // timestamps.push(e.timestamp)

        L.marker(e.latlng).addTo(map)
    
        L.circle(e.latlng, {
            radius: e.accuracy,
            color: '#234099',
            fillColor: '#f78d46',
            fillOpacity: .32
        }).addTo(map)
        // console.log(path)
        pathIndex++

    } else {

        // If this location is at least rougly 20 ft from last location, and
        if (e.latlng.distanceTo({ lon: path.geometry.coordinates[pathIndex - 1][0], lat: path.geometry.coordinates[pathIndex - 1][1] }) > 6) {
        // Move marker to new locaion, add to distance and geojson and redraw
        $('.leaflet-marker-pane').text('')
        $('.leaflet-shadow-pane').text('')
        $('.leaflet-overlay-pane').children().eq(0).children().eq(0).text('')
        L.marker(e.latlng).addTo(map)

        L.circle(e.latlng, {
            radius: e.accuracy,
            color: '#234099',
            fillColor: '#f78d46',
            fillOpacity: .32
        }).addTo(map)

        path.geometry.coordinates.push([e.longitude, e.latitude])
        // accuracies.push(e.accuracy)
        // timestamps.push(e.timestamp)
        L.geoJson(path, gOptions).addTo(map)

        distance += e.latlng.distanceTo({ lon: path.geometry.coordinates[pathIndex - 1][0], lat: path.geometry.coordinates[pathIndex - 1][1] })
        $('#distance').text(Math.round(distance))
        
        pathIndex++

    }

    }

}

map.on('locationfound', (e) => drawPath(e))
// testEvents.forEach(e => drawPath(e))

map.on('locationerror', (e) => {

    alert(e.message)

})

// On app run:
// If user is not logged in, prompt them to sign up or login.
// When user logs in, present a profile page that