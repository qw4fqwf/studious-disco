import { useEffect, useState } from 'react';

interface MobileDetectionProps {
  children: React.ReactNode;
}

const MobileDetection: React.FC<MobileDetectionProps> = ({ children }) => {
  const [isMobileDevice, setIsMobileDevice] = useState(true);

  useEffect(() => {
    const checkDevice = () => {
      // Check for mobile user agent
      const mobileUA = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini|Mobile|mobile|CriOS/i.test(
        navigator.userAgent
      );
      
      // Check for screen characteristics
      const smallScreen = window.screen.width <= 1024;
      
      // Check for touch capability
      const isTouch = ('ontouchstart' in window) || 
                     (navigator.maxTouchPoints > 0);

      // Check viewport size
      const smallViewport = window.innerWidth <= 1024;

      // Device pixel ratio is often higher on mobile
      const highDPR = window.devicePixelRatio > 1;

      // Combined check - if most of these are true, it's likely a mobile device
      const isMobile = [
        mobileUA,
        smallScreen,
        isTouch,
        smallViewport,
        highDPR
      ].filter(Boolean).length >= 3;

      setIsMobileDevice(isMobile);
    };

    checkDevice();
    window.addEventListener('resize', checkDevice);
    return () => window.removeEventListener('resize', checkDevice);
  }, []);

  if (isMobileDevice) {
    return (
      <div className="fixed inset-0 flex items-center justify-center bg-primary p-8">
        <div className="max-w-lg rounded-lg bg-[#915EFF] p-8 shadow-lg">
          <h2 className="mb-4 text-2xl font-bold text-white">Desktop Only Zone! 🖥️</h2>
          <p className="mb-3 text-lg text-white">
            Nice try with desktop mode! 😉
            <br />
            But this experience needs a real desktop or laptop.
          </p>
          <div className="mt-4 space-y-2 text-white opacity-90">
            <p>Why? Because:</p>
            <ul className="list-inside list-disc">
              <li>3D models need more power 🚀</li>
              <li>Your fingers deserve a break 🤚</li>
              <li>It's more fun on a big screen! 🎮</li>
            </ul>
          </div>
          <p className="mt-6 text-sm text-white opacity-80">
            See you on a desktop computer! 👋
          </p>
        </div>
      </div>
    );
  }

  return <>{children}</>;
};

export default MobileDetection;
