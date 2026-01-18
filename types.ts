
export enum KeyboardLayout {
  QWERTY = 'QWERTY',
  SYMBOLS = 'SYMBOLS',
  NUMBERS = 'NUMBERS'
}

export interface KeyboardTheme {
  id: string;
  name: string;
  background: string;
  keyBackground: string;
  keyText: string;
  accent: string;
  accentText: string;
  suggestionText: string;
  borderRadius: string;
}

export interface Prediction {
  word: string;
  confidence: number;
}

export type KeyAction = 'char' | 'delete' | 'shift' | 'space' | 'enter' | 'switch' | 'ai' | 'emoji';

export interface KeyConfig {
  label: string;
  value?: string;
  action: KeyAction;
  width?: string;
  icon?: string;
  targetLayout?: KeyboardLayout;
}
