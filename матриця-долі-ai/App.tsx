
import React, { useState, useCallback } from 'react';
import { getDestinyAnalysis } from './services/geminiService';
import { sendEmail, sendTelegramMessage } from './services/notificationService';
import { DESTINY_QUESTIONS } from './constants';
import DestinyForm from './components/DestinyForm';
import ResultDisplay from './components/ResultDisplay';
import Header from './components/Header';
import Loader from './components/Loader';

type AppStep = 'form' | 'result';

const App: React.FC = () => {
  const [name, setName] = useState<string>('');
  const [dob, setDob] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [analysisResult, setAnalysisResult] = useState<string>('');
  const [error, setError] = useState<string>('');
  const [step, setStep] = useState<AppStep>('form');

  const handleSubmit = useCallback(async (event: React.FormEvent) => {
    event.preventDefault();
    if (!name || !dob || !email) {
      setError('Будь ласка, заповніть усі поля.');
      return;
    }
    
    setIsLoading(true);
    setError('');
    setAnalysisResult('');

    try {
      const result = await getDestinyAnalysis(dob, DESTINY_QUESTIONS);
      setAnalysisResult(result);
      setStep('result');

      // These are simulated notifications. In a real app, this would be a secure backend call.
      sendEmail({ name, dob, email });
      sendTelegramMessage(result);
      
    } catch (err: any) {
      setError(`Виникла помилка: ${err.message}. Спробуйте ще раз.`);
      setStep('form');
    } finally {
      setIsLoading(false);
    }
  }, [name, dob, email]);

  const handleReset = () => {
    setName('');
    setDob('');
    setEmail('');
    setAnalysisResult('');
    setError('');
    setStep('form');
  };

  return (
    <div className="min-h-screen bg-slate-900 text-slate-200 font-sans p-4 flex flex-col items-center">
      <div className="w-full max-w-2xl mx-auto">
        <Header />
        {isLoading && <Loader />}
        <main className={`transition-opacity duration-500 ${isLoading ? 'opacity-20' : 'opacity-100'}`}>
          {error && (
            <div className="bg-red-900/50 border border-red-700 text-red-200 px-4 py-3 rounded-lg relative mb-6" role="alert">
              <strong className="font-bold">Помилка!</strong>
              <span className="block sm:inline ml-2">{error}</span>
            </div>
          )}

          {step === 'form' && (
            <DestinyForm
              name={name}
              setName={setName}
              dob={dob}
              setDob={setDob}
              email={email}
              setEmail={setEmail}
              questions={DESTINY_QUESTIONS}
              onSubmit={handleSubmit}
              disabled={isLoading}
            />
          )}

          {step === 'result' && (
            <ResultDisplay
              result={analysisResult}
              onReset={handleReset}
            />
          )}
        </main>
      </div>
    </div>
  );
};

export default App;
