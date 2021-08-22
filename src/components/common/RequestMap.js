import React, { useEffect, useRef, useState } from 'react';
import mapboxgl from '!mapbox-gl'; // eslint-disable-line import/no-webpack-loader-syntax

mapboxgl.accessToken = 'pk.eyJ1IjoicGFyc2FlbmFtaSIsImEiOiJja3E1bjQ5b3gxamluMnNxcjk2MmtodTk1In0.v-laqFH1Y9H7RCOmYat6hA';
mapboxgl.setRTLTextPlugin(
    'https://api.mapbox.com/mapbox-gl-js/plugins/mapbox-gl-rtl-text/v0.2.3/mapbox-gl-rtl-text.js',
    null,
    true // Lazy load the plugin
);

const RequestMap = props => {
  const mapContainer = useRef(null);
  const map = useRef(null);

  const [lng, setLng] = useState(53.8);
  const [lat, setLat] = useState(32.8);
  const [zoom, setZoom] = useState(4);

  useEffect(() => {
    if (map.current) {
      return;
    } // initialize map only once
    map.current = new mapboxgl.Map({
      container: mapContainer.current,
      style: 'mapbox://styles/mapbox/dark-v10',
      center: [lng, lat],
      zoom: zoom
    });
  });

  useEffect(() => {
    map.current.on('load', () => {
      // Add a new source from our GeoJSON data and
      // set the 'cluster' option to true. GL-JS will
      // add the point_count property to your source data.
      map.current.addSource('requests', {
        type: 'geojson',
        // Point to GeoJSON data. This example visualizes all M1.0+ earthquakes
        // from 12/22/15 to 1/21/16 as logged by USGS' Earthquake hazards program.
        // data: 'https://docs.mapbox.com/mapbox-gl-js/assets/earthquakes.geojson',
        data: props.data,
        cluster: true,
        clusterMaxZoom: 14, // Max zoom to cluster points on
        clusterRadius: 50 // Radius of each cluster when clustering points (defaults to 50)
      });

      map.current.addLayer({
        id: 'clusters',
        type: 'circle',
        source: 'requests',
        filter: ['has', 'point_count'],
        paint: {
          // Use step expressions (https://docs.mapbox.com/mapbox-gl-js/style-spec/#expressions-step)
          // with three steps to implement three types of circles:
          //   * Blue, 20px circles when point count is less than 100
          //   * Yellow, 30px circles when point count is between 100 and 750
          //   * Pink, 40px circles when point count is greater than or equal to 750
          'circle-color': [
            'step',
            ['get', 'point_count'],
            '#51bbd6',
            100,
            '#f1f075',
            750,
            '#f28cb1'
          ],
          'circle-radius': [
            'step',
            ['get', 'point_count'],
            20,
            100,
            30,
            750,
            40
          ]
        }
      });

      map.current.addLayer({
        id: 'cluster-count',
        type: 'symbol',
        source: 'requests',
        filter: ['has', 'point_count'],
        layout: {
          'text-field': '{point_count_abbreviated}',
          'text-font': ['DIN Offc Pro Medium', 'Arial Unicode MS Bold'],
          'text-size': 12
        }
      });

      map.current.addLayer({
        id: 'unclustered-point',
        type: 'circle',
        source: 'requests',
        filter: ['!', ['has', 'point_count']],
        paint: {
          'circle-color': '#11b4da',
          'circle-radius': 4,
          'circle-stroke-width': 1,
          'circle-stroke-color': '#fff'
        }
      });

      // inspect a cluster on click
      map.current.on('click', 'clusters', (e) => {
        const features = map.current.queryRenderedFeatures(e.point, {
          layers: ['clusters']
        });
        const clusterId = features[0].properties.cluster_id;
        map.current.getSource('requests').getClusterExpansionZoom(
            clusterId,
            (err, zoom) => {
              if (err) {
                return;
              }

              map.current.easeTo({
                center: features[0].geometry.coordinates,
                zoom: zoom
              });
            }
        );
      });

      // When a click event occurs on a feature in
      // the unclustered-point layer, open a popup at
      // the location of the feature, with
      // description HTML from its properties.
      map.current.on('click', 'unclustered-point', (e) => {
        const coordinates = e.features[0].geometry.coordinates.slice();
        const properties = e.features[0].properties;

        // Ensure that if the map is zoomed out such that
        // multiple copies of the feature are visible, the
        // popup appears over the copy being pointed to.
        while (Math.abs(e.lngLat.lng - coordinates[0]) > 180) {
          coordinates[0] += e.lngLat.lng > coordinates[0] ? 360 : -360;
        }

        new mapboxgl.Popup()
            .setLngLat(coordinates)
            .setHTML(
                `درخواست: ${properties.name}<br>تعداد: ${properties.amount}<br>ضروری؟: ${properties.urgent}<br>حادثه: ${properties.disaster}<br>زمان: ${properties.time_pretty}`
            )
            .addTo(map.current);
      });

      map.current.on('mouseenter', 'clusters', () => {
        map.current.getCanvas().style.cursor = 'pointer';
      });
      map.current.on('mouseleave', 'clusters', () => {
        map.current.getCanvas().style.cursor = '';
      });
    });
  }, [])

  useEffect(() => {
    if (!map.current) {
      return;
    } // wait for map to initialize
    map.current.on('move', () => {
      setLng(map.current.getCenter().lng.toFixed(4));
      setLat(map.current.getCenter().lat.toFixed(4));
      setZoom(map.current.getZoom().toFixed(2));
    });
  });

  return (
      <div>
        <h4>نحوه‌ی توزیع درخواست‌ها روی نقشه</h4>
        <div style={{position: 'relative'}}>
          <div className="map-sidebar">
            Longitude: {lng} | Latitude: {lat} | Zoom: {zoom}
          </div>
          <div ref={mapContainer} style={{height: 500}}/>
        </div>
      </div>
  );
};

RequestMap.propTypes = {};

export default RequestMap;