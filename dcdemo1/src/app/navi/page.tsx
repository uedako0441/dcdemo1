'use client';
import React, { useEffect, useRef, useState } from 'react';
import { Loader } from '@googlemaps/js-api-loader';

const GoogleMap: React.FC = () => {
  const mapRef = useRef<HTMLDivElement | null>(null);
  const [origin, setOrigin] = useState<string>(''); // 出発地
  const [destination, setDestination] = useState<string>(''); // 目的地
  const [travelMode, setTravelMode] = useState<string>('DRIVING'); // 移動手段
  const [distance, setDistance] = useState<string>(''); // 距離
  const [duration, setDuration] = useState<string>(''); // 所要時間

  useEffect(() => {
    const loader = new Loader({
      apiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY || '',
      version: 'weekly',
    });

    loader.load().then(() => {
      if (mapRef.current) {
        const map = new google.maps.Map(mapRef.current, {
          center: { lat: 35.6762, lng: 139.6503 }, // 初期位置 (東京)
          zoom: 10,
        });

        const directionsService = new google.maps.DirectionsService();
        const directionsRenderer = new google.maps.DirectionsRenderer({
          map: map,
        });

        const geocoder = new google.maps.Geocoder();

        const calculateRoute = () => {
          if (origin && destination) {
            geocoder.geocode({ address: origin }, (results, status) => {
              if (status === google.maps.GeocoderStatus.OK) {
                const startLocation = results[0].geometry.location;

                geocoder.geocode({ address: destination }, (results, status) => {
                  if (status === google.maps.GeocoderStatus.OK) {
                    const endLocation = results[0].geometry.location;

                    directionsService.route(
                      {
                        origin: startLocation,
                        destination: endLocation,
                        travelMode: google.maps.TravelMode[travelMode],
                      },
                      (result, status) => {
                        if (status === google.maps.DirectionsStatus.OK && result) {
                          directionsRenderer.setDirections(result);

                          // 所要時間と距離を取得
                          const route = result.routes[0];
                          const leg = route.legs[0];
                          setDistance(leg.distance?.text || '');
                          setDuration(leg.duration?.text || '');
                        } else {
                          console.error('Directions request failed due to ' + status);
                        }
                      }
                    );
                  }
                });
              }
            });
          }
        };

        calculateRoute();
      }
    });
  }, [origin, destination, travelMode]);

  return (
    <div>
      <div>
        <label>
          出発地:
          <input
            type="text"
            value={origin}
            onChange={(e) => setOrigin(e.target.value)}
            placeholder="出発地を入力"
          />
        </label>
      </div>
      <div>
        <label>
          目的地:
          <input
            type="text"
            value={destination}
            onChange={(e) => setDestination(e.target.value)}
            placeholder="目的地を入力"
          />
        </label>
      </div>
      <div>
        <label>
          移動手段:
          <select
            value={travelMode}
            onChange={(e) => setTravelMode(e.target.value)}
          >
            <option value="DRIVING">車</option>
            <option value="WALKING">徒歩</option>
            <option value="BICYCLING">自転車</option>
            <option value="TRANSIT">公共交通機関</option>
          </select>
        </label>
      </div>
      <div>
        <button onClick={() => {}}>ルートを表示</button>
      </div>
      <div ref={mapRef} style={{ width: '100%', height: '400px' }} />
      <div>
        <h3>ルート情報</h3>
        <p>距離: {distance}</p>
        <p>所要時間: {duration}</p>
      </div>
    </div>
  );
};

export default GoogleMap;