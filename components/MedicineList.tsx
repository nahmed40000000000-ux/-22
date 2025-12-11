import React, { useMemo } from 'react';
import type { Medicine } from '../types';
import { MedicineCard } from './MedicineCard';
import { EmptyState } from './EmptyState';

interface MedicineListProps {
  medicines: Medicine[];
  onToggleTaken: (id: string) => void;
  onDelete: (id: string) => void;
  onEdit: (medicine: Medicine) => void;
  onAdd: () => void;
}

export const MedicineList: React.FC<MedicineListProps> = ({ medicines, onToggleTaken, onDelete, onEdit, onAdd }) => {

  const sortedMedicines = useMemo(() => {
    return [...medicines].sort((a, b) => a.time.localeCompare(b.time));
  }, [medicines]);

  if (medicines.length === 0) {
    return <EmptyState onAdd={onAdd} />;
  }

  return (
    <div className="space-y-4">
      {sortedMedicines.map(medicine => (
        <MedicineCard 
          key={medicine.id} 
          medicine={medicine}
          onToggleTaken={onToggleTaken}
          onDelete={onDelete}
          onEdit={onEdit}
        />
      ))}
    </div>
  );
};