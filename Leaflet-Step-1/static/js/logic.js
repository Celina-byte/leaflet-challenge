// Creating map object
var myMap = L.map("map", {
    center: [39.7, -94.5],
    zoom: 5
  });
  
  // Adding tile layer to the map
  L.tileLayer("https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}", {
    attribution: "© <a href='https://www.mapbox.com/about/maps/'>Mapbox</a> © <a href='http://www.openstreetmap.org/copyright'>OpenStreetMap</a> <strong><a href='https://www.mapbox.com/map-feedback/' target='_blank'>Improve this map</a></strong>",
    tileSize: 512,
    maxZoom: 18,
    zoomOffset: -1,
    id: "mapbox/streets-v11",
    accessToken: API_KEY
  }).addTo(myMap);
  
  // TODO:
  
  // Store API query variables
  let baseURL = "https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_week.geojson";

  // console.log(baseURL)
  

  // Grab the data with d3
  d3.json(baseURL)
  .then(data=>{
    console.log(data)

    function styleInfo(feature){
      return{
        opacity: 0.8,
        fillOpacity: 0.8,
        fillColor: Color(feature.properties.mag),
        color: "#000000",
        radius: Radius(feature.properties.mag),
        stroke: true,
        weight: 0.5

      }
    }

        // This function determines the color of the marker based on the magnitude of the earthquake.
        function Color(magnitude) {
          switch (true) {
          case magnitude > 5:
            return "purple";
          case magnitude > 4:
            return "blue";
          case magnitude > 3:
            return "orange";
          case magnitude > 2:
            return "pink";
          case magnitude > 1:
            return "yellow";
          default:
            return "lightblue";
          }
        }
      
        // This function determines the radius of the earthquake marker based on its magnitude.
        // Earthquakes with a magnitude of 0 were being plotted with the wrong radius.
        function Radius(magnitude) {
          if (magnitude === 0) {
            return 1;
          }
      
          return magnitude * 5;
        }
    
    // GeoJSON layer to the map .
    L.geoJson(data, {
      // circleMarker
      pointToLayer: function(feature, latlng) {
        return L.circleMarker(latlng);
      },
      // We set the style for each circleMarker using our styleInfo function.
      style: styleInfo,
      // We create a popup for each marker to display the magnitude and location of the earthquake after the marker has been created and styled
      onEachFeature: function(feature, layer) {
        layer.bindPopup("Magnitude: " + feature.properties.mag + "<br>Location: " + feature.properties.place);
      }
    }).addTo(myMap);

  

  
    // Here we add a GeoJSON layer to the map once the file is loaded.
    L.geoJson(data, {
      // We turn each feature into a circleMarker on the map.
      pointToLayer: function(feature, latlng) {
        return L.circleMarker(latlng);
      },
      // We set the style for each circleMarker using our styleInfo function.
      style: styleInfo,
      // We create a popup for each marker to display the magnitude and location of the earthquake after the marker has been created and styled
      onEachFeature: function(feature, layer) {
        layer.bindPopup("Magnitude: " + feature.properties.mag + "<br>Location: " + feature.properties.place);
      }
    }).addTo(MyMap);

    

  })
