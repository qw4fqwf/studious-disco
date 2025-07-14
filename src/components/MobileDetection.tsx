import { useEffect, useState } from 'react';

interface MobileDetectionProps {
  children: React.ReactNode;
}

const MobileDetection: React.FC<MobileDetectionProps> = ({ children }) => {
  const [isMobile, setIsMobile] = useState(false);
  const [isDesktopMode, setIsDesktopMode] = useState(false);

  useEffect(() => {
    const checkDevice = () => {
      const isMobileDevice = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
      const screenWidth = window.innerWidth;
      const isDesktopBrowser = screenWidth > 800 && isMobileDevice;

      setIsMobile(isMobileDevice && screenWidth <= 500);
      setIsDesktopMode(isDesktopBrowser);
    };

    checkDevice();
    window.addEventListener('resize', checkDevice);
    return () => window.removeEventListener('resize', checkDevice);
  }, []);

  if (isDesktopMode) {
    return (
      <div className="fixed inset-0 flex items-center justify-center bg-primary p-8 text-center">
        <div className="max-w-lg rounded-lg bg-[#915EFF] p-8 shadow-xl">
          <h2 className="mb-4 text-2xl font-bold text-white">Nice Try! 😅</h2>
          <p className="mb-4 text-lg text-white">
            I see what you did there... switching to desktop mode, huh?
            <br />
            <span className="mt-2 inline-block">
              🕵️‍♂️ Very sneaky... but I'm sneakier! 
            </span>
          </p>
          <p className="text-base text-white opacity-90">
            This site needs a real desktop or laptop screen.
            <br />
            No desktop mode tricks allowed! 🚫🎭
          </p>
          <div className="mt-4 text-sm text-white opacity-80">
            P.S. The 3D models really want to meet your desktop screen!
          </div>
        </div>
      </div>
    );
  }

  if (isMobile) {
    return (
      <div className="fixed inset-0 flex items-center justify-center bg-primary p-8 text-center">
        <div className="max-w-lg rounded-lg bg-[#915EFF] p-8 shadow-xl">
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
