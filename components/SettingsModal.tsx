import React from 'react';
import type { SoundType } from '../types';
import { PlayIcon } from './icons';

interface SettingsModalProps {
  isOpen: boolean;
  onClose: () => void;
  currentSound: SoundType;
  onSelectSound: (type: SoundType) => void;
  onPreviewSound: (type: SoundType) => void;
}

const SOUND_OPTIONS: { id: SoundType; label: string; desc: string }[] = [
  { id: 'alarm', label: 'المنبه (الافتراضي)', desc: 'نغمة تنبيه قوية ومتكررة' },
  { id: 'chime', label: 'جرس', desc: 'صوت جرس هادئ ومريح' },
  { id: 'digital', label: 'رقمي', desc: 'نغمة إلكترونية قصيرة' },
  { id: 'gentle', label: 'هادئ', desc: 'موجة صوتية ناعمة' },
];

export const SettingsModal: React.FC<SettingsModalProps> = ({ 
  isOpen, 
  onClose, 
  currentSound, 
  onSelectSound, 
  onPreviewSound 
}) => {
  if (!isOpen) return null;

  return (
    <div 
      className="fixed inset-0 bg-black bg-opacity-50 z-50 flex justify-center items-center p-4 transition-opacity duration-300"
      onClick={onClose}
    >
      <div 
        className="bg-white rounded-2xl w-full max-w-md shadow-2xl overflow-hidden transform transition-all scale-100"
        onClick={e => e.stopPropagation()}
      >
        <div className="p-6 border-b border-slate-100">
          <h2 className="text-xl font-bold text-slate-800">الإعدادات</h2>
          <p className="text-sm text-slate-500 mt-1">اختر نغمة التنبيه المفضلة لديك</p>
        </div>
        
        <div className="p-4 space-y-3 max-h-[60vh] overflow-y-auto">
          {SOUND_OPTIONS.map((option) => (
            <div 
              key={option.id}
              className={`
                flex items-center justify-between p-4 rounded-xl border-2 transition-all cursor-pointer
                ${currentSound === option.id 
                  ? 'border-blue-600 bg-blue-50' 
                  : 'border-slate-100 hover:border-slate-200 bg-white'}
              `}
              onClick={() => onSelectSound(option.id)}
            >
              <div className="flex items-center gap-4">
                <div className={`
                  w-6 h-6 rounded-full border-2 flex items-center justify-center flex-shrink-0
                  ${currentSound === option.id ? 'border-blue-600' : 'border-slate-300'}
                `}>
                  {currentSound === option.id && <div className="w-3 h-3 bg-blue-600 rounded-full" />}
                </div>
                <div>
                  <h3 className={`font-bold ${currentSound === option.id ? 'text-blue-900' : 'text-slate-700'}`}>
                    {option.label}
                  </h3>
                  <p className="text-xs text-slate-500">{option.desc}</p>
                </div>
              </div>

              <button
                onClick={(e) => {
                  e.stopPropagation();
                  onPreviewSound(option.id);
                }}
                className="p-2 text-blue-600 hover:bg-blue-100 rounded-full transition-colors flex-shrink-0"
                title="تجربة الصوت"
              >
                <PlayIcon className="w-6 h-6" />
              </button>
            </div>
          ))}
        </div>

        <div className="p-6 bg-slate-50 border-t border-slate-100 flex justify-end">
          <button 
            onClick={onClose}
            className="bg-blue-600 text-white px-8 py-2.5 rounded-lg font-bold hover:bg-blue-700 transition shadow-md"
          >
            حفظ وإغلاق
          </button>
        </div>
      </div>
    </div>
  );
};