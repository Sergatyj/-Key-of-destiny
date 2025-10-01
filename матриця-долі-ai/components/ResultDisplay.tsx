import React from 'react';

interface ResultDisplayProps {
  result: string;
  onReset: () => void;
}

const ResultDisplay: React.FC<ResultDisplayProps> = ({ result, onReset }) => {
  return (
    <div className="bg-slate-800/50 p-6 md:p-8 rounded-2xl shadow-2xl border border-slate-700 animate-fade-in">
      <h2 className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-indigo-500 mb-6">
        Ваш персональний розбір матриці долі
      </h2>
      <div className="prose prose-invert prose-slate max-w-none text-slate-300 whitespace-pre-wrap">
        {result}
      </div>
      <div className="mt-8 text-sm text-slate-500">
        <p>Це повідомлення також буде надіслано вам у Telegram для зручності.</p>
      </div>
      <div className="mt-8 border-t border-slate-700 pt-6">
        <button
          onClick={onReset}
          className="w-full bg-slate-700 hover:bg-slate-600 text-white font-bold py-3 px-4 rounded-lg transition duration-300"
        >
          Зробити новий розбір
        </button>
      </div>
    </div>
  );
};

// Fix: Added default export to make the component available for default import in App.tsx.
export default ResultDisplay;
