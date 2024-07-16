import Link from 'next/link';

const Header = () => {
  return (
    <header className="bg-gray-800 text-white p-4">
      <nav className="flex justify-between items-center container mx-auto">
        <Link href="/" className="text-lg font-bold">
          SpaceX
        </Link>
        <div>
          <Link href="/launches" className="mr-4 hover:text-gray-400">Launches</Link>
          <Link href="/rockets" className="hover:text-gray-400">Rockets</Link>
        </div>
      </nav>
    </header>
  );
};

export default Header;
