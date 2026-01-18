
import React, { useState } from 'react';
import { KeyboardTheme } from '../types';
import { THEMES } from '../constants';
import { geminiService } from '../services/geminiService';

interface SettingsProps {
  currentTheme: KeyboardTheme;
  onThemeSelect: (theme: KeyboardTheme) => void;
  onCustomTheme: (theme: Partial<KeyboardTheme>) => void;
}

const Settings: React.FC<SettingsProps> = ({ currentTheme, onThemeSelect, onCustomTheme }) => {
  const [prompt, setPrompt] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);

  const handleGenerateTheme = async () => {
    if (!prompt.trim()) return;
    setIsGenerating(true);
    const theme = await geminiService.generateThemeFromPrompt(prompt);
    if (theme) {
      onCustomTheme(theme);
    }
    setIsGenerating(false);
  };

  return (
    <div className="p-6 bg-white rounded-3xl shadow-lg h-full overflow-y-auto">
      <h2 className="text-2xl font-bold mb-6 text-gray-800">Keyboard Designer</h2>
      
      <section className="mb-8">
        <h3 className="text-sm font-semibold text-gray-500 uppercase tracking-wider mb-4">Presets</h3>
        <div className="grid grid-cols-2 gap-3">
          {THEMES.map(theme => (
            <button
              key={theme.id}
              onClick={() => onThemeSelect(theme)}
              className={`p-4 rounded-2xl border-2 transition-all text-left ${
                currentTheme.id === theme.id ? 'border-blue-500 bg-blue-50' : 'border-gray-100 hover:border-blue-200'
              }`}
            >
              <div 
                className="w-full h-8 rounded-lg mb-2 border border-black/5" 
                style={{ backgroundColor: theme.background }}
              >
                <div className="flex gap-1 p-1 h-full">
                  <div className="w-1/4 h-full rounded bg-white/50" />
                  <div className="w-1/4 h-full rounded bg-white/50" />
                  <div className="w-1/4 h-full rounded" style={{ backgroundColor: theme.accent }} />
                </div>
              </div>
              <span className="text-sm font-medium text-gray-700">{theme.name}</span>
            </button>
          ))}
        </div>
      </section>

      <section className="mb-8">
        <h3 className="text-sm font-semibold text-gray-500 uppercase tracking-wider mb-4">AI Theme Generator</h3>
        <div className="flex flex-col gap-3">
          <textarea
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
            placeholder="Describe a theme (e.g., 'Sunset in Tokyo' or 'Green Forest Minimalist')"
            className="w-full p-4 rounded-2xl border border-gray-200 focus:ring-2 focus:ring-blue-500 outline-none resize-none text-sm h-24"
          />
          <button
            onClick={handleGenerateTheme}
            disabled={isGenerating || !prompt.trim()}
            className="w-full py-3 px-6 bg-blue-600 hover:bg-blue-700 disabled:bg-gray-400 text-white rounded-2xl font-semibold transition-all flex items-center justify-center gap-2"
          >
            {isGenerating ? (
              <>
                <div className="animate-spin h-4 w-4 border-2 border-white border-t-transparent rounded-full" />
                Designing...
              </>
            ) : (
              'Generate with AI'
            )}
          </button>
        </div>
      </section>

      <section>
        <h3 className="text-sm font-semibold text-gray-500 uppercase tracking-wider mb-4">Quick Tweaks</h3>
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <span className="text-sm text-gray-600">Roundness</span>
            <input 
              type="range" 
              min="0" 
              max="24" 
              className="accent-blue-600"
              onChange={(e) => onCustomTheme({ borderRadius: `${e.target.value}px` })}
            />
          </div>
          <div className="flex items-center justify-between">
            <span className="text-sm text-gray-600">Main Color</span>
            <input 
              type="color" 
              value={currentTheme.background}
              onChange={(e) => onCustomTheme({ background: e.target.value })}
              className="w-8 h-8 rounded-full border-none cursor-pointer"
            />
          </div>
        </div>
      </section>
    </div>
  );
};

export default Settings;
