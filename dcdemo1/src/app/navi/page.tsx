// app/GoogleMap.tsx
'use client';
import React, { useEffect, useRef } from 'react';
import { Loader } from '@googlemaps/js-api-loader';

const GoogleMap: React.FC = () => {
  const mapRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const loader = new Loader({
      apiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY || '', // .env.local から環境変数を取得
      version: 'weekly',
    });

    loader.load().then(() => {
      if (mapRef.current) {
        const map = new google.maps.Map(mapRef.current, {
          center: { lat: 35.6762, lng: 139.6503 }, // 初期位置 (東京)
          zoom: 10,
        });

        // 出発地と目的地を指定
        const origin = { lat: 35.6762, lng: 139.6503 }; // 東京
        const destination = { lat: 35.6895, lng: 139.6917 }; // 渋谷

        // DirectionsService と DirectionsRenderer を作成
        const directionsService = new google.maps.DirectionsService();
        const directionsRenderer = new google.maps.DirectionsRenderer({
          map: map,
        });

        // Directions API を使ってルートを計算
        directionsService.route(
          {
            origin: origin,
            destination: destination,
            travelMode: google.maps.TravelMode.DRIVING, // 移動手段（車）
          },
          (result, status) => {
            if (status === google.maps.DirectionsStatus.OK) {
              // 成功した場合、ルートを描画
              directionsRenderer.setDirections(result);
            } else {
              console.error('Directions request failed due to ' + status);
            }
          }
        );

        // マーカーを設定
        new google.maps.Marker({
          position: origin,
          map: map,
          title: 'Tokyo',
        });

        new google.maps.Marker({
          position: destination,
          map: map,
          title: 'Shibuya',
        });
      }
    });
  }, []);

  return <div ref={mapRef} style={{ width: '100%', height: '400px' }} />;
};

export default GoogleMap;