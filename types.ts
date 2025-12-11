
export interface Medicine {
  id: string;
  name: string;
  dosage: string;
  time: string; // Stored in "HH:mm" 24-hour format
  taken: boolean;
  foodRelation?: 'before' | 'after' | 'with' | 'any';
}

export type SoundType = 'alarm' | 'chime' | 'digital' | 'gentle';
