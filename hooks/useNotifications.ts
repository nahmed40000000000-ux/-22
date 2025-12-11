import { useEffect, useRef, useCallback } from 'react';
import type { Medicine, SoundType } from '../types';

export const useNotifications = (soundType: SoundType) => {
  const timeoutIds = useRef<Record<string, number>>({});
  const currentSoundTypeRef = useRef<SoundType>(soundType);

  useEffect(() => {
    currentSoundTypeRef.current = soundType;
  }, [soundType]);

  const requestPermission = useCallback(() => {
    if ('Notification' in window && Notification.permission !== 'granted') {
      Notification.requestPermission();
    }
  }, []);

  useEffect(() => {
    requestPermission();
  }, [requestPermission]);

  const generateSound = useCallback((type: SoundType) => {
    try {
      const AudioContext = window.AudioContext || (window as any).webkitAudioContext;
      if (!AudioContext) return;

      const ctx = new AudioContext();
      const now = ctx.currentTime;
      const duration = 10; // Total duration in seconds

      // Helper to create a single note/tone
      const playOscillator = (
        startTime: number, 
        freq: number, 
        waveType: OscillatorType, 
        durationSec: number,
        envelope: 'pluck' | 'beep' | 'swell'
      ) => {
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        
        osc.connect(gain);
        gain.connect(ctx.destination);
        
        osc.type = waveType;
        osc.frequency.setValueAtTime(freq, startTime);
        
        // Envelope shaping
        gain.gain.setValueAtTime(0, startTime);
        
        if (envelope === 'pluck') {
          // Quick attack, slow decay
          gain.gain.linearRampToValueAtTime(0.5, startTime + 0.05);
          gain.gain.exponentialRampToValueAtTime(0.01, startTime + durationSec);
        } else if (envelope === 'beep') {
          // Sharp attack/decay
          gain.gain.linearRampToValueAtTime(0.5, startTime + 0.05);
          gain.gain.linearRampToValueAtTime(0.5, startTime + durationSec - 0.05);
          gain.gain.linearRampToValueAtTime(0, startTime + durationSec);
        } else if (envelope === 'swell') {
          // Slow attack, slow decay
          gain.gain.linearRampToValueAtTime(0.5, startTime + durationSec / 2);
          gain.gain.linearRampToValueAtTime(0, startTime + durationSec);
        }

        osc.start(startTime);
        osc.stop(startTime + durationSec);
      };

      switch (type) {
        case 'chime':
          // Repeating chime every 2.5 seconds
          for (let i = 0; i < 4; i++) {
            const t = now + (i * 2.5);
            // Fundamental
            playOscillator(t, 523.25, 'sine', 2, 'pluck'); // C5
            // Harmonic
            setTimeout(() => {
               // We use timeout to stagger slightly if needed, but scheduling is better.
               // Just play another osc for harmony directly
            }, 0);
            const osc2 = ctx.createOscillator();
            const gain2 = ctx.createGain();
            osc2.connect(gain2);
            gain2.connect(ctx.destination);
            osc2.type = 'sine';
            osc2.frequency.setValueAtTime(1046.5, t); // C6
            gain2.gain.setValueAtTime(0, t);
            gain2.gain.linearRampToValueAtTime(0.3, t + 0.1); // Slightly delayed peak
            gain2.gain.exponentialRampToValueAtTime(0.01, t + 2);
            osc2.start(t);
            osc2.stop(t + 2);
          }
          break;

        case 'digital':
          // 8-bit pattern repeating
          const patternLen = 1.0;
          const loops = Math.floor(duration / patternLen);
          
          for (let i = 0; i < loops; i++) {
            const t = now + (i * patternLen);
            playOscillator(t, 600, 'square', 0.15, 'beep');
            playOscillator(t + 0.2, 800, 'square', 0.15, 'beep');
            playOscillator(t + 0.4, 600, 'square', 0.15, 'beep');
          }
          break;
        
        case 'gentle':
          // Slow waves
          const swellLen = 3.3;
          for (let i = 0; i < 3; i++) {
             const t = now + (i * swellLen);
             playOscillator(t, 220, 'triangle', swellLen, 'swell'); // A3
             // Add a harmony
             const oscH = ctx.createOscillator();
             const gainH = ctx.createGain();
             oscH.connect(gainH);
             gainH.connect(ctx.destination);
             oscH.type = 'sine';
             oscH.frequency.setValueAtTime(329.63, t); // E4
             gainH.gain.setValueAtTime(0, t);
             gainH.gain.linearRampToValueAtTime(0.3, t + swellLen / 2);
             gainH.gain.linearRampToValueAtTime(0, t + swellLen);
             oscH.start(t);
             oscH.stop(t + swellLen);
          }
          break;

        case 'alarm': 
        default:
          // Standard alarm beep
          const beepLen = 1.0; 
          for (let i = 0; i < 10; i++) {
            const t = now + i;
            // Beep 1
            playOscillator(t, 880, 'triangle', 0.2, 'beep');
            // Beep 2
            playOscillator(t + 0.3, 880, 'triangle', 0.2, 'beep');
          }
          break;
      }

    } catch (error) {
      console.error('Error playing notification sound:', error);
    }
  }, []);

  const playNotificationSound = useCallback(() => {
    generateSound(currentSoundTypeRef.current);
  }, [generateSound]);

  const cancelAllNotifications = useCallback(() => {
    Object.values(timeoutIds.current).forEach((id) => {
      if (typeof id === 'number') {
        window.clearTimeout(id);
      }
    });
    timeoutIds.current = {};
  }, []);

  const scheduleNotifications = useCallback((medicines: Medicine[]) => {
    const now = new Date();
    
    medicines.forEach(medicine => {
      if (!medicine.time || typeof medicine.time !== 'string' || !medicine.time.includes(':')) {
        return;
      }

      const [hours, minutes] = medicine.time.split(':').map(Number);
      if (isNaN(hours) || isNaN(minutes)) return;
      
      const scheduleTime = new Date();
      scheduleTime.setHours(hours, minutes, 0, 0);

      const delay = scheduleTime.getTime() - now.getTime();

      if (delay > 0) {
        const timeoutId = window.setTimeout(() => {
          playNotificationSound();
          
          if (Notification.permission === 'granted') {
            new Notification(`حان وقت جرعتك!`, {
              body: `تناول ${medicine.name} - ${medicine.dosage}`,
              icon: '/vite.svg', 
            });
          }
        }, delay);
        timeoutIds.current[medicine.id] = timeoutId;
      }
    });
  }, [playNotificationSound]);

  return { scheduleNotifications, cancelAllNotifications, playPreview: generateSound };
};