"use client";

import { useEffect } from "react";

const MiniTokyo3D = () => {
  useEffect(() => {
    // 外部ライブラリの読み込み
    const loadMiniTokyo3D = async () => {
      if (typeof window !== "undefined") {
        const mt3d = await import("mini-tokyo-3d");

        const options = {
          container: "mini-tokyo-3d",
          accessToken: process.env.NEXT_PUBLIC_MAPBOX_ACCESS_TOKEN,
          secrets: {
            odpt: "<公共交通オープンデータセンターアクセストークン>",
            challenge2024: "<公共交通オープンデータチャレンジ2024アクセストークン>",
          },
        };

        // Mini Tokyo 3D マップを初期化
        new mt3d.Map(options);
      }
    };

    loadMiniTokyo3D().catch((err) => console.error("Error loading Mini Tokyo 3D:", err));
  }, []);

  return <div id="mini-tokyo-3d" style={{ width: "100%", height: "100%" }}></div>;
};

export default MiniTokyo3D;