'use client';
import { useState, useEffect } from 'react';

interface OrientationData {
  beta: number | null;
  gamma: number | null;
}

type PermissionState = 'auto' | 'pending' | 'granted' | 'denied';

export function useDeviceOrientation() {
  const [orientation, setOrientation] = useState<OrientationData>({ beta: null, gamma: null });
  const [permission, setPermission] = useState<PermissionState>('pending');
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    if (typeof window === 'undefined') return;

    const mobile = window.matchMedia('(max-width: 767px)').matches;
    setIsMobile(mobile);

    if (!mobile || !window.DeviceOrientationEvent) {
      setPermission('denied');
      return;
    }

    // iOS 13+ requires explicit permission
    if (typeof (DeviceOrientationEvent as { requestPermission?: () => Promise<string> }).requestPermission === 'function') {
      setPermission('pending'); // needs user tap
    } else {
      setPermission('granted'); // Android / other — works immediately
    }
  }, []);

  useEffect(() => {
    if (permission !== 'granted') return;

    const handler = (e: DeviceOrientationEvent) => {
      setOrientation({ beta: e.beta, gamma: e.gamma });
    };
    window.addEventListener('deviceorientation', handler, true);
    return () => window.removeEventListener('deviceorientation', handler, true);
  }, [permission]);

  const requestPermission = async () => {
    const iOS = DeviceOrientationEvent as { requestPermission?: () => Promise<string> };
    if (typeof iOS.requestPermission === 'function') {
      try {
        const result = await iOS.requestPermission();
        setPermission(result === 'granted' ? 'granted' : 'denied');
      } catch {
        setPermission('denied');
      }
    }
  };

  return { orientation, permission, isMobile, requestPermission };
}
