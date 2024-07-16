"use client";

import Image from 'next/image';
import Link from 'next/link';

const HomePage = () => {
  return (
    <div className="min-h-screen bg-gray-100">
      <section className="relative h-screen text-white">
        <div className="absolute inset-0">
          <Image
            src="/images/hero-background.jpg" 
            alt="SpaceX Hero Background"
            fill
            style={{ objectFit: 'cover' }}
            quality={100}
            className="absolute inset-0 -z10"
          />
        </div>
        <div className="relative flex items-center justify-center h-full text-center px-4 z-10">
          <div className=" p-8 rounded-lg max-w-2xl mx-auto">
            <h1 className="text-5xl font-extrabold mb-4">Explore the Universe with SpaceX</h1>
            <p className="text-lg mb-8">Discover the latest missions, rockets, and innovations by SpaceX.</p>
            <Link
              href="/rockets"
              className="bg-white text-blue-800 font-semibold px-6 py-3 rounded-lg shadow-lg hover:bg-gray-100"
            >
              View Rockets
            </Link>
          </div>
        </div>
      </section>


      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl font-bold text-center mb-12">Featured SpaceX Information</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-8">
            <div className="bg-white shadow-md rounded-lg overflow-hidden">
              <Image
                src="/images/rocket-launch.jpg"
                alt="SpaceX Launch"
                width={500}
                height={500}
                className="object-center w-full h-72"
              />
              <div className="p-4">
                <h3 className="text-2xl font-semibold mb-2">Latest Launches</h3>
                <p className="text-gray-700">Stay updated with the latest SpaceX launches and missions. Check out our latest endeavors and achievements.</p>
                <Link
                  href="/launches"
                  className="text-blue-600 hover:underline mt-2 inline-block"
                >
                  Learn More
                </Link>
              </div>
            </div>

            <div className="bg-white shadow-md rounded-lg overflow-hidden">
              <Image
                src="/images/rocket.jpg"
                alt="SpaceX Rocket"
                width={500}
                height={500}
                className="object-center w-full h-72"
              />
              <div className="p-4">
                <h3 className="text-2xl font-semibold mb-2">Rockets</h3>
                <p className="text-gray-700">Explore the different rockets used by SpaceX for various missions. Learn about their designs and capabilities.</p>
                <Link
                  href="/rockets"
                  className="text-blue-600 hover:underline mt-2 inline-block"
                >
                  Explore Rockets
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default HomePage;
