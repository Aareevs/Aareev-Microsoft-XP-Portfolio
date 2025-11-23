import React, { useState } from 'react';
import LoadingScreen from './components/screens/LoadingScreen';
import LoginScreen from './components/screens/LoginScreen';
import DesktopScreen from './components/screens/DesktopScreen';
import { AnimatePresence, motion } from 'framer-motion';

const App: React.FC = () => {
  // We use independent boolean flags for the layers.
  // This ensures the Desktop can be mounted "behind" the login screen
  // before the login screen fades out.
  const [isBooting, setIsBooting] = useState(true);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isCrtEnabled, setIsCrtEnabled] = useState(true);

  const handleBootComplete = () => {
    setIsBooting(false);
  };

  const handleLogin = () => {
    setIsLoggedIn(true);
  };

  const handleRestart = () => {
    setIsLoggedIn(false);
    setIsBooting(true);
  };

  const handleLogOut = () => {
    setIsLoggedIn(false);
  };

  return (
    <div className="w-screen h-screen overflow-hidden font-sans text-base relative bg-black select-none">
      {/* GLOBAL SCANLINE OVERLAY */}
      {isCrtEnabled && (
        <div className="pointer-events-none fixed inset-0 z-[9999] crt-overlay"></div>
      )}

      {/* LAYER 1: DESKTOP (Bottom) */}
      {/* We mount the desktop as soon as we are logged in. 
          Technically, we could mount it earlier, but mounting it on login trigger 
          combined with the fade-out of the login screen creates the perfect effect. */}
      {isLoggedIn && (
         <div className="absolute inset-0 z-0">
            <DesktopScreen 
              onRestart={handleRestart} 
              onLogOut={handleLogOut} 
              isCrtEnabled={isCrtEnabled}
              toggleCrt={() => setIsCrtEnabled(!isCrtEnabled)}
            />
         </div>
      )}

      {/* LAYER 2: LOGIN SCREEN (Middle) */}
      <AnimatePresence>
        {!isLoggedIn && (
          <motion.div 
            key="login-layer"
            className="absolute inset-0 z-10"
            // If booting is done, we are visible. If booting is true, we are still here 
            // but covered by the boot screen (z-20).
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0, scale: 1.02, transition: { duration: 1, ease: "easeInOut" } }}
          >
            <LoginScreen onLogin={handleLogin} />
          </motion.div>
        )}
      </AnimatePresence>

      {/* LAYER 3: BOOT SCREEN (Top) */}
      <AnimatePresence>
        {isBooting && (
          <motion.div 
            key="boot-layer"
            className="absolute inset-0 z-20"
            exit={{ opacity: 0, transition: { duration: 0.5 } }}
          >
            <LoadingScreen onComplete={handleBootComplete} />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default App;