
import React, { useState, useEffect, useCallback } from 'react';
import { KeyboardLayout, KeyboardTheme, KeyConfig } from '../types';
import { QWERTY_LAYOUT, SYMBOLS_LAYOUT } from '../constants';
import { geminiService } from '../services/geminiService';

interface KeyboardProps {
  theme: KeyboardTheme;
  onKeyPress: (key: KeyConfig, isShifted: boolean) => void;
  inputText: string;
  onSuggestionClick: (word: string) => void;
  onAIAction: () => void;
}

const Keyboard: React.FC<KeyboardProps> = ({ 
  theme, 
  onKeyPress, 
  inputText, 
  onSuggestionClick,
  onAIAction 
}) => {
  const [currentLayout, setCurrentLayout] = useState<KeyboardLayout>(KeyboardLayout.QWERTY);
  const [isShifted, setIsShifted] = useState(false);
  const [suggestions, setSuggestions] = useState<string[]>(['I', 'The', 'Hello']);
  const [isLoadingPredictions, setIsLoadingPredictions] = useState(false);

  // Fetch predictions when inputText changes
  useEffect(() => {
    const timer = setTimeout(async () => {
      if (inputText.length > 0) {
        setIsLoadingPredictions(true);
        const preds = await geminiService.getNextWordPredictions(inputText);
        setSuggestions(preds);
        setIsLoadingPredictions(false);
      } else {
        setSuggestions(['I', 'The', 'Hello']);
      }
    }, 600);
    return () => clearTimeout(timer);
  }, [inputText]);

  const handleKeyClick = (key: KeyConfig) => {
    // Basic Haptic Feedback simulation
    if (window.navigator.vibrate) {
      window.navigator.vibrate(10);
    }

    if (key.action === 'switch' && key.targetLayout) {
      setCurrentLayout(key.targetLayout);
    } else if (key.action === 'shift') {
      setIsShifted(!isShifted);
    } else if (key.action === 'ai') {
      onAIAction();
    } else {
      onKeyPress(key, isShifted);
      // Auto-lowercase after character if shifted (mobile behavior)
      if (isShifted && key.action === 'char') {
        setIsShifted(false);
      }
    }
  };

  const getLayoutKeys = () => {
    switch (currentLayout) {
      case KeyboardLayout.SYMBOLS: return SYMBOLS_LAYOUT;
      default: return QWERTY_LAYOUT;
    }
  };

  return (
    <div 
      className="w-full flex flex-col p-1 transition-all duration-300 select-none shadow-2xl"
      style={{ 
        backgroundColor: theme.background, 
        borderTopLeftRadius: '1.5rem', 
        borderTopRightRadius: '1.5rem',
        minHeight: '280px'
      }}
    >
      {/* Suggestion Bar */}
      <div className="flex h-12 w-full items-center justify-around px-4 border-b border-black/5 mb-1">
        {suggestions.map((word, idx) => (
          <button
            key={idx}
            onClick={() => onSuggestionClick(word)}
            className="text-sm font-medium transition-opacity hover:opacity-70 px-4 py-2 truncate max-w-[120px]"
            style={{ color: theme.suggestionText }}
          >
            {word}
          </button>
        ))}
      </div>

      {/* Keys Container */}
      <div className="flex flex-col gap-1 px-1 pb-1">
        {getLayoutKeys().map((row, rowIdx) => (
          <div key={rowIdx} className="flex justify-center gap-1 w-full">
            {row.map((key, keyIdx) => {
              const label = key.action === 'char' && isShifted ? key.label.toUpperCase() : key.label;
              const isAccent = ['enter', 'shift', 'delete', 'switch', 'ai'].includes(key.action);
              
              return (
                <button
                  key={keyIdx}
                  onClick={() => handleKeyClick(key)}
                  className={`
                    relative flex items-center justify-center h-12 active:scale-95 transition-all
                    font-medium shadow-sm active:brightness-90
                  `}
                  style={{
                    flex: key.width || '1',
                    backgroundColor: isAccent ? theme.accent : theme.keyBackground,
                    color: isAccent ? theme.accentText : theme.keyText,
                    borderRadius: theme.borderRadius,
                    fontSize: label.length > 1 ? '0.85rem' : '1.15rem'
                  }}
                >
                  {label}
                  {key.action === 'ai' && (
                    <div className="absolute top-0.5 right-0.5 w-2 h-2 rounded-full bg-blue-500 animate-pulse"></div>
                  )}
                </button>
              );
            })}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Keyboard;
