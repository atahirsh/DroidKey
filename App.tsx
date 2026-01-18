
import React, { useState, useRef, useEffect } from 'react';
import Keyboard from './components/Keyboard';
import Settings from './components/Settings';
import { KeyboardTheme, KeyConfig } from './types';
import { THEMES } from './constants';
import { geminiService } from './services/geminiService';

const App: React.FC = () => {
  const [theme, setTheme] = useState<KeyboardTheme>(THEMES[0]);
  const [inputText, setInputText] = useState('');
  const [isAiProcessing, setIsAiProcessing] = useState(false);
  const inputRef = useRef<HTMLTextAreaElement>(null);

  // Auto-focus the input on mount
  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  const handleKeyPress = (key: KeyConfig, isShifted: boolean) => {
    switch (key.action) {
      case 'char':
        const char = isShifted ? key.label.toUpperCase() : key.label;
        setInputText(prev => prev + char);
        break;
      case 'space':
        setInputText(prev => prev + ' ');
        break;
      case 'delete':
        setInputText(prev => prev.slice(0, -1));
        break;
      case 'enter':
        setInputText(prev => prev + '\n');
        break;
      default:
        break;
    }
    // Always keep focus to avoid keyboard dismiss feel
    inputRef.current?.focus();
  };

  const handleSuggestionClick = (word: string) => {
    setInputText(prev => {
      const lastSpaceIndex = prev.lastIndexOf(' ');
      const prefix = lastSpaceIndex === -1 ? '' : prev.substring(0, lastSpaceIndex + 1);
      return prefix + word + ' ';
    });
    inputRef.current?.focus();
  };

  const handleAIAction = async () => {
    if (!inputText.trim()) return;
    setIsAiProcessing(true);
    const help = await geminiService.assistantHelp(inputText);
    setInputText(help);
    setIsAiProcessing(false);
    inputRef.current?.focus();
  };

  const updateTheme = (newTheme: Partial<KeyboardTheme>) => {
    setTheme(prev => ({ ...prev, ...newTheme }));
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col md:flex-row items-center justify-center p-4 gap-8">
      {/* Phone Mockup Area */}
      <div className="relative w-full max-w-[400px] h-[800px] bg-black rounded-[3rem] p-3 shadow-2xl border-[8px] border-gray-800 overflow-hidden flex flex-col">
        {/* Status Bar */}
        <div className="flex justify-between items-center px-8 py-4 text-white text-xs font-medium">
          <span>9:41</span>
          <div className="flex gap-2">
            <span>📶</span>
            <span>🔋</span>
          </div>
        </div>

        {/* Messaging App UI */}
        <div className="flex-1 bg-white rounded-t-3xl p-4 flex flex-col">
          <header className="flex items-center gap-3 mb-6 border-b pb-4">
            <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center text-blue-600 font-bold">G</div>
            <div>
              <h3 className="font-bold text-gray-800">Gemini Chat</h3>
              <p className="text-xs text-green-500">Online</p>
            </div>
          </header>

          <div className="flex-1 overflow-y-auto space-y-4">
            <div className="bg-gray-100 p-3 rounded-2xl rounded-tl-none text-sm max-w-[80%]">
              Hello! Use the custom keyboard below to type. Try the AI predictions or the theme generator!
            </div>
            {inputText && (
              <div className="bg-blue-600 text-white p-3 rounded-2xl rounded-tr-none text-sm self-end ml-auto max-w-[80%] break-words">
                {inputText}
              </div>
            )}
          </div>

          {/* Text Input Field */}
          <div className="mt-4 mb-2 relative">
            <textarea
              ref={inputRef}
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              className="w-full bg-gray-100 rounded-2xl p-4 pr-12 text-sm outline-none resize-none border-2 border-transparent focus:border-blue-500 transition-all h-32"
              placeholder="Start typing..."
              readOnly={false} // Allow real typing too if needed, but keyboard handles it
            />
            {isAiProcessing && (
              <div className="absolute top-4 right-4 animate-spin h-5 w-5 border-2 border-blue-500 border-t-transparent rounded-full" />
            )}
          </div>
        </div>

        {/* The Keyboard */}
        <div className="mt-auto">
          <Keyboard 
            theme={theme} 
            onKeyPress={handleKeyPress}
            inputText={inputText}
            onSuggestionClick={handleSuggestionClick}
            onAIAction={handleAIAction}
          />
        </div>

        {/* Bottom Bar */}
        <div className="h-6 w-full flex items-center justify-center pb-2 bg-transparent" style={{ backgroundColor: theme.background }}>
           <div className="w-32 h-1 bg-black/20 rounded-full" />
        </div>
      </div>

      {/* Control Panel / Designer */}
      <div className="w-full max-w-[500px] h-[800px]">
        <Settings 
          currentTheme={theme} 
          onThemeSelect={setTheme} 
          onCustomTheme={updateTheme}
        />
      </div>

      {/* Floating Info Overlay */}
      <div className="fixed bottom-6 right-6 flex flex-col gap-2">
         <div className="bg-white/80 backdrop-blur-md p-4 rounded-2xl shadow-lg border border-gray-100 max-w-xs text-xs text-gray-600">
            <strong>Pro Tip:</strong> Use the <strong>AI</strong> key on the keyboard to have Gemini refine your sentences!
         </div>
      </div>
    </div>
  );
};

export default App;
