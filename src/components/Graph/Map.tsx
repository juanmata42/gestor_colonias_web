import React, { useEffect, useRef, useState } from 'react';
import mapboxgl from 'mapbox-gl';
import './styles.scss';

interface MapProps {
  id: string
  data: { coordinates: number[], amount: number, type: string }[]
  colors: any
  initialCoords?: number[]
  zoom: number
  radius: number
}

const generateGeoJson = (data: { coordinates: Array<number>, amount: number, type: string }[], type: string[]) => {
  const geojson = {
    type: 'FeatureCollection',
    features: [] as object[],
  };

  data.forEach((datum) => {
    geojson.features.push({
      type: 'Feature',
      properties: {
        Amount: datum.amount,
        Type: type.indexOf(datum.type),
      },
      geometry: {
        type: 'Point',
        coordinates: datum.coordinates,
      },
    });
  });

  return geojson as any;
};

export const Map = (props: MapProps) => {
  const {
    id, data, colors: pColors, zoom, radius,
  } = props;
  const divContainer = useRef<HTMLDivElement>(null);
  const [geolocation, setGeolocation] = useState({ lat: 0, lng: 0 });
  mapboxgl.accessToken = 'pk.eyJ1IjoiZ2ktYW1vbmRhbCIsImEiOiJjbDNsYXR0OTIwYjR2M2ZwNXpxbjZ4djBiIn0.ko3vWOROi0A1Chow0ONTMw';
  const initialCoords = data.length > 0 ? data[0].coordinates : undefined;
  useEffect(() => {
    if (initialCoords === undefined || Number.isNaN(initialCoords[0])) {
      setGeolocation({
        lat: 23.8103,
        lng: 90.4125,
      });
    } else {
      setGeolocation({
        lat: initialCoords[1],
        lng: initialCoords[0],
      });
    }
  }, []);

  useEffect(() => {
    if (divContainer.current) {
      Array.from(divContainer.current.children).forEach((child) => {
        divContainer.current?.removeChild(child);
      });
      const amountMax = Math.max(...(data.map((datum) => datum.amount)) as any);
      const dataType: string[] = data.map((datum) => datum.type).filter((item, idx, arr) => arr.indexOf(item) === idx);
      const colors = Object.keys(pColors).map((type) => [dataType.indexOf(type), pColors[type]]);
      const map = new mapboxgl.Map({
        container: divContainer.current,
        style: 'mapbox://styles/mapbox/satellite-streets-v11',
        attributionControl: false,
        center: [geolocation.lng, geolocation.lat],
        zoom,
      });

      map.on('load', () => {
        map.addSource(id, {
          type: 'geojson',
          data: generateGeoJson(data, dataType),
        });

        map.addLayer({
          id: 'points',
          type: 'circle',
          source: id,
          paint: {
            'circle-color': {
              property: 'Type',
              stops: colors,
            },
            'circle-radius': {
              property: 'Amount',
              stops: [
                [{ zoom, value: 0 }, 0],
                [{ zoom, value: amountMax }, radius],
              ],
            },
          },
        });
      });
    }
  }, [geolocation, props]);

  return <div style={{ minWidth: '100%', maxHeight: '100%', height: '100%' }} ref={divContainer} />;
};

Map.defaultProps = {
  initialCoords: undefined,
};
