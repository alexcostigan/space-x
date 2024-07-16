"use client";

import { useEffect, useState } from "react";
import Image from "next/image";

interface Rocket {
  id: string;
  name: string;
  description: string;
  flickr_images: string[];
}

const RocketList = () => {
  const [rockets, setRockets] = useState<Rocket[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const defaultImage = "/images/default-image.png";

  useEffect(() => {
    const fetchRockets = async () => {
      try {
        const rocketResponse = await fetch(
          "https://api.spacexdata.com/v4/rockets"
        );
        if (!rocketResponse.ok) {
          throw new Error("Network response was not ok");
        }
        const rocketData = await rocketResponse.json();
        setRockets(rocketData);
      } catch (err) {
        setError("Failed to fetch data");
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchRockets();
  }, []);

  if (loading) {
    return (
      <div className="text-center">
        <div className="w-16 h-16 border-4 border-t-4 border-zinc-500 border-solid rounded-full animate-spin mx-auto"></div>
      </div>
    );
  }
  if (error) {
    return <div className="text-center text-red-500">{error}</div>;
  }

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Rockets</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {rockets.map((rocket) => (
          <div key={rocket.id} className="bg-white shadow-md rounded-lg p-4">
            <div
              className="relative mb-2 rounded overflow-hidden"
              style={{ width: "100%", height: "0", paddingBottom: "56.25%" }}
            >
              <Image
                src={
                  rocket.flickr_images.length > 0
                    ? rocket.flickr_images[0]
                    : defaultImage
                }
                alt={rocket.name}
                fill
                style={{ objectFit: "cover" }}
                quality={100}
                sizes="(max-width: 640px) 100vw, (max-width: 768px) 50vw, 33vw"
              />
            </div>
            <h2 className="text-xl font-semibold">{rocket.name}</h2>
            <p className="mt-2 text-gray-600">{rocket.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default RocketList;
