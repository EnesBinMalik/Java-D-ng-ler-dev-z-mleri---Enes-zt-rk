import React, { useState } from 'react';
import { QUIZ_QUESTIONS } from '../data/quizData';
import { CheckCircle2, XCircle, RotateCcw, HelpCircle, Award, ArrowRight } from 'lucide-react';

export const QuizTab: React.FC = () => {
  const [selectedAnswers, setSelectedAnswers] = useState<Record<number, number>>({});
  const [showResults, setShowResults] = useState<boolean>(false);

  const handleSelectOption = (questionId: number, optionIndex: number) => {
    if (showResults) return; // Prevent changing after submission
    setSelectedAnswers((prev) => ({
      ...prev,
      [questionId]: optionIndex
    }));
  };

  const calculateScore = () => {
    let score = 0;
    QUIZ_QUESTIONS.forEach((q) => {
      if (selectedAnswers[q.id] === q.correctIndex) {
        score++;
      }
    });
    return score;
  };

  const handleReset = () => {
    setSelectedAnswers({});
    setShowResults(false);
  };

  const totalAnswered = Object.keys(selectedAnswers).length;
  const score = calculateScore();

  return (
    <div className="space-y-8">
      {/* Header */}
      <section className="bg-gradient-to-b from-slate-900 to-slate-900/60 border border-slate-800 rounded-2xl p-6 sm:p-8">
        <div className="max-w-3xl">
          <div className="flex items-center gap-2 text-xs font-mono text-rose-400 mb-2">
            <span>Öğrenme & Değerlendirme</span>
            <span aria-hidden="true">·</span>
            <span>Kendini Sına</span>
            <span aria-hidden="true">·</span>
            <span className="text-slate-300">Enes Öztürk</span>
          </div>

          <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-white mb-3 text-balance">
            Java Döngüler & Modulo Bilgini Test Et
          </h1>

          <p className="text-sm sm:text-base text-slate-300 leading-relaxed">
            Java'da döngü mantığı, mod (%) operatörü, tip dönüşümleri (casting) ve sınır kontrolleri üzerine 
            hazırlanan bu 4 soruluk pratik test ile ödev konusunu pekiştirin.
          </p>
        </div>
      </section>

      {/* Quiz Progress & Score Card */}
      <div className="flex flex-col sm:flex-row items-center justify-between p-4 bg-slate-900 border border-slate-800 rounded-xl gap-4">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-lg bg-rose-500/10 border border-rose-500/20 flex items-center justify-center text-rose-400 font-mono font-bold">
            ?
          </div>
          <div>
            <span className="text-xs text-slate-400 block">İlerleme Durumu</span>
            <span className="text-sm font-bold text-white">
              {totalAnswered} / {QUIZ_QUESTIONS.length} Soru Cevaplandı
            </span>
          </div>
        </div>

        <div className="flex items-center gap-3">
          {!showResults ? (
            <button
              onClick={() => setShowResults(true)}
              disabled={totalAnswered === 0}
              className="px-4 py-2 text-xs font-semibold rounded-lg bg-amber-500 text-slate-950 hover:bg-amber-400 disabled:opacity-40 disabled:cursor-not-allowed transition-all cursor-pointer"
            >
              Testi Bitir ve Değerlendir
            </button>
          ) : (
            <div className="flex items-center gap-3">
              <span className="text-xs font-mono text-slate-300">
                Başarı: <strong className="text-amber-400">{score} / {QUIZ_QUESTIONS.length}</strong>
              </span>
              <button
                onClick={handleReset}
                className="flex items-center gap-1.5 px-3 py-2 text-xs font-semibold rounded-lg bg-slate-800 text-slate-200 hover:bg-slate-700 transition-colors"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                <span>Tekrar Çöz</span>
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Questions List */}
      <div className="space-y-6">
        {QUIZ_QUESTIONS.map((q, index) => {
          const userChoice = selectedAnswers[q.id];
          const isAnswered = userChoice !== undefined;
          const isCorrect = userChoice === q.correctIndex;

          return (
            <div
              key={q.id}
              className="bg-slate-900/90 border border-slate-800 rounded-xl p-5 sm:p-6 space-y-4"
            >
              <div className="flex items-start justify-between gap-4">
                <span className="text-xs font-mono font-bold text-amber-400 uppercase tracking-wider">
                  Soru {index + 1}
                </span>
                {showResults && (
                  <span className={`text-xs font-semibold flex items-center gap-1 ${
                    isCorrect ? 'text-emerald-400' : 'text-rose-400'
                  }`}>
                    {isCorrect ? (
                      <>
                        <CheckCircle2 className="w-4 h-4" />
                        <span>Doğru</span>
                      </>
                    ) : (
                      <>
                        <XCircle className="w-4 h-4" />
                        <span>Yanlış</span>
                      </>
                    )}
                  </span>
                )}
              </div>

              <h2 className="text-sm sm:text-base font-semibold text-white leading-relaxed">
                {q.question}
              </h2>

              {q.codeSnippet && (
                <pre className="p-3 bg-slate-950 border border-slate-800 rounded-lg font-mono text-xs text-amber-300 overflow-x-auto">
                  {q.codeSnippet}
                </pre>
              )}

              {/* Options */}
              <div className="space-y-2 pt-2">
                {q.options.map((option, optIdx) => {
                  const isSelected = userChoice === optIdx;
                  let optionStyles = 'border-slate-800 bg-slate-950 text-slate-300 hover:border-slate-700';

                  if (showResults) {
                    if (optIdx === q.correctIndex) {
                      optionStyles = 'border-emerald-500/80 bg-emerald-950/30 text-emerald-200 font-semibold';
                    } else if (isSelected && !isCorrect) {
                      optionStyles = 'border-rose-500/80 bg-rose-950/30 text-rose-300';
                    } else {
                      optionStyles = 'border-slate-800/60 bg-slate-950/40 text-slate-500';
                    }
                  } else if (isSelected) {
                    optionStyles = 'border-amber-500/80 bg-amber-500/10 text-white font-semibold';
                  }

                  return (
                    <button
                      key={optIdx}
                      type="button"
                      disabled={showResults}
                      onClick={() => handleSelectOption(q.id, optIdx)}
                      className={`w-full p-3 rounded-lg border text-left text-xs font-mono transition-all flex items-center justify-between cursor-pointer ${optionStyles}`}
                    >
                      <span>{option}</span>
                      <span className="text-slate-500 text-[10px]">
                        {String.fromCharCode(65 + optIdx)}
                      </span>
                    </button>
                  );
                })}
              </div>

              {/* Explanation after submitting */}
              {showResults && (
                <div className="p-3.5 bg-slate-950/80 border border-slate-800 rounded-lg text-xs space-y-1">
                  <div className="font-semibold text-slate-300 flex items-center gap-1.5">
                    <HelpCircle className="w-3.5 h-3.5 text-amber-400" />
                    <span>Açıklama:</span>
                  </div>
                  <p className="text-slate-400 leading-relaxed">
                    {q.explanation}
                  </p>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};
