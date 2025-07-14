import { useEffect, useState } from 'react';

interface MobileDetectionProps {
  children: React.ReactNode;
}

const MobileDetection: React.FC<MobileDetectionProps> = ({ children }) => {
  const [deviceType, setDeviceType] = useState<'desktop' | 'mobile' | 'mobileDesktopMode'>('mobile');

  useEffect(() => {
    const checkDevice = () => {
      // Multiple checks for mobile devices
      const checks = {
        // Check user agent for mobile devices
        userAgent: /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini|Mobile|mobile|CriOS/i.test(
          navigator.userAgent
        ),
        // Check physical screen dimensions
        screenSize: window.screen.width <= 1024 || window.screen.height <= 850,
        // Check touch capability
        touchDevice: 'ontouchstart' in window || navigator.maxTouchPoints > 0,
        // Check actual screen resolution (common mobile resolutions)
        resolution: window.screen.width <= 1440,
        // Check device memory (most mobile devices have less RAM)
        lowMemory: (navigator as any).deviceMemory !== undefined && (navigator as any).deviceMemory < 8,
        // Check viewport dimensions
        viewportSize: window.innerWidth <= 1024,
        // Check device orientation capability (most desktops don't have this)
        hasOrientation: 'orientation' in window || 'onorientationchange' in window,
        // Check device pixel ratio (usually higher on mobile)
        highDPR: window.devicePixelRatio >= 2,
      };

      // Count how many mobile indicators are true
      const mobileScore = Object.values(checks).filter(Boolean).length;

      // Very strict check - if more than 4 indicators say it's mobile, we treat it as mobile
      const isMobileDevice = mobileScore >= 4;

      if (!isMobileDevice) {
        setDeviceType('desktop');
        return;
      }

      // Extra check for desktop mode attempt
      const isDesktopMode = window.innerWidth !== window.screen.width ||
                           (window.innerWidth > 800 && window.screen.width <= 500);

      setDeviceType(isDesktopMode ? 'mobileDesktopMode' : 'mobile');
    };

    // Run the check immediately
    checkDevice();

    // Check on resize and orientation change
    window.addEventListener('resize', checkDevice);
    window.addEventListener('orientationchange', checkDevice);

    const interval = setInterval(checkDevice, 1000); // Regular check every second

    return () => {
      window.removeEventListener('resize', checkDevice);
      window.removeEventListener('orientationchange', checkDevice);
      clearInterval(interval);
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
          <p className="mt-6 text-sm italic text-white opacity-80">
            See you on a real computer! No shortcuts allowed! 😉
          </p>
        </div>
      </div>
    );
  }

  if (deviceType === 'mobile') {
    return (
      <div className="fixed inset-0 z-50 flex items-center justify-center bg-primary">
        <div className="max-w-lg rounded-lg bg-[#915EFF] p-8 shadow-lg">
          <h2 className="mb-4 text-2xl font-bold text-white">Hold Up! 🖐️</h2>
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
