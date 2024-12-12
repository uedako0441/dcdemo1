"use client";

import { GoogleMap, LoadScript } from "@react-google-maps/api";
import React from "react";

const containerStyle = {
  width: "100%",
  height: "400px", // マップの高さを調整
};

const center = {
  lat: 35.6895, // 東京の緯度
  lng: 139.6917, // 東京の経度
};

const Page = () => {
  return (
    <div>
      <h1>Google Map 表示</h1>
      <LoadScript googleMapsApiKey={process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY || ""}>
        <GoogleMap
          mapContainerStyle={containerStyle}
          center={center}
          zoom={10} // 初期ズームレベル
        >
          
          {/* 子要素を追加できます */}
        </GoogleMap>
      </LoadScript>
    </div>
  );
};

export default Page;