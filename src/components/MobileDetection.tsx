import { useEffect, useState } from 'react';

interface MobileDetectionProps {
  children: React.ReactNode;
}

const MobileDetection: React.FC<MobileDetectionProps> = ({ children }) => {
  const [deviceType, setDeviceType] = useState<'desktop' | 'mobile' | 'mobileDesktopMode'>('desktop');

  useEffect(() => {
    const checkDevice = () => {
      // Basic mobile check first
      const isMobileDevice = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini|Mobile|mobile|CriOS/i.test(
        navigator.userAgent
      );

      if (!isMobileDevice) {
        setDeviceType('desktop');
        return;
      }

      // If it's mobile, check if they're trying to use desktop mode
      // Desktop mode typically has a viewport width much larger than the actual screen width
      const actualWidth = window.screen.width;
      const viewportWidth = window.innerWidth;
      
      // If viewport is significantly larger than actual screen, they're probably in desktop mode
      const isDesktopMode = viewportWidth > (actualWidth + 100); // Adding buffer for slight variations

      setDeviceType(isDesktopMode ? 'mobileDesktopMode' : 'mobile');
    };

    // Run the check immediately
    checkDevice();

    // Check on resize and orientation change
    window.addEventListener('resize', checkDevice);
    window.addEventListener('orientationchange', checkDevice);

    return () => {
      window.removeEventListener('resize', checkDevice);
      window.removeEventListener('orientationchange', checkDevice);
    };
  }, []);

  if (deviceType === 'mobileDesktopMode') {
    return (
      <div className="fixed inset-0 z-50 flex items-center justify-center bg-primary">
        <div className="max-w-lg rounded-lg bg-[#915EFF] p-8 shadow-lg">
          <h2 className="mb-4 text-2xl font-bold text-white">Nice Try! 😎</h2>
          <p className="mb-3 text-lg text-white">
            Desktop mode won't work here!
            <br />
            We need real desktop power for this experience.
          </p>
          <div className="mt-4 space-y-2 text-white opacity-90">
            <p className="font-semibold">Why desktop mode won't work:</p>
            <ul className="list-inside list-disc">
              <li>3D models need serious processing power 🚀</li>
              <li>Mobile GPU isn't enough, even in desktop mode 💻</li>
              <li>We want you to have the best experience! ✨</li>
            </ul>
          </div>
        </div>
      </div>
    );
  }

  if (deviceType === 'mobile') {
    return (
      <div className="fixed inset-0 z-50 flex items-center justify-center bg-primary">
        <div className="max-w-lg rounded-lg bg-[#915EFF] p-8 shadow-lg">
          <h2 className="mb-4 text-2xl font-bold text-white">Welcome! 👋</h2>
          <p className="mb-3 text-lg text-white">
            This portfolio needs a desktop or laptop computer to shine!
          </p>
          <div className="mt-4 space-y-2 text-white opacity-90">
            <p className="font-semibold">What you'll get on desktop:</p>
            <ul className="list-inside list-disc">
              <li>Stunning 3D animations ✨</li>
              <li>Smooth interactive experiences 🎮</li>
              <li>High-quality visual effects 🎨</li>
            </ul>
          </div>
          <p className="mt-6 text-sm italic text-white opacity-80">
            Please visit again from your computer!
          </p>
        </div>
      </div>
    );
  }

  return <>{children}</>;
};

export default MobileDetection;
