import { useState, useEffect } from 'react';
import type { SoundType } from '../types';

const SETTINGS_KEY = 'app_settings';

export const useSettings = () => {
  const [soundType, setSoundType] = useState<SoundType>(() => {
    try {
      const stored = window.localStorage.getItem(SETTINGS_KEY);
      return stored ? JSON.parse(stored).soundType : 'alarm';
    } catch {
      return 'alarm';
    }
  });

  useEffect(() => {
    try {
      window.localStorage.setItem(SETTINGS_KEY, JSON.stringify({ soundType }));
    } catch (e) {
      console.error('Failed to save settings', e);
    }
  }, [soundType]);

  return { soundType, setSoundType };
};
