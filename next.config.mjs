/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: [
      'images2.imgbox.com',
      'imgur.com',
      'farm1.staticflickr.com',
      'farm5.staticflickr.com',
      'live.staticflickr.com', // Additional Flickr subdomain
      'www.flickr.com', // Additional Flickr domain
    ],
  },
};

export default nextConfig;
