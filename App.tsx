import React, { useState, useEffect, useCallback } from 'react';
import { Header } from './components/Header';
import { MedicineList } from './components/MedicineList';
import { AddMedicineModal } from './components/AddMedicineModal';
import { SettingsModal } from './components/SettingsModal';
import { PlusIcon } from './components/icons';
import { useMedicines } from './hooks/useMedicines';
import { useNotifications } from './hooks/useNotifications';
import { useSettings } from './hooks/useSettings';
import type { Medicine } from './types';

const App: React.FC = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);
  const [editingMedicine, setEditingMedicine] = useState<Medicine | null>(null);
  
  const { medicines, addMedicine, updateMedicine, toggleMedicineTaken, deleteMedicine } = useMedicines();
  const { soundType, setSoundType } = useSettings();
  const { scheduleNotifications, cancelAllNotifications, playPreview } = useNotifications(soundType);

  useEffect(() => {
    cancelAllNotifications();
    scheduleNotifications(medicines.filter(m => !m.taken));
  }, [medicines, scheduleNotifications, cancelAllNotifications]);

  const handleOpenAddModal = () => {
    setEditingMedicine(null);
    setIsModalOpen(true);
  };

  const handleOpenEditModal = (medicine: Medicine) => {
    setEditingMedicine(medicine);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setEditingMedicine(null);
  };

  const handleSaveMedicine = useCallback((medicineData: Omit<Medicine, 'id' | 'taken'>, id?: string) => {
    if (id) {
      updateMedicine(id, medicineData);
    } else {
      addMedicine(medicineData);
    }
    handleCloseModal();
  }, [addMedicine, updateMedicine]);

  return (
    <div className="min-h-screen bg-slate-50 text-slate-800">
      <Header onOpenSettings={() => setIsSettingsOpen(true)} />
      <main className="container mx-auto p-4 pb-24">
        <MedicineList 
          medicines={medicines} 
          onToggleTaken={toggleMedicineTaken} 
          onDelete={deleteMedicine}
          onEdit={handleOpenEditModal}
          onAdd={handleOpenAddModal}
        />
      </main>

      {medicines.length > 0 && (
        <div className="fixed bottom-6 left-6">
          <button
            onClick={handleOpenAddModal}
            className="bg-blue-600 text-white rounded-full p-4 shadow-lg hover:bg-blue-700 focus:outline-none focus:ring-4 focus:ring-blue-300 transition-transform duration-200 ease-in-out hover:scale-110"
            aria-label="إضافة دواء جديد"
          >
            <PlusIcon className="w-8 h-8" />
          </button>
        </div>
      )}

      <AddMedicineModal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        onSave={handleSaveMedicine}
        initialData={editingMedicine}
      />

      <SettingsModal 
        isOpen={isSettingsOpen}
        onClose={() => setIsSettingsOpen(false)}
        currentSound={soundType}
        onSelectSound={setSoundType}
        onPreviewSound={playPreview}
      />
    </div>
  );
};

export default App;
