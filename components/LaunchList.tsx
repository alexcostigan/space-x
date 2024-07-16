"use client";

import { useEffect, useState } from 'react';
import Image from 'next/image';

interface Launch {
  id: string;
  mission_name: string;
  launch_date_utc: string;
  rocket_id: string;
  rocket_name: string;
  details: string;
  links: {
    patch: {
      small: string;
    };
  };
}

const LaunchList = () => {
  const [launches, setLaunches] = useState<Launch[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const launchesPerPage = 10;
  const defaultImage = '/images/default-image.png';

  useEffect(() => {
    const fetchLaunchesAndRockets = async () => {
      try {
        const launchResponse = await fetch('https://api.spacexdata.com/v4/launches');
        const launchData = await launchResponse.json();

        const rocketResponse = await fetch('https://api.spacexdata.com/v4/rockets');
        const rocketData = await rocketResponse.json();

        const rocketsMap = rocketData.reduce((acc: { [key: string]: string }, rocket: any) => {
          acc[rocket.id] = rocket.name;
          return acc;
        }, {});

        const formattedLaunches = launchData.map((launch: any) => ({
          id: launch.id,
          mission_name: launch.name,
          launch_date_utc: launch.date_utc,
          rocket_id: launch.rocket,
          rocket_name: rocketsMap[launch.rocket] || 'Unknown',
          details: launch.details,
          links: launch.links,
        }));

        setLaunches(formattedLaunches);
      } catch (err) {
        setError('Failed to fetch data');
      } finally {
        setLoading(false);
      }
    };

    fetchLaunchesAndRockets();
  }, []);

  const indexOfLastLaunch = currentPage * launchesPerPage;
  const indexOfFirstLaunch = indexOfLastLaunch - launchesPerPage;
  const currentLaunches = launches.slice(indexOfFirstLaunch, indexOfLastLaunch);
  const totalPages = Math.ceil(launches.length / launchesPerPage);

  const paginate = (pageNumber: number) => setCurrentPage(pageNumber);

  const getPageNumbers = () => {
    const maxPagesToShow = 5;
    const halfPageLimit = Math.floor(maxPagesToShow / 2);

    let startPage = Math.max(currentPage - halfPageLimit, 1);
    let endPage = Math.min(currentPage + halfPageLimit, totalPages);

    if (currentPage <= halfPageLimit) {
      endPage = Math.min(maxPagesToShow, totalPages);
    }

    if (currentPage + halfPageLimit >= totalPages) {
      startPage = Math.max(totalPages - maxPagesToShow + 1, 1);
    }

    const pageNumbers = [];
    for (let i = startPage; i <= endPage; i++) {
      pageNumbers.push(i);
    }
    return pageNumbers;
  };

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
    <div>
      <h1 className="text-2xl font-bold mb-4">Launches</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {currentLaunches.map((launch) => (
          <div key={launch.id} className="bg-white shadow-md rounded-lg p-4">
            <div className="mb-2 rounded overflow-hidden relative" style={{ width: '100%', height: '0', paddingBottom: '56.25%' }}>
              <Image
                src={launch.links.patch.small || defaultImage}
                alt={launch.mission_name}
                layout="fill"
                objectFit="contain"
              />
            </div>
            <h2 className="text-xl font-semibold">{launch.mission_name}</h2>
            <p>{new Date(launch.launch_date_utc).toLocaleDateString()}</p>
            <p className="text-gray-700">{launch.rocket_name}</p>
            <p className="mt-2 text-gray-600">{launch.details}</p>
          </div>
        ))}
      </div>
      <div className="flex justify-center mt-4">
        <button
          onClick={() => paginate(currentPage - 1)}
          disabled={currentPage === 1}
          className="px-4 py-2 mx-1 border rounded bg-white text-blue-500 disabled:opacity-50"
        >
          &laquo; Previous
        </button>
        {getPageNumbers().map((pageNumber) => (
          <button
            key={pageNumber}
            onClick={() => paginate(pageNumber)}
            className={`px-4 py-2 mx-1 border rounded ${pageNumber === currentPage ? 'bg-blue-500 text-white' : 'bg-white text-blue-500'}`}
          >
            {pageNumber}
          </button>
        ))}
        <button
          onClick={() => paginate(currentPage + 1)}
          disabled={currentPage === totalPages}
          className="px-4 py-2 mx-1 border rounded bg-white text-blue-500 disabled:opacity-50"
        >
          Next &raquo;
        </button>
      </div>
    </div>
  );
};

export default LaunchList;
