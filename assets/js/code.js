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

    // If current latlng is first, add [lon, lat], timestamp, and accuracy to LineString
        // Add marker to current user location
    // Else If first latlng exists, and this latlng is at least previousAccuracy meters from previousLatLng
        // add [lon, lat], timestamp, and accuracy to LineString
        // update polyline drawn with LineString

    // console.log(e)
    // thisPoint = e.latLng
    // now = e.timestamp
    // length = path.features[0].geometry.coordinates.length
    // // If there is at least one element in path...coordinates
    // if (length > 0) {
    //     lastPoint = coordsToLatLng(path.features[0].geometry.coordinates[length - 1])
    //     lastAccur = path.features[0].properties.accuraccies[length - 1]
    //     console.log(`${lastPoint}
    //     ${lastAccur}
    //     ${now}
    //     ____`)
    // }

    // // If first point or outside previous point accuracy, add new point to coordinates and update map
    // if ( length === 0 ) {
    //     // Add this [lon, lat] pair
    //     path.features[0].geometry.coordinates.push([e.longitude, e.latitude])
    //     path.features[0].properties.accuraccies.push(e.accuracy)

    // } else if ( thisPoint.distanceTo(lastPoint) > lastAccur ) {
    //     path.features[0].geometry.coordinates.push([e.longitude, e.latitude])
    //     path.features[0].properties.accuraccies.push(e.accuracy)
    //     !line ? line = L.polyline( path.features[0].geometry.coordinates ) :
    //     line.redraw()
    // }

});

map.on('locationerror', (e) => {

    alert(e.message)

});