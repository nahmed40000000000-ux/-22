
import React from 'react';
import { PlusIcon } from './icons';

interface EmptyStateProps {
  onAdd: () => void;
}

export const EmptyState: React.FC<EmptyStateProps> = ({ onAdd }) => {
  return (
    <div className="flex flex-col items-center justify-center py-16 px-4">
      <div className="w-64 h-64 mb-8 relative">
        <svg viewBox="0 0 200 200" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full drop-shadow-xl">
          {/* Background Blob */}
          <path d="M44.6,-56.3C57.7,-43.3,68.4,-28.6,71.2,-13.1C74,2.5,69,18.9,59.2,32.4C49.3,45.9,34.7,56.5,19.2,62.1C3.7,67.7,-12.7,68.3,-27.2,61.8C-41.7,55.3,-54.3,41.7,-60.8,26.4C-67.3,11.1,-67.7,-5.9,-60.9,-19.9C-54.1,-33.9,-40.1,-44.9,-26.3,-57.4C-12.5,-69.9,1.1,-83.9,14.6,-83.9C28.1,-83.9,41.5,-69.9,44.6,-56.3Z" transform="translate(100 100)" fill="#DBEAFE" />
          
          {/* Medicine Bottle */}
          <rect x="70" y="80" width="60" height="80" rx="8" fill="#FFFFFF" stroke="#2563EB" strokeWidth="3" />
          <path d="M70 88H130" stroke="#2563EB" strokeWidth="3" />
          {/* Label */}
          <rect x="78" y="100" width="44" height="40" rx="4" fill="#EFF6FF" />
          <path d="M86 115H114" stroke="#93C5FD" strokeWidth="3" strokeLinecap="round"/>
          <path d="M86 125H104" stroke="#93C5FD" strokeWidth="3" strokeLinecap="round"/>
          
          {/* Cap */}
          <rect x="65" y="60" width="70" height="20" rx="4" fill="#2563EB" />
          <path d="M70 60V80" stroke="#1D4ED8" strokeWidth="2" opacity="0.3" />
          <path d="M80 60V80" stroke="#1D4ED8" strokeWidth="2" opacity="0.3" />
          <path d="M90 60V80" stroke="#1D4ED8" strokeWidth="2" opacity="0.3" />
          <path d="M100 60V80" stroke="#1D4ED8" strokeWidth="2" opacity="0.3" />
          <path d="M110 60V80" stroke="#1D4ED8" strokeWidth="2" opacity="0.3" />
          <path d="M120 60V80" stroke="#1D4ED8" strokeWidth="2" opacity="0.3" />

          {/* Floating Pills */}
          <g transform="rotate(30, 150, 70)">
             <rect x="140" y="60" width="30" height="14" rx="7" fill="#F87171" stroke="#EF4444" strokeWidth="2"/>
             <path d="M155 60V74" stroke="#EF4444" strokeWidth="2"/>
          </g>
          <g transform="rotate(-15, 50, 140)">
             <circle cx="50" cy="140" r="10" fill="#FCD34D" stroke="#F59E0B" strokeWidth="2"/>
             <path d="M43 140H57" stroke="#F59E0B" strokeWidth="2"/>
          </g>
           <g transform="rotate(45, 150, 150)">
             <rect x="140" y="140" width="24" height="12" rx="6" fill="#34D399" stroke="#10B981" strokeWidth="2"/>
             <path d="M152 140V152" stroke="#10B981" strokeWidth="2"/>
          </g>
        </svg>
      </div>
      
      <h2 className="text-2xl font-bold text-slate-800 mb-3">قائمة الأدوية فارغة</h2>
      <p className="text-slate-500 mb-8 text-center max-w-xs leading-relaxed">
        لم تقم بإضافة أي أدوية بعد. ابدأ الآن بتنظيم جدولك الصحي لتلقي التنبيهات في موعدها.
      </p>
      
      <button
          onClick={onAdd}
          className="flex items-center space-x-2 space-x-reverse bg-blue-600 text-white px-6 py-3 rounded-xl font-semibold shadow-lg hover:bg-blue-700 transition-transform active:scale-95"
      >
        <PlusIcon className="w-6 h-6" />
        <span>إضافة أول دواء</span>
      </button>
    </div>
  );
};
