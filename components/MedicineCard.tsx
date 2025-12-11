import React from 'react';
import type { Medicine } from '../types';
import { PillIcon, ClockIcon, TrashIcon, CheckCircleIcon, SparklesIcon, PencilIcon } from './icons';

interface MedicineCardProps {
  medicine: Medicine;
  onToggleTaken: (id: string) => void;
  onDelete: (id: string) => void;
  onEdit: (medicine: Medicine) => void;
}

const formatTime = (time: string) => {
    if (typeof time !== 'string' || !time.includes(':')) {
        return 'الوقت غير محدد';
    }
    const [hour, minute] = time.split(':');
    const h = parseInt(hour, 10);
    const m = parseInt(minute, 10);

    if (isNaN(h) || isNaN(m)) {
      return 'وقت غير صالح';
    }

    const suffix = h >= 12 ? 'مساءً' : 'صباحًا';
    const adjustedHour = h % 12 || 12; // convert h to 12-hour format
    return `${adjustedHour}:${minute} ${suffix}`;
};

const getFoodRelationText = (relation?: 'before' | 'after' | 'with' | 'any') => {
  switch (relation) {
    case 'before':
      return 'قبل الأكل';
    case 'after':
      return 'بعد الأكل';
    case 'with':
        return 'مع الأكل';
    default:
      return null;
  }
};

export const MedicineCard: React.FC<MedicineCardProps> = ({ medicine, onToggleTaken, onDelete, onEdit }) => {
  const { id, name, dosage, time, taken, foodRelation } = medicine;
  const foodText = getFoodRelationText(foodRelation);


  return (
    <div className={`
      bg-white rounded-xl shadow-lg p-4 flex items-center space-x-4 space-x-reverse transition-all duration-300
      ${taken ? 'opacity-50 bg-slate-100' : 'opacity-100'}
    `}>
      <div className={`flex-shrink-0 w-16 h-16 rounded-full flex items-center justify-center overflow-hidden ${taken ? 'bg-green-200' : 'bg-blue-100'}`}>
        {taken ? <CheckCircleIcon className="w-10 h-10 text-green-600" /> : <PillIcon className="w-10 h-10 text-blue-600" />}
      </div>
      <div className="flex-grow">
        <h3 className={`font-bold text-xl text-slate-800 ${taken ? 'line-through' : ''}`}>{name}</h3>
        <p className={`text-slate-600 font-medium mt-1 ${taken ? 'line-through' : ''}`}>
          الجرعة: {dosage}
        </p>
        <div className="flex items-center space-x-4 space-x-reverse mt-2 text-slate-500 text-sm">
            <div className="flex items-center">
              <ClockIcon className="w-4 h-4 ml-1" />
              <span>{formatTime(time)}</span>
            </div>
            {foodText && (
                <div className="flex items-center">
                    <SparklesIcon className="w-4 h-4 ml-1 text-amber-500" />
                    <span>{foodText}</span>
                </div>
            )}
        </div>
      </div>
      <div className="flex flex-col space-y-2 items-center">
        {!taken && (
          <button 
            onClick={() => onToggleTaken(id)}
            className="bg-green-500 text-white px-4 py-2 rounded-lg font-semibold hover:bg-green-600 transition"
          >
            تم أخذها
          </button>
        )}
        <div className="flex">
            <button 
            onClick={() => onEdit(medicine)}
            className="text-slate-500 hover:text-blue-600 p-2"
            aria-label={`تعديل ${name}`}
            >
            <PencilIcon className="w-6 h-6" />
            </button>
            <button 
            onClick={() => onDelete(id)}
            className="text-red-500 hover:text-red-700 p-2"
            aria-label={`حذف ${name}`}
            >
            <TrashIcon className="w-6 h-6" />
            </button>
        </div>
      </div>
    </div>
  );
};