import { useEffect, useState, useCallback } from 'react';

interface MobileDetectionProps {
  children: React.ReactNode;
}

const MobileDetection: React.FC<MobileDetectionProps> = ({ children }) => {
  const [deviceState, setDeviceState] = useState<'desktop' | 'mobile' | 'mobileDesktopMode'>('mobile');

  const isMobileDevice = useCallback(() => {
    const mobileRegex = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini|Mobile|mobile|CriOS/i;
    const deviceChecks = [
      mobileRegex.test(navigator.userAgent),
      'ontouchstart' in window,
      navigator.maxTouchPoints > 0,
      window.screen.width <= 1024,
      window.orientation !== undefined,
    ];
    return deviceChecks.filter(Boolean).length >= 2;
  }, []);

  const lockToPortrait = useCallback(() => {
    try {
      if ((screen.orientation as any)?.lock) {
        (screen.orientation as any).lock('portrait');
      }
    } catch (e) {
      console.log('Orientation lock not supported');
    }
  }, []);

  const forceNormalDisplay = useCallback(() => {
    // Force viewport settings
    const meta = document.querySelector('meta[name="viewport"]');
    const orientationMeta = document.querySelector('meta[name="screen-orientation"]');
    
    if (!meta) {
      const newMeta = document.createElement('meta');
      newMeta.name = 'viewport';
      document.head.appendChild(newMeta);
    }
    
    if (!orientationMeta) {
      const newOrientationMeta = document.createElement('meta');
      newOrientationMeta.name = 'screen-orientation';
      newOrientationMeta.content = 'portrait';
      document.head.appendChild(newOrientationMeta);
    }

    // Set strict viewport constraints
    const viewportContent = [
      'width=device-width',
      'initial-scale=1.0',
      'maximum-scale=1.0',
      'user-scalable=no',
      'shrink-to-fit=no',
      'viewport-fit=cover'
    ].join(', ');

    meta?.setAttribute('content', viewportContent);

    // Reset any zoom
    document.body.style.zoom = '100%';
    (document.body.style as any).textSizeAdjust = '100%';
    (document.body.style as any).webkitTextSizeAdjust = '100%';
    
    // Force hardware acceleration
    document.body.style.transform = 'translateZ(0)';
    document.body.style.webkitTransform = 'translateZ(0)';
  }, []);

  const checkDevice = useCallback(() => {
    if (!isMobileDevice()) {
      setDeviceState('desktop');
      return;
    }

    const isInDesktopMode = 
      window.innerWidth > window.screen.width ||
      window.innerWidth / window.screen.width > 1.1 ||
      window.visualViewport?.scale !== 1 ||
      window.innerWidth > 800;

    setDeviceState(isInDesktopMode ? 'mobileDesktopMode' : 'mobile');

    if (isInDesktopMode) {
      forceNormalDisplay();
      lockToPortrait();
    }
  }, [isMobileDevice, forceNormalDisplay, lockToPortrait]);

  useEffect(() => {
    // Initial checks and setup
    checkDevice();
    forceNormalDisplay();
    if (isMobileDevice()) {
      lockToPortrait();
    }

    // Add event listeners
    window.addEventListener('resize', checkDevice);
    window.addEventListener('orientationchange', checkDevice);
    
    // Continuous checking
    const interval = setInterval(checkDevice, 200);

    // Prevent zooming
    document.addEventListener('touchstart', (e) => {
      if (e.touches.length > 1) e.preventDefault();
    }, { passive: false });

    document.addEventListener('gesturestart', (e) => e.preventDefault());
    document.addEventListener('gesturechange', (e) => e.preventDefault());
    document.addEventListener('gestureend', (e) => e.preventDefault());

    // Prevent pull to refresh
    document.body.style.overscrollBehavior = 'none';

    return () => {
      window.removeEventListener('resize', checkDevice);
      window.removeEventListener('orientationchange', checkDevice);
      clearInterval(interval);
    };
  }, [checkDevice, forceNormalDisplay, isMobileDevice, lockToPortrait]);

  if (deviceState === 'mobileDesktopMode' || deviceState === 'mobile') {
    const message = deviceState === 'mobileDesktopMode' ? (
      <>
        <h2 className="mb-4 text-2xl font-bold text-white">Nice Try! 🎭</h2>
        <p className="mb-3 text-lg text-white">
          Desktop mode detected! But we can see through that disguise...
        </p>
        <div className="mt-4 space-y-2 text-white opacity-90">
          <p>Why it won't work:</p>
          <ul className="list-inside list-disc">
            <li>Our 3D models need real desktop power 💪</li>
            <li>Desktop mode is just pretending 🕵️‍♂️</li>
            <li>You deserve the full experience! ✨</li>
          </ul>
        </div>
        <p className="mt-4 text-sm text-white opacity-80">
          Please visit us from a real desktop or laptop!
        </p>
      </>
    ) : (
      <>
        <h2 className="mb-4 text-2xl font-bold text-white">Hello There! 👋</h2>
        <p className="mb-3 text-lg text-white">
          This portfolio needs a desktop or laptop to truly shine.
        </p>
        <div className="mt-4 space-y-2 text-white opacity-90">
          <p>On desktop you'll experience:</p>
          <ul className="list-inside list-disc">
            <li>Stunning 3D animations ✨</li>
            <li>Interactive elements 🎮</li>
            <li>High-performance graphics 🎨</li>
          </ul>
        </div>
        <p className="mt-4 text-sm text-white opacity-80">
          See you on desktop! 
        </p>
      </>
    );

    return (
      <div 
        className="fixed inset-0 z-[99999] flex items-center justify-center overscroll-none bg-primary text-center"
        style={{
          minHeight: '100dvh',
          minWidth: '100dvw',
          overflow: 'hidden',
          position: 'fixed',
          top: 0,
          left: 0,
          touchAction: 'none'
        }}
      >
        <div className="mx-4 max-w-lg rounded-lg bg-[#915EFF] p-8 shadow-lg">
          {message}
        </div>
      </div>
    );
  }

  return <>{children}</>;
};

export default MobileDetection;
