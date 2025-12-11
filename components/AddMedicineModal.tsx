import React, { useState, FormEvent, useEffect, useCallback } from 'react';
import type { Medicine } from '../types';

interface AddMedicineModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (medicine: Omit<Medicine, 'id' | 'taken'>, id?: string) => void;
  initialData?: Medicine | null;
}

export const AddMedicineModal: React.FC<AddMedicineModalProps> = ({ isOpen, onClose, onSave, initialData }) => {
  const [name, setName] = useState('');
  const [dosage, setDosage] = useState('');
  const [time, setTime] = useState('');
  const [foodRelation, setFoodRelation] = useState<'before' | 'after' | 'with' | 'any'>('any');

  const resetForm = useCallback(() => {
    setName('');
    setDosage('');
    setTime('');
    setFoodRelation('any');
  }, []);

  useEffect(() => {
    if (isOpen) {
      if (initialData) {
        setName(initialData.name);
        setDosage(initialData.dosage);
        setTime(initialData.time);
        setFoodRelation(initialData.foodRelation || 'any');
      } else {
        resetForm();
      }
    }
  }, [initialData, isOpen, resetForm]);

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (!name || !time) {
      alert('الرجاء إدخال اسم الدواء والوقت.');
      return;
    }
    onSave({ name, dosage, time, foodRelation }, initialData?.id);
  };

  if (!isOpen) return null;

  return (
    <div 
      className="fixed inset-0 bg-black bg-opacity-50 z-50 flex justify-center items-center"
      onClick={onClose}
    >
      <div 
        className="bg-white rounded-lg p-8 m-4 w-full max-w-md shadow-2xl overflow-y-auto max-h-[90vh]"
        onClick={e => e.stopPropagation()}
      >
        <h2 className="text-2xl font-bold mb-6 text-center text-slate-800">
          {initialData ? 'تعديل الدواء' : 'إضافة دواء جديد'}
        </h2>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label htmlFor="medicine-name" className="block text-sm font-medium text-slate-700 mb-1">اسم الدواء</label>
            <input type="text" id="medicine-name" value={name} onChange={(e) => setName(e.target.value)} className="w-full px-3 py-2 border border-slate-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500" required />
          </div>
          <div>
            <label htmlFor="dosage" className="block text-sm font-medium text-slate-700 mb-1">الجرعة (مثال: قرص واحد، 5 مل)</label>
            <input type="text" id="dosage" value={dosage} onChange={(e) => setDosage(e.target.value)} className="w-full px-3 py-2 border border-slate-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500" />
          </div>
          <div>
            <label htmlFor="time" className="block text-sm font-medium text-slate-700 mb-1">الوقت</label>
            <input type="time" id="time" value={time} onChange={(e) => setTime(e.target.value)} className="w-full px-3 py-2 border border-slate-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500" required />
          </div>
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-2">تعليمات الأكل</label>
            <div className="flex justify-around items-center bg-slate-100 rounded-lg p-1">
              {(['any', 'before', 'with', 'after'] as const).map((relation) => {
                const labels = { any: 'لا يهم', before: 'قبل الأكل', with: 'مع الأكل', after: 'بعد الأكل' };
                return (
                  <label key={relation} className="flex-1 text-center cursor-pointer text-sm">
                    <input type="radio" name="foodRelation" value={relation} checked={foodRelation === relation} onChange={() => setFoodRelation(relation)} className="sr-only" />
                    <span className={`px-2 py-2 rounded-md block transition-colors duration-200 ${ foodRelation === relation ? 'bg-blue-600 text-white shadow' : 'hover:bg-slate-200' }`}>
                      {labels[relation]}
                    </span>
                  </label>
                );
              })}
            </div>
          </div>
          <div className="flex justify-end gap-4 pt-4">
            <button type="button" onClick={onClose} className="px-6 py-2 rounded-md text-slate-700 bg-slate-100 hover:bg-slate-200">إلغاء</button>
            <button type="submit" className="px-6 py-2 rounded-md text-white bg-blue-600 hover:bg-blue-700">حفظ</button>
          </div>
        </form>
      </div>
    </div>
  );
};