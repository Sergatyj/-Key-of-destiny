
import React from 'react';

interface DestinyFormProps {
  name: string;
  setName: (value: string) => void;
  dob: string;
  setDob: (value: string) => void;
  email: string;
  setEmail: (value: string) => void;
  questions: string[];
  onSubmit: (event: React.FormEvent) => void;
  disabled: boolean;
}

const DestinyForm: React.FC<DestinyFormProps> = ({
  name,
  setName,
  dob,
  setDob,
  email,
  setEmail,
  questions,
  onSubmit,
  disabled,
}) => {
  const inputStyles = "w-full px-4 py-3 bg-slate-800 border border-slate-700 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition duration-200 placeholder-slate-500";
  const labelStyles = "block text-sm font-medium text-slate-400 mb-2";

  return (
    <div className="bg-slate-800/50 p-6 md:p-8 rounded-2xl shadow-2xl border border-slate-700">
      <form onSubmit={onSubmit} className="space-y-6">
        <div>
          <label htmlFor="name" className={labelStyles}>Ваше Ім'я</label>
          <input
            id="name"
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Наприклад, Олена"
            required
            className={inputStyles}
            disabled={disabled}
          />
        </div>

        <div>
          <label htmlFor="dob" className={labelStyles}>Дата Народження</label>
          <input
            id="dob"
            type="date"
            value={dob}
            onChange={(e) => setDob(e.target.value)}
            required
            className={`${inputStyles} [color-scheme:dark]`}
            disabled={disabled}
          />
        </div>
        
        <div>
          <label htmlFor="email" className={labelStyles}>Ваш Email</label>
          <input
            id="email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="example@email.com"
            required
            className={inputStyles}
            disabled={disabled}
          />
        </div>

        <div className="pt-4">
          <h3 className="text-lg font-semibold text-slate-300 mb-4">Ваш розбір буде містити відповіді на питання:</h3>
          <ul className="space-y-2 text-slate-400 text-sm list-disc list-inside">
            {questions.map((q, index) => <li key={index}>{q}</li>)}
          </ul>
        </div>
        
        <div className="pt-4">
          <button
            type="submit"
            disabled={disabled}
            className="w-full bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 text-white font-bold py-3 px-4 rounded-lg transition duration-300 ease-in-out transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
          >
            Отримати Розбір
          </button>
        </div>
      </form>
    </div>
  );
};

export default DestinyForm;
