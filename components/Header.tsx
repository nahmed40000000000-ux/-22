import React from 'react';
import { BellIcon, CogIcon } from './icons';

interface HeaderProps {
  onOpenSettings: () => void;
}

export const Header: React.FC<HeaderProps> = ({ onOpenSettings }) => {
  return (
    <header className="bg-white shadow-md sticky top-0 z-10">
      <div className="container mx-auto px-4 py-4 flex justify-between items-center">
         <div className="text-blue-600">
             <BellIcon className="w-7 h-7" />
         </div>
         
        <h1 className="text-3xl font-bold text-slate-800">
          جرعتي
        </h1>

        <button 
          onClick={onOpenSettings}
          className="flex items-center gap-2 text-slate-500 hover:text-blue-600 transition-colors px-3 py-2 rounded-lg hover:bg-slate-50"
          aria-label="الإعدادات"
        >
          <span className="font-medium text-sm hidden sm:inline-block">الإعدادات</span>
          <CogIcon className="w-6 h-6" />
        </button>
      </div>
    </header>
  );
};