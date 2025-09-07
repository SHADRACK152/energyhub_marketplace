import React, { useState, useEffect } from 'react';
import Button from '../../components/ui/Button';

const MobileApp = () => {
  const [isOnline, setIsOnline] = useState(navigator.onLine);
  const [deferredPrompt, setDeferredPrompt] = useState(null);
  const [installable, setInstallable] = useState(false);
  const [pushPermission, setPushPermission] = useState('default');
  const [location, setLocation] = useState(null);
  const [orientation, setOrientation] = useState(window.screen.orientation?.angle || 0);
  const [batteryLevel, setBatteryLevel] = useState(null);

  useEffect(() => {
    // PWA Installation
    const handleBeforeInstallPrompt = (e) => {
      e.preventDefault();
      setDeferredPrompt(e);
      setInstallable(true);
    };

    // Network status
    const handleOnline = () => setIsOnline(true);
    const handleOffline = () => setIsOnline(false);

    // Device orientation
    const handleOrientationChange = () => {
      setOrientation(window.screen.orientation?.angle || 0);
    };

    // Battery API
    const getBatteryInfo = async () => {
      if ('getBattery' in navigator) {
        try {
          const battery = await navigator.getBattery();
          setBatteryLevel(Math.round(battery.level * 100));
        } catch (error) {
          console.log('Battery API not supported');
        }
      }
    };

    window.addEventListener('beforeinstallprompt', handleBeforeInstallPrompt);
    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);
    window.addEventListener('orientationchange', handleOrientationChange);
    
    getBatteryInfo();
    checkNotificationPermission();
    getCurrentLocation();

    return () => {
      window.removeEventListener('beforeinstallprompt', handleBeforeInstallPrompt);
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
      window.removeEventListener('orientationchange', handleOrientationChange);
    };
  }, []);

  const installPWA = async () => {
    if (!deferredPrompt) return;
    
    deferredPrompt.prompt();
    const choiceResult = await deferredPrompt.userChoice;
    
    if (choiceResult.outcome === 'accepted') {
      console.log('PWA installation accepted');
    }
    
    setDeferredPrompt(null);
    setInstallable(false);
  };

  const requestNotificationPermission = async () => {
    if (!('Notification' in window)) {
      alert('This browser does not support notifications');
      return;
    }

    const permission = await Notification.requestPermission();
    setPushPermission(permission);
    
    if (permission === 'granted') {
      new Notification('Energy Hub Notifications Enabled!', {
        body: 'You\'ll now receive updates about orders, prices, and market trends.',
        icon: '/favicon.ico'
      });
    }
  };

  const checkNotificationPermission = () => {
    if ('Notification' in window) {
      setPushPermission(Notification.permission);
    }
  };

  const getCurrentLocation = () => {
    if ('geolocation' in navigator) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setLocation({
            latitude: position.coords.latitude,
            longitude: position.coords.longitude
          });
        },
        (error) => {
          console.log('Location access denied');
        }
      );
    }
  };

  const shareApp = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: 'Energy Hub Marketplace',
          text: 'Check out this amazing energy marketplace!',
          url: window.location.href
        });
      } catch (error) {
        console.log('Error sharing:', error);
      }
    } else {
      // Fallback for browsers that don't support Web Share API
      navigator.clipboard.writeText(window.location.href);
      alert('Link copied to clipboard!');
    }
  };

  const vibrate = () => {
    if ('vibrate' in navigator) {
      navigator.vibrate([200, 100, 200]);
    }
  };

  const goFullscreen = () => {
    if (document.documentElement.requestFullscreen) {
      document.documentElement.requestFullscreen();
    }
  };

  const quickActions = [
    { id: 1, title: 'Find Solar Installers', icon: '🏠', action: () => vibrate() },
    { id: 2, title: 'Check Energy Prices', icon: '⚡', action: () => vibrate() },
    { id: 3, title: 'Order Batteries', icon: '🔋', action: () => vibrate() },
    { id: 4, title: 'Schedule Service', icon: '🔧', action: () => vibrate() }
  ];

  const energySavingsTips = [
    'Install smart thermostats to save up to 23% on heating costs',
    'LED bulbs use 75% less energy than incandescent bulbs',
    'Solar panels can reduce electricity bills by 50-90%',
    'Energy-efficient appliances can save $500+ annually'
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Mobile Header */}
      <div className="bg-gradient-to-r from-blue-600 to-green-600 text-white p-4 rounded-b-lg">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-xl font-bold">Energy Hub Mobile</h1>
            <p className="text-blue-100 text-sm">Your energy marketplace</p>
          </div>
          <div className="flex items-center gap-2">
            {/* Network Status */}
            <div className={`w-3 h-3 rounded-full ${isOnline ? 'bg-green-400' : 'bg-red-400'}`}></div>
            {/* Battery Level */}
            {batteryLevel && (
              <div className="text-xs bg-white/20 px-2 py-1 rounded">
                🔋 {batteryLevel}%
              </div>
            )}
          </div>
        </div>
      </div>

      {/* PWA Installation Banner */}
      {installable && (
        <div className="bg-blue-50 border-l-4 border-blue-400 p-4 m-4 rounded">
          <div className="flex items-center justify-between">
            <div>
              <h4 className="font-medium text-blue-800">Install Energy Hub App</h4>
              <p className="text-sm text-blue-600">Get the full app experience!</p>
            </div>
            <Button onClick={installPWA} size="sm">Install</Button>
          </div>
        </div>
      )}

      {/* Device Status */}
      <div className="grid grid-cols-2 gap-4 p-4">
        <div className="bg-white rounded-lg p-4 shadow-sm">
          <div className="text-sm text-gray-600">Connection</div>
          <div className={`font-medium ${isOnline ? 'text-green-600' : 'text-red-600'}`}>
            {isOnline ? 'Online' : 'Offline'}
          </div>
        </div>
        <div className="bg-white rounded-lg p-4 shadow-sm">
          <div className="text-sm text-gray-600">Orientation</div>
          <div className="font-medium">
            {orientation === 0 ? 'Portrait' : 'Landscape'}
          </div>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="p-4">
        <h3 className="text-lg font-bold mb-4">Quick Actions</h3>
        <div className="grid grid-cols-2 gap-3">
          {quickActions.map((action) => (
            <button
              key={action.id}
              onClick={action.action}
              className="bg-white rounded-lg p-4 shadow-sm text-center hover:shadow-md transition-shadow"
            >
              <div className="text-2xl mb-2">{action.icon}</div>
              <div className="text-sm font-medium">{action.title}</div>
            </button>
          ))}
        </div>
      </div>

      {/* Energy Savings Calculator */}
      <div className="p-4">
        <div className="bg-gradient-to-r from-green-50 to-blue-50 rounded-lg p-4 border">
          <h3 className="text-lg font-bold mb-3">💡 Energy Savings Calculator</h3>
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-sm">Monthly electricity bill</span>
              <input 
                type="number" 
                placeholder="$200" 
                className="w-20 px-2 py-1 border rounded text-sm"
              />
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm">Solar panel system size</span>
              <select className="px-2 py-1 border rounded text-sm">
                <option>5kW</option>
                <option>10kW</option>
                <option>15kW</option>
              </select>
            </div>
            <div className="bg-white p-3 rounded border-l-4 border-green-500">
              <div className="text-sm text-gray-600">Estimated Monthly Savings</div>
              <div className="text-xl font-bold text-green-600">$156</div>
              <div className="text-xs text-gray-500">78% reduction in electricity costs</div>
            </div>
          </div>
        </div>
      </div>

      {/* Nearby Services */}
      <div className="p-4">
        <h3 className="text-lg font-bold mb-4">🗺️ Nearby Services</h3>
        <div className="space-y-3">
          <div className="bg-white rounded-lg p-4 shadow-sm">
            <div className="flex items-center justify-between">
              <div>
                <div className="font-medium">SolarTech Installation</div>
                <div className="text-sm text-gray-600">📍 2.3 miles away</div>
                <div className="text-sm text-yellow-600">⭐ 4.8 (124 reviews)</div>
              </div>
              <Button size="sm">Call</Button>
            </div>
          </div>
          <div className="bg-white rounded-lg p-4 shadow-sm">
            <div className="flex items-center justify-between">
              <div>
                <div className="font-medium">GreenEnergy Solutions</div>
                <div className="text-sm text-gray-600">📍 3.7 miles away</div>
                <div className="text-sm text-yellow-600">⭐ 4.6 (89 reviews)</div>
              </div>
              <Button size="sm">Call</Button>
            </div>
          </div>
        </div>
      </div>

      {/* Energy Tips */}
      <div className="p-4">
        <h3 className="text-lg font-bold mb-4">💚 Energy Saving Tips</h3>
        <div className="space-y-2">
          {energySavingsTips.map((tip, index) => (
            <div key={index} className="bg-white rounded-lg p-3 shadow-sm">
              <div className="text-sm text-gray-700">{tip}</div>
            </div>
          ))}
        </div>
      </div>

      {/* App Features */}
      <div className="p-4">
        <h3 className="text-lg font-bold mb-4">📱 App Features</h3>
        <div className="grid grid-cols-2 gap-3">
          <button
            onClick={requestNotificationPermission}
            className="bg-white rounded-lg p-4 shadow-sm text-center"
          >
            <div className="text-xl mb-2">🔔</div>
            <div className="text-sm font-medium">Notifications</div>
            <div className="text-xs text-gray-600">
              {pushPermission === 'granted' ? 'Enabled' : 'Enable'}
            </div>
          </button>
          
          <button
            onClick={shareApp}
            className="bg-white rounded-lg p-4 shadow-sm text-center"
          >
            <div className="text-xl mb-2">📤</div>
            <div className="text-sm font-medium">Share App</div>
            <div className="text-xs text-gray-600">Tell friends</div>
          </button>
          
          <button
            onClick={goFullscreen}
            className="bg-white rounded-lg p-4 shadow-sm text-center"
          >
            <div className="text-xl mb-2">⛶</div>
            <div className="text-sm font-medium">Fullscreen</div>
            <div className="text-xs text-gray-600">Immersive view</div>
          </button>
          
          <button
            onClick={vibrate}
            className="bg-white rounded-lg p-4 shadow-sm text-center"
          >
            <div className="text-xl mb-2">📳</div>
            <div className="text-sm font-medium">Haptic</div>
            <div className="text-xs text-gray-600">Touch feedback</div>
          </button>
        </div>
      </div>

      {/* Location Services */}
      {location && (
        <div className="p-4">
          <div className="bg-blue-50 rounded-lg p-4 border">
            <h4 className="font-medium text-blue-800 mb-2">📍 Location Services Active</h4>
            <p className="text-sm text-blue-600">
              Showing energy services in your area
            </p>
            <p className="text-xs text-blue-500 mt-1">
              Lat: {location.latitude.toFixed(4)}, Lng: {location.longitude.toFixed(4)}
            </p>
          </div>
        </div>
      )}

      {/* Offline Support */}
      {!isOnline && (
        <div className="p-4">
          <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4 rounded">
            <h4 className="font-medium text-yellow-800">📶 Offline Mode</h4>
            <p className="text-sm text-yellow-600">
              Some features may be limited. We'll sync when you're back online.
            </p>
          </div>
        </div>
      )}

      {/* Bottom Navigation */}
      <div className="fixed bottom-0 left-0 right-0 bg-white border-t shadow-lg">
        <div className="grid grid-cols-5 gap-1">
          {[
            { icon: '🏠', label: 'Home' },
            { icon: '🔍', label: 'Search' },
            { icon: '📊', label: 'Analytics' },
            { icon: '🛒', label: 'Cart' },
            { icon: '👤', label: 'Profile' }
          ].map((item, index) => (
            <button
              key={index}
              className="p-3 text-center hover:bg-gray-50"
              onClick={vibrate}
            >
              <div className="text-lg">{item.icon}</div>
              <div className="text-xs text-gray-600">{item.label}</div>
            </button>
          ))}
        </div>
      </div>

      {/* Spacer for bottom navigation */}
      <div className="h-20"></div>
    </div>
  );
};

export default MobileApp;
