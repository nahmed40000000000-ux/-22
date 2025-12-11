import { useState, useEffect, useCallback } from 'react';
import type { Medicine } from '../types';

const STORAGE_KEY = 'medicines';

export const useMedicines = () => {
  const [medicines, setMedicines] = useState<Medicine[]>(() => {
    try {
      const storedMedicines = window.localStorage.getItem(STORAGE_KEY);
      return storedMedicines ? JSON.parse(storedMedicines) : [];
    } catch (error) {
      console.error('Error reading from localStorage', error);
      return [];
    }
  });

  useEffect(() => {
    try {
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify(medicines));
    } catch (error) {
      console.error('Error writing to localStorage', error);
    }
  }, [medicines]);

  const addMedicine = useCallback((medicine: Omit<Medicine, 'id' | 'taken'>) => {
    const newMedicine: Medicine = {
      ...medicine,
      id: crypto.randomUUID(),
      taken: false,
    };
    setMedicines(prev => [...prev, newMedicine]);
  }, []);

  const updateMedicine = useCallback((id: string, medicineData: Omit<Medicine, 'id' | 'taken'>) => {
    setMedicines(prev => 
      prev.map(med => (med.id === id ? { ...med, ...medicineData } : med))
    );
  }, []);

  const toggleMedicineTaken = useCallback((id: string) => {
    setMedicines(prev =>
      prev.map(med =>
        med.id === id ? { ...med, taken: !med.taken } : med
      )
    );
  }, []);

  const deleteMedicine = useCallback((id: string) => {
    setMedicines(prev => prev.filter(med => med.id !== id));
  }, []);

  return { medicines, addMedicine, updateMedicine, toggleMedicineTaken, deleteMedicine };
};