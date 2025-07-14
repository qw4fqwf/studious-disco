import { useEffect, useState } from 'react';

interface MobileDetectionProps {
  children: React.ReactNode;
}

const MobileDetection: React.FC<MobileDetectionProps> = ({ children }) => {
  const [deviceType, setDeviceType] = useState<'desktop' | 'mobile' | 'mobileDesktopMode'>('mobile');

  useEffect(() => {
    const checkDevice = () => {
      // Basic mobile check
      const isMobileDevice = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini|Mobile|mobile|CriOS/i.test(
        navigator.userAgent
      );
      
      if (!isMobileDevice) {
        setDeviceType('desktop');
        return;
      }

      // Check if mobile user is trying to use desktop mode
      const isDesktopMode = window.innerWidth > 800 && window.screen.width <= 500;
      
      setDeviceType(isDesktopMode ? 'mobileDesktopMode' : 'mobile');
    };

    checkDevice();
    window.addEventListener('resize', checkDevice);
    return () => window.removeEventListener('resize', checkDevice);
  }, []);

  if (deviceType === 'mobileDesktopMode') {
    return (
      <div className="fixed inset-0 flex items-center justify-center bg-primary p-8">
        <div className="max-w-lg rounded-lg bg-[#915EFF] p-8 shadow-lg">
          <h2 className="mb-4 text-2xl font-bold text-white">Ahh, Trying to be Smart! 😏</h2>
          <p className="mb-3 text-lg text-white">
            Desktop mode? Nice try! 
            <br />
            But we need a real computer screen for this magic ✨
          </p>
          <div className="mt-4 space-y-2 text-white opacity-90">
            <p>Because:</p>
            <ul className="list-inside list-disc">
              <li>Our 3D models are too fancy for mobile 🎨</li>
              <li>Desktop mode isn't real desktop power 🚫</li>
              <li>Your phone deserves a break! 📱</li>
            </ul>
          </div>
        </div>
      </div>
    );
  }

  if (deviceType === 'mobile') {
    return (
      <div className="fixed inset-0 flex items-center justify-center bg-primary p-8">
        <div className="max-w-lg rounded-lg bg-[#915EFF] p-8 shadow-lg">
          <h2 className="mb-4 text-2xl font-bold text-white">Welcome! 👋</h2>
          <p className="mb-3 text-lg text-white">
            This portfolio is designed for desktop viewing to give you the best experience possible.
          </p>
          <p className="text-base text-white opacity-90">
            Please open this site on your desktop or laptop computer to:
            <br />
            ✨ See amazing 3D animations
            <br />
            🖥️ Experience smooth interactions
            <br />
            🎨 View all projects in full detail
          </p>
        </div>
      </div>
    );
  }

  return <>{children}</>;
};

export default MobileDetection;
