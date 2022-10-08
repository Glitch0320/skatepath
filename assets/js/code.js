// For some reason this function isn't being recognized so I will rewrite it here
function coordsToLatLng([lon, lat]) {
    // return latlng object
    return L.latLng(lat, lon)
}

// Initialize map
const mapOptions = {
    // https://leafletjs.com/reference.html#map-option
}

let map = L.map('map').setView([0, 0], 10, mapOptions);

// Tile Layer is a grid of images 256 by 256px
let layer = L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom: 18,
    attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
}).addTo(map)

const pathOptions = {
    // https://leafletjs.com/reference.html#path
}

// geoJSON object with one LineString
const path = {
    "type": "FeatureCollection",
  "features": [
    {
      "type": "Feature",
      "properties": {
        accuraccies: [],
        timestamps: []
      },
      "geometry": {
        "type": "LineString",
        coordinates: []
      }
    }
  ]
};

const lineOptions = {
    // https://leafletjs.com/reference.html#polyline
}

const gOptions = {
    // https://leafletjs.com/reference.html#geojson
}

const geoLayer = L.geoJSON().addTo(map)

// Sets map to current location, with tracking enabled
map.locate({
    watch: true,
    setView: true,
    maxZoom: 18,
    enableHighAccuracy: true
})

// In this context, a point is a group of values to be added to the path object
let pathIndex = 0

map.on('locationfound', (e) => {

    console.log('found')

    // If first location 
    if (pathIndex === 0) {
        // Add [lon, lat], timestamp, and accuracy to corresponding arrays in path{geoJSON} object
        path.features[0].geometry.coordinates = [[10.752245, 59.913868]]
        path.features[0].properties.timestamps = [e.timestamp]
        path.features[0].properties.accuraccies = [e.accuracy]
        console.log(path)
        pathIndex++
    // else if this location is > <lastlocationaccuracy> m from <lastlocation>
    } else if ( map.distance(e.latlng, coordsToLatLng(path.features[0].geometry.coordinates[pathIndex - 1])) > path.features[0].properties.accuraccies[pathIndex - 1] ) {

        path.features[0].geometry.coordinates.push([e.longitude, e.latitude])
        path.features[0].properties.timestamps.push(e.timestamp)
        path.features[0].properties.accuraccies.push(e.accuracy)
        console.log(path)
        // If second point
        if (pathIndex === 1) {
            let line = L.polyline(coordsToLatLngs(path.features[0].geometry.coordinates), lineOptions).addTo(map)
        } else {
            line.redraw()
        }
        pathIndex++
    }

});

map.on('locationerror', (e) => {

    alert(e.message)

});