import Header from '../components/Header';
import '../styles/globals.css';

const RootLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <html lang="en">
      <head>
        <title>SpaceX</title>
      </head>
      <body>
        <Header />
        <main className="p-4">
          {children}
        </main>
      </body>
    </html>
  );
};

export default RootLayout;
