
import React from 'react';
import { KeyboardTheme, KeyboardLayout, KeyConfig } from './types';

export const THEMES: KeyboardTheme[] = [
  {
    id: 'material-you',
    name: 'Material You',
    background: '#F7F2FA',
    keyBackground: '#FEF7FF',
    keyText: '#1D1B20',
    accent: '#D0BCFF',
    accentText: '#381E72',
    suggestionText: '#6750A4',
    borderRadius: '1.5rem'
  },
  {
    id: 'dark-mode',
    name: 'Android Dark',
    background: '#1C1B1F',
    keyBackground: '#2B2930',
    keyText: '#E6E1E5',
    accent: '#D0BCFF',
    accentText: '#381E72',
    suggestionText: '#D0BCFF',
    borderRadius: '0.5rem'
  },
  {
    id: 'pixel-blue',
    name: 'Pixel Blue',
    background: '#E3F2FD',
    keyBackground: '#FFFFFF',
    keyText: '#0D47A1',
    accent: '#2196F3',
    accentText: '#FFFFFF',
    suggestionText: '#1976D2',
    borderRadius: '0.75rem'
  },
  {
    id: 'cyberpunk',
    name: 'Neon Night',
    background: '#0D0221',
    keyBackground: '#1A0B2E',
    keyText: '#00F5FF',
    accent: '#FF00FF',
    accentText: '#FFFFFF',
    suggestionText: '#FFD700',
    borderRadius: '0.25rem'
  }
];

export const QWERTY_LAYOUT: KeyConfig[][] = [
  [
    { label: 'q', action: 'char' }, { label: 'w', action: 'char' }, { label: 'e', action: 'char' },
    { label: 'r', action: 'char' }, { label: 't', action: 'char' }, { label: 'y', action: 'char' },
    { label: 'u', action: 'char' }, { label: 'i', action: 'char' }, { label: 'o', action: 'char' },
    { label: 'p', action: 'char' }
  ],
  [
    { label: 'a', action: 'char' }, { label: 's', action: 'char' }, { label: 'd', action: 'char' },
    { label: 'f', action: 'char' }, { label: 'g', action: 'char' }, { label: 'h', action: 'char' },
    { label: 'j', action: 'char' }, { label: 'k', action: 'char' }, { label: 'l', action: 'char' }
  ],
  [
    { label: '⇧', action: 'shift', width: '1.5' }, { label: 'z', action: 'char' }, { label: 'x', action: 'char' },
    { label: 'c', action: 'char' }, { label: 'v', action: 'char' }, { label: 'b', action: 'char' },
    { label: 'n', action: 'char' }, { label: 'm', action: 'char' }, { label: '⌫', action: 'delete', width: '1.5' }
  ],
  [
    { label: '?123', action: 'switch', targetLayout: KeyboardLayout.SYMBOLS, width: '1.5' },
    { label: 'AI', action: 'ai' },
    { label: ' ', action: 'space', width: '4' },
    { label: '.', action: 'char' },
    { label: '↵', action: 'enter', width: '1.5' }
  ]
];

export const SYMBOLS_LAYOUT: KeyConfig[][] = [
  [
    { label: '1', action: 'char' }, { label: '2', action: 'char' }, { label: '3', action: 'char' },
    { label: '4', action: 'char' }, { label: '5', action: 'char' }, { label: '6', action: 'char' },
    { label: '7', action: 'char' }, { label: '8', action: 'char' }, { label: '9', action: 'char' },
    { label: '0', action: 'char' }
  ],
  [
    { label: '@', action: 'char' }, { label: '#', action: 'char' }, { label: '$', action: 'char' },
    { label: '_', action: 'char' }, { label: '&', action: 'char' }, { label: '-', action: 'char' },
    { label: '+', action: 'char' }, { label: '(', action: 'char' }, { label: ')', action: 'char' }
  ],
  [
    { label: '=*<', action: 'switch', targetLayout: KeyboardLayout.NUMBERS, width: '1.5' },
    { label: '*', action: 'char' }, { label: '"', action: 'char' }, { label: '\'', action: 'char' },
    { label: ':', action: 'char' }, { label: ';', action: 'char' }, { label: '!', action: 'char' },
    { label: '?', action: 'char' }, { label: '⌫', action: 'delete', width: '1.5' }
  ],
  [
    { label: 'ABC', action: 'switch', targetLayout: KeyboardLayout.QWERTY, width: '1.5' },
    { label: ',', action: 'char' },
    { label: ' ', action: 'space', width: '4' },
    { label: '.', action: 'char' },
    { label: '↵', action: 'enter', width: '1.5' }
  ]
];
