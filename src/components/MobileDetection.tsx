import { useEffect, useState } from 'react';

interface MobileDetectionProps {
  children: React.ReactNode;
}

const MobileDetection: React.FC<MobileDetectionProps> = ({ children }) => {
  const [deviceState, setDeviceState] = useState<'desktop' | 'mobile' | 'mobileDesktopMode'>('mobile');

  useEffect(() => {
    let lastCheck = Date.now();
    
    const isMobileDevice = () => {
      // Enhanced mobile detection
      const userAgent = navigator.userAgent.toLowerCase();
      const mobileKeywords = /android|webos|iphone|ipad|ipod|blackberry|iemobile|opera mini|mobile|tablet/i;
      
      // Check user agent
      const userAgentMobile = mobileKeywords.test(userAgent);
      
      // Check screen size (typical mobile/tablet sizes)
      const screenWidth = window.screen.width;
      const isMobileSize = screenWidth <= 768;
      
      // Check for touch capability
      const hasTouch = 'ontouchstart' in window || navigator.maxTouchPoints > 0;
      
      // Consider it mobile if either user agent says so OR it has mobile characteristics
      return userAgentMobile || (isMobileSize && hasTouch);
    };

    const isDesktopMode = () => {
      // More sophisticated check for mobile devices pretending to be desktop
      const screenWidth = window.screen.width;
      const viewportWidth = window.innerWidth;
      const ratio = viewportWidth / screenWidth;
      
      // Check for common mobile screen sizes even in desktop mode
      const isMobileScreenSize = screenWidth <= 768 || window.screen.height <= 1024;
      
      // Check for touch capability (most mobiles have touch)
      const hasTouch = 'ontouchstart' in window || navigator.maxTouchPoints > 0;
      
      // If it's a mobile screen size with touch capability, it's likely mobile in desktop mode
      return isMobileScreenSize && hasTouch && ratio > 1.1;
    };

    const forceViewportReset = () => {
      const viewport = document.querySelector('meta[name=viewport]');
      if (viewport) {
        viewport.remove();
      }
      const newViewport = document.createElement('meta');
      newViewport.name = 'viewport';
      newViewport.content = 'width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no';
      document.getElementsByTagName('head')[0].appendChild(newViewport);
    };

    const checkDevice = () => {
      if (Date.now() - lastCheck < 100) return; // Prevent too frequent checks
      lastCheck = Date.now();

      const mobile = isMobileDevice();
      const screenWidth = window.screen.width;
      const hasTouch = 'ontouchstart' in window || navigator.maxTouchPoints > 0;
      
      // If it's clearly a desktop (large screen, no touch, not mobile user agent)
      if (!mobile && screenWidth > 1024 && !hasTouch) {
        setDeviceState('desktop');
        return;
      }
      
      // If it's mobile but trying to use desktop mode
      if (mobile && isDesktopMode()) {
        setDeviceState('mobileDesktopMode');
        forceViewportReset(); // Force mobile viewport
        return;
      }
      
      // If it's mobile in normal mode
      if (mobile) {
        setDeviceState('mobile');
        return;
      }
      
      // Default to desktop for everything else (tablets in landscape, etc.)
      setDeviceState('desktop');
    };

    // Initial check
    checkDevice();

    // Add viewport meta to prevent scaling
    forceViewportReset();

    // Check on various events
    window.addEventListener('resize', checkDevice);
    window.addEventListener('orientationchange', checkDevice);
    
    // Continuous checking
    const interval = setInterval(checkDevice, 500);

    return () => {
      window.removeEventListener('resize', checkDevice);
      window.removeEventListener('orientationchange', checkDevice);
      clearInterval(interval);
    };
  }, []);

  const blockingStyle: React.CSSProperties = {
    position: 'fixed',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    zIndex: 99999,
    background: '#030014',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    padding: '20px'
  };

  if (deviceState === 'mobileDesktopMode') {
    return (
      <div style={blockingStyle}>
        <div className="max-w-lg rounded-lg bg-[#915EFF] p-8 shadow-lg">
          <h2 className="mb-4 text-2xl font-bold text-white">Nice Try, Smarty Pants! 🤓</h2>
          <p className="mb-3 text-lg text-white">
            Don't try to be smart! I can see you're on mobile pretending to be a desktop. 😏
          </p>
          <div className="mt-4 space-y-2 text-white">
            <p className="font-semibold">Listen here, genius:</p>
            <ul className="list-inside list-disc">
              <li>Your phone isn't magically a computer �➡️💻</li>
              <li>Desktop mode is just fancy makeup 💄</li>
              <li>Stop cheating and get a real desktop! 🖥️</li>
              <li>We're not falling for your tricks! 🎪</li>
            </ul>
          </div>
          <p className="mt-4 text-white font-bold">
            Please view this on your ACTUAL desktop or laptop! 
          </p>
          <button 
            onClick={() => window.location.reload()}
            className="mt-6 rounded bg-white px-4 py-2 text-[#915EFF] transition hover:bg-opacity-90 font-semibold"
          >
            Fine, Back to Mobile View 🙄
          </button>
        </div>
      </div>
    );
  }

  if (deviceState === 'mobile') {
    return (
      <div style={blockingStyle}>
        <div className="max-w-lg rounded-lg bg-[#915EFF] p-8 shadow-lg">
          <h2 className="mb-4 text-2xl font-bold text-white">Welcome! 👋</h2>
          <p className="mb-3 text-lg text-white">
            This portfolio is designed for desktop viewing.
          </p>
          <div className="mt-4 space-y-2 text-white">
            <p className="font-semibold">On desktop you'll experience:</p>
            <ul className="list-inside list-disc">
              <li>Amazing 3D animations ✨</li>
              <li>Interactive elements 🎮</li>
              <li>High-performance visuals 🎨</li>
            </ul>
          </div>
          <p className="mt-6 text-sm text-white opacity-80">
            Please visit from your desktop or laptop computer!
          </p>
        </div>
      </div>
    );
  }

  return <>{children}</>;
};

export default MobileDetection;
