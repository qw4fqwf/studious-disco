import { useEffect, useState } from 'react';

interface MobileDetectionProps {
  children: React.ReactNode;
}

const MobileDetection: React.FC<MobileDetectionProps> = ({ children }) => {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const mediaQuery = window.matchMedia("(max-width: 500px)");
    setIsMobile(mediaQuery.matches);

    const handleMediaQueryChange = (event: MediaQueryListEvent) => {
      setIsMobile(event.matches);
    };

    mediaQuery.addEventListener("change", handleMediaQueryChange);
    return () => {
      mediaQuery.removeEventListener("change", handleMediaQueryChange);
    };
  }, []);

  if (isMobile) {
    return (
      <div className="fixed inset-0 flex items-center justify-center bg-primary p-8 text-center">
        <div className="max-w-lg rounded-lg bg-[#915EFF] p-8 shadow-lg">
          <h2 className="mb-4 text-2xl font-bold text-white">Desktop Viewing Recommended</h2>
          <p className="text-lg text-white">
            This site is optimized for desktop viewing to provide the best experience.
            <br />
            Please access the site from a desktop or laptop computer.
          </p>
        </div>
      </div>
    );
  }

  return <>{children}</>;
};

export default MobileDetection;
