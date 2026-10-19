import React, { useState, useEffect, useMemo, useRef } from 'react';
import { 
  Play, 
  Pause, 
  RotateCcw, 
  ChevronRight, 
  ChevronLeft, 
  Calculator, 
  Info, 
  Sparkles, 
  CheckCircle2, 
  AlertTriangle,
  Zap,
  Code
} from 'lucide-react';
import { LoopStep } from '../types';

export const HomeworkTab: React.FC = () => {
  const [targetNumber, setTargetNumber] = useState<number>(50);
  const [includeZero, setIncludeZero] = useState<boolean>(false);
  const [loopType, setLoopType] = useState<'standard_for' | 'optimized_step' | 'while_loop'>('standard_for');
  
  // Interactive Step-by-Step Loop State
  const [isStepping, setIsStepping] = useState<boolean>(false);
  const [currentStepIndex, setCurrentStepIndex] = useState<number>(0);
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [playbackSpeed, setPlaybackSpeed] = useState<number>(1);
  const playTimerRef = useRef<number | null>(null);

  // Compute matched numbers & full simulation steps
  const { matchedNumbers, sum, count, average, allSteps } = useMemo(() => {
    const k = Math.max(0, Math.min(1000, targetNumber || 0));
    const start = includeZero ? 0 : 1;
    const matches: number[] = [];
    const steps: LoopStep[] = [];
    let currentSum = 0;
    let currentCount = 0;

    if (loopType === 'optimized_step') {
      const stepStart = includeZero ? 0 : 12;
      for (let i = stepStart; i <= k; i += 12) {
        if (i === 0 && !includeZero) continue;
        matches.push(i);
        currentSum += i;
        currentCount++;
        const currAvg = currentCount > 0 ? currentSum / currentCount : 0;
        steps.push({
          stepIndex: steps.length,
          i,
          divBy3: true,
          divBy4: true,
          isMatch: true,
          sum: currentSum,
          count: currentCount,
          currentAvg: currAvg,
          note: `${i} doğrudan 12'nin katıdır (3×4=12). Toplama eklendi!`
        });
      }
    } else {
      // standard for or while
      for (let i = start; i <= k; i++) {
        const divBy3 = i % 3 === 0;
        const divBy4 = i % 4 === 0;
        const isMatch = divBy3 && divBy4;

        if (isMatch) {
          matches.push(i);
          currentSum += i;
          currentCount++;
        }

        const currAvg = currentCount > 0 ? currentSum / currentCount : 0;
        steps.push({
          stepIndex: steps.length,
          i,
          divBy3,
          divBy4,
          isMatch,
          sum: currentSum,
          count: currentCount,
          currentAvg: currAvg,
          note: isMatch 
            ? `${i} hem 3'e (${i}/3=${i/3}) hem 4'e (${i}/4=${i/4}) tam bölünür! Toplam: ${currentSum}, Adet: ${currentCount}`
            : !divBy3 && !divBy4 
              ? `${i} ne 3'e ne 4'e tam bölünür.`
              : !divBy3 
                ? `${i} 4'e bölünür fakat 3'e bölünmez.`
                : `${i} 3'e bölünür fakat 4'e bölünmez.`
        });
      }
    }

    const calculatedAvg = currentCount > 0 ? currentSum / currentCount : 0;

    return {
      matchedNumbers: matches,
      sum: currentSum,
      count: currentCount,
      average: calculatedAvg,
      allSteps: steps
    };
  }, [targetNumber, includeZero, loopType]);

  // Handle Play/Pause
  useEffect(() => {
    if (isPlaying) {
      const intervalMs = Math.max(100, Math.floor(600 / playbackSpeed));
      playTimerRef.current = window.setInterval(() => {
        setCurrentStepIndex((prev) => {
          if (prev >= allSteps.length - 1) {
            setIsPlaying(false);
            return prev;
          }
          return prev + 1;
        });
      }, intervalMs);
    } else {
      if (playTimerRef.current) {
        clearInterval(playTimerRef.current);
        playTimerRef.current = null;
      }
    }

    return () => {
      if (playTimerRef.current) {
        clearInterval(playTimerRef.current);
      }
    };
  }, [isPlaying, playbackSpeed, allSteps.length]);

  const activeStep = isStepping && allSteps.length > 0 
    ? allSteps[Math.min(currentStepIndex, allSteps.length - 1)] 
    : null;

  const currentDisplayCount = isStepping && activeStep ? activeStep.count : count;
  const currentDisplaySum = isStepping && activeStep ? activeStep.sum : sum;
  const currentDisplayAvg = isStepping && activeStep ? activeStep.currentAvg : average;
  const currentDisplayMatches = isStepping && activeStep 
    ? matchedNumbers.filter(n => n <= activeStep.i) 
    : matchedNumbers;

  const startSteppingMode = () => {
    setIsStepping(true);
    setCurrentStepIndex(0);
    setIsPlaying(false);
  };

  const stopSteppingMode = () => {
    setIsStepping(false);
    setIsPlaying(false);
  };

  return (
    <div className="space-y-8">
      {/* Hero / Assignment Description Section */}
      <section className="bg-gradient-to-b from-slate-900 to-slate-900/60 border border-slate-800 rounded-2xl p-6 sm:p-8">
        <div className="max-w-3xl">
          <div className="flex items-center gap-2 text-xs font-mono text-amber-400 mb-2">
            <span>Patika.dev Java 101</span>
            <span aria-hidden="true">·</span>
            <span>Döngüler Ödevi</span>
            <span aria-hidden="true">·</span>
            <span className="text-slate-300">Enes Öztürk İmzasıyla</span>
          </div>

          <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-white mb-3 text-balance">
            3 ve 4'e Tam Bölünen Sayıların Ortalamasını Hesaplayan Program
          </h1>

          <p className="text-sm sm:text-base text-slate-300 leading-relaxed mb-4">
            Java döngüleri (<code className="text-amber-300 font-mono">for</code> / <code className="text-amber-300 font-mono">while</code>) ve 
            kalan (<code className="text-amber-300 font-mono">%</code>) operatörü kullanılarak, 
            kullanıcının girdiği hedef sayıya kadar hem 3'e hem de 4'e tam bölünen sayıları tespit edip aritmetik ortalamasını hesaplar.
          </p>

          <div className="flex flex-wrap items-center gap-4 text-xs text-slate-400 pt-2 border-t border-slate-800/80">
            <span className="flex items-center gap-1.5 text-slate-300">
              <Sparkles className="w-4 h-4 text-amber-400" />
              <span>Matematik Kuralı: <strong className="text-white font-mono">EKOK(3, 4) = 12</strong></span>
            </span>
            <span aria-hidden="true">·</span>
            <span className="flex items-center gap-1.5 text-slate-300">
              <CheckCircle2 className="w-4 h-4 text-emerald-400" />
              <span>Sıfıra Bölme Koruması</span>
            </span>
            <span aria-hidden="true">·</span>
            <span className="flex items-center gap-1.5 text-slate-300">
              <Zap className="w-4 h-4 text-sky-400" />
              <span>Hassas <code className="text-sky-300 font-mono">(double)</code> Tip Dönüşümü</span>
            </span>
          </div>
        </div>
      </section>

      {/* Main Interactive Stage Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left Column: Interactive Parameters & Controls */}
        <div className="lg:col-span-5 space-y-6">
          <div className="bg-slate-900/90 border border-slate-800 rounded-xl p-5 space-y-5">
            <h2 className="text-sm font-bold uppercase tracking-wider text-slate-200 flex items-center justify-between">
              <span>Giriş Parametreleri</span>
              <span className="text-xs font-mono font-normal text-amber-400">Scanner(System.in)</span>
            </h2>

            {/* Target Number Input */}
            <div className="space-y-2">
              <label htmlFor="target-number" className="block text-xs font-semibold text-slate-300">
                Hedef Sayı (Limit Değeri)
              </label>
              <div className="flex gap-2">
                <input
                  id="target-number"
                  type="number"
                  min="1"
                  max="1000"
                  value={targetNumber}
                  onChange={(e) => {
                    const val = parseInt(e.target.value) || 0;
                    setTargetNumber(Math.min(1000, Math.max(0, val)));
                    setIsPlaying(false);
                    setCurrentStepIndex(0);
                  }}
                  className="flex-1 px-3.5 py-2.5 bg-slate-950 border border-slate-700 rounded-lg text-white font-mono text-base focus:outline-none focus:border-amber-500 transition-colors"
                  placeholder="Örn: 50"
                />
              </div>

              {/* Preset Buttons */}
              <div className="flex items-center gap-1.5 flex-wrap pt-1">
                <span className="text-xs text-slate-500 mr-1">Hızlı Seçim:</span>
                {[12, 24, 50, 100, 144, 240].map((preset) => (
                  <button
                    key={preset}
                    type="button"
                    onClick={() => {
                      setTargetNumber(preset);
                      setIsPlaying(false);
                      setCurrentStepIndex(0);
                    }}
                    className={`px-2.5 py-1 text-xs font-mono rounded transition-colors ${
                      targetNumber === preset
                        ? 'bg-amber-500 text-slate-950 font-bold'
                        : 'bg-slate-800 text-slate-300 hover:bg-slate-700'
                    }`}
                  >
                    {preset}
                  </button>
                ))}
              </div>
            </div>

            {/* Loop Algorithm Choice */}
            <div className="space-y-2 pt-2 border-t border-slate-800">
              <label className="block text-xs font-semibold text-slate-300">
                Döngü & Algoritma Tipi
              </label>
              <div className="grid grid-cols-1 gap-2">
                <button
                  type="button"
                  onClick={() => {
                    setLoopType('standard_for');
                    setIsPlaying(false);
                  }}
                  className={`flex flex-col items-start p-3 rounded-lg border text-left transition-all ${
                    loopType === 'standard_for'
                      ? 'border-amber-500/60 bg-amber-500/10 text-white'
                      : 'border-slate-800 bg-slate-950/60 text-slate-300 hover:border-slate-700'
                  }`}
                >
                  <div className="flex items-center justify-between w-full">
                    <span className="text-xs font-bold font-mono">for (int i = 1; i &lt;= k; i++)</span>
                    <span className="text-xs text-amber-400 font-sans">Standart</span>
                  </div>
                  <span className="text-xs text-slate-400 mt-1">
                    Her sayıyı <code className="text-slate-300 font-mono">i % 3 == 0 && i % 4 == 0</code> ile tek tek inceler.
                  </span>
                </button>

                <button
                  type="button"
                  onClick={() => {
                    setLoopType('optimized_step');
                    setIsPlaying(false);
                  }}
                  className={`flex flex-col items-start p-3 rounded-lg border text-left transition-all ${
                    loopType === 'optimized_step'
                      ? 'border-amber-500/60 bg-amber-500/10 text-white'
                      : 'border-slate-800 bg-slate-950/60 text-slate-300 hover:border-slate-700'
                  }`}
                >
                  <div className="flex items-center justify-between w-full">
                    <span className="text-xs font-bold font-mono">for (int i = 12; i &lt;= k; i += 12)</span>
                    <span className="text-xs text-emerald-400 font-sans">Optimize (EKOK)</span>
                  </div>
                  <span className="text-xs text-slate-400 mt-1">
                    Gereksiz kontrolleri atlayıp 12'şer atlar. 12 kat daha hızlıdır.
                  </span>
                </button>
              </div>
            </div>

            {/* Zero Inclusion Toggle */}
            <div className="pt-2 border-t border-slate-800">
              <label className="flex items-start gap-3 cursor-pointer group">
                <input
                  type="checkbox"
                  checked={includeZero}
                  onChange={(e) => {
                    setIncludeZero(e.target.checked);
                    setIsPlaying(false);
                  }}
                  className="mt-1 h-4 w-4 rounded border-slate-700 bg-slate-950 text-amber-500 focus:ring-amber-500 focus:ring-offset-slate-900"
                />
                <div className="space-y-0.5">
                  <span className="text-xs font-semibold text-slate-200 group-hover:text-amber-300 transition-colors">
                    0 sayısı döngüye dahil edilsin mi?
                  </span>
                  <p className="text-xs text-slate-400 leading-normal">
                    Matematiksel olarak 0 % 3 = 0 ve 0 % 4 = 0'dır; fakat ödevlerde genelde pozitif sayılar istendiğinden 1'den başlanır.
                  </p>
                </div>
              </label>
            </div>
          </div>

          {/* Step-by-Step Loop Tracer Controls */}
          <div className="bg-slate-900/90 border border-slate-800 rounded-xl p-5 space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-xs font-bold uppercase tracking-wider text-slate-200">
                  Adım Adım Döngü İzleyici (Debugger)
                </h3>
                <p className="text-xs text-slate-400">
                  Her iterasyonda değişkenlerin nasıl değiştiğini izleyin.
                </p>
              </div>
              {!isStepping ? (
                <button
                  type="button"
                  onClick={startSteppingMode}
                  className="px-3 py-1.5 text-xs font-semibold rounded-lg bg-amber-500 text-slate-950 hover:bg-amber-400 transition-colors shadow-sm"
                >
                  İzlemeyi Başlat
                </button>
              ) : (
                <button
                  type="button"
                  onClick={stopSteppingMode}
                  className="px-3 py-1.5 text-xs font-semibold rounded-lg bg-slate-800 text-slate-300 hover:bg-slate-700 transition-colors"
                >
                  Canlı Modu Kapat
                </button>
              )}
            </div>

            {isStepping && (
              <div className="space-y-3 pt-3 border-t border-slate-800">
                <div className="flex items-center justify-between text-xs font-mono text-slate-400">
                  <span>İterasyon: <strong className="text-white">{currentStepIndex + 1}</strong> / {allSteps.length}</span>
                  <span>Hız: {playbackSpeed}x</span>
                </div>

                {/* Progress bar */}
                <div className="w-full bg-slate-800 h-1.5 rounded-full overflow-hidden">
                  <div 
                    className="bg-amber-500 h-full transition-all duration-150"
                    style={{ 
                      width: `${allSteps.length > 0 ? ((currentStepIndex + 1) / allSteps.length) * 100 : 0}%` 
                    }}
                  />
                </div>

                {/* Playback Button Strip */}
                <div className="flex items-center justify-between gap-2 pt-1">
                  <div className="flex items-center gap-1.5">
                    <button
                      type="button"
                      disabled={currentStepIndex === 0}
                      onClick={() => {
                        setIsPlaying(false);
                        setCurrentStepIndex((prev) => Math.max(0, prev - 1));
                      }}
                      className="p-2 rounded-lg bg-slate-800 text-slate-300 hover:text-white disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
                      title="Önceki Adım"
                    >
                      <ChevronLeft className="w-4 h-4" />
                    </button>

                    <button
                      type="button"
                      onClick={() => setIsPlaying(!isPlaying)}
                      className="flex items-center gap-1.5 px-3 py-2 rounded-lg bg-amber-500/20 text-amber-300 border border-amber-500/40 hover:bg-amber-500/30 transition-colors text-xs font-semibold"
                    >
                      {isPlaying ? <Pause className="w-3.5 h-3.5" /> : <Play className="w-3.5 h-3.5" />}
                      <span>{isPlaying ? 'Durdur' : 'Oynat'}</span>
                    </button>

                    <button
                      type="button"
                      disabled={currentStepIndex >= allSteps.length - 1}
                      onClick={() => {
                        setIsPlaying(false);
                        setCurrentStepIndex((prev) => Math.min(allSteps.length - 1, prev + 1));
                      }}
                      className="p-2 rounded-lg bg-slate-800 text-slate-300 hover:text-white disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
                      title="Sonraki Adım"
                    >
                      <ChevronRight className="w-4 h-4" />
                    </button>

                    <button
                      type="button"
                      onClick={() => {
                        setIsPlaying(false);
                        setCurrentStepIndex(0);
                      }}
                      className="p-2 rounded-lg bg-slate-800 text-slate-400 hover:text-white transition-colors"
                      title="Başa Dön"
                    >
                      <RotateCcw className="w-4 h-4" />
                    </button>
                  </div>

                  {/* Speed Selector */}
                  <div className="flex items-center gap-1 bg-slate-950 p-1 rounded-lg border border-slate-800 text-xs font-mono">
                    {[0.5, 1, 2, 5].map((spd) => (
                      <button
                        key={spd}
                        type="button"
                        onClick={() => setPlaybackSpeed(spd)}
                        className={`px-1.5 py-0.5 rounded ${
                          playbackSpeed === spd 
                            ? 'bg-amber-500 text-slate-950 font-bold' 
                            : 'text-slate-400 hover:text-slate-200'
                        }`}
                      >
                        {spd}x
                      </button>
                    ))}
                  </div>
                </div>

                {/* Active Step Real-time Inspection Box */}
                {activeStep && (
                  <div className="p-3.5 bg-slate-950 border border-slate-800 rounded-lg space-y-2 text-xs">
                    <div className="flex items-center justify-between font-mono">
                      <span className="text-slate-400">Şu Anki Değişken (i):</span>
                      <span className="text-base font-bold text-amber-300">{activeStep.i}</span>
                    </div>

                    <div className="grid grid-cols-2 gap-2 font-mono text-xs pt-1 border-t border-slate-900">
                      <div className="flex items-center justify-between p-1.5 rounded bg-slate-900/60">
                        <span className="text-slate-400">i % 3:</span>
                        <span className={activeStep.divBy3 ? 'text-emerald-400 font-bold' : 'text-slate-500'}>
                          {activeStep.i % 3} {activeStep.divBy3 ? '✓' : '✗'}
                        </span>
                      </div>
                      <div className="flex items-center justify-between p-1.5 rounded bg-slate-900/60">
                        <span className="text-slate-400">i % 4:</span>
                        <span className={activeStep.divBy4 ? 'text-emerald-400 font-bold' : 'text-slate-500'}>
                          {activeStep.i % 4} {activeStep.divBy4 ? '✓' : '✗'}
                        </span>
                      </div>
                    </div>

                    <p className={`p-2 rounded text-xs leading-relaxed ${
                      activeStep.isMatch 
                        ? 'bg-emerald-950/40 border border-emerald-800/40 text-emerald-300' 
                        : 'bg-slate-900/40 text-slate-400'
                    }`}>
                      {activeStep.note}
                    </p>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>

        {/* Right Column: Mathematical Output & Visualization */}
        <div className="lg:col-span-7 space-y-6">
          {/* KPI Result Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {/* Primary KPI: Aritmetik Ortalama */}
            <div className="p-5 bg-gradient-to-br from-amber-500/10 via-slate-900 to-slate-900 border border-amber-500/30 rounded-2xl relative overflow-hidden">
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs font-semibold uppercase tracking-wider text-amber-400 flex items-center gap-1.5">
                  <Calculator className="w-4 h-4" />
                  Aritmetik Ortalama
                </span>
                <span className="text-xs font-mono text-slate-400">
                  {currentDisplayCount > 0 ? `${currentDisplaySum} ÷ ${currentDisplayCount}` : 'Tanımsız'}
                </span>
              </div>

              <div className="flex items-baseline gap-2">
                <span className="text-3xl sm:text-4xl font-extrabold text-white font-mono tabular-nums">
                  {currentDisplayCount > 0 ? currentDisplayAvg.toFixed(2) : '0.00'}
                </span>
                {currentDisplayCount > 0 && Number.isInteger(currentDisplayAvg) && (
                  <span className="text-xs text-amber-300/80 font-mono">
                    (Tam Sayı: {Math.round(currentDisplayAvg)})
                  </span>
                )}
              </div>

              <p className="text-xs text-slate-400 mt-2">
                {currentDisplayCount > 0 
                  ? `Ortalama = Toplam (${currentDisplaySum}) / Adet (${currentDisplayCount})`
                  : 'Aralıkta şartı sağlayan sayı bulunmadığı için ortalama hesaplanamaz.'}
              </p>
            </div>

            {/* Secondary KPI: Toplam & Adet */}
            <div className="p-5 bg-slate-900 border border-slate-800 rounded-2xl flex flex-col justify-between">
              <div>
                <span className="text-xs font-semibold uppercase tracking-wider text-slate-400">
                  Eşleşen Değerler
                </span>
                <div className="flex items-center justify-between mt-3">
                  <div>
                    <span className="text-xs text-slate-400 block">Sayı Adedi (adet)</span>
                    <span className="text-2xl font-bold text-white font-mono tabular-nums">
                      {currentDisplayCount}
                    </span>
                  </div>
                  <div className="text-right">
                    <span className="text-xs text-slate-400 block">Genel Toplam (toplam)</span>
                    <span className="text-2xl font-bold text-amber-400 font-mono tabular-nums">
                      {currentDisplaySum}
                    </span>
                  </div>
                </div>
              </div>

              <div className="text-xs text-slate-500 pt-3 border-t border-slate-800/80 flex items-center justify-between">
                <span>İncelenen Aralık:</span>
                <span className="font-mono text-slate-300">[{includeZero ? '0' : '1'}, {targetNumber}]</span>
              </div>
            </div>
          </div>

          {/* Division by Zero Warning Callout if count === 0 */}
          {currentDisplayCount === 0 && (
            <div className="p-4 bg-amber-950/30 border border-amber-800/50 rounded-xl flex items-start gap-3 text-xs text-amber-300 leading-relaxed">
              <AlertTriangle className="w-5 h-5 shrink-0 text-amber-400 mt-0.5" />
              <div>
                <strong className="block text-amber-200 font-semibold mb-0.5">
                  Önemli Kontrol: Sıfıra Bölme Hatası (ArithmeticException)
                </strong>
                Girilen sınır ({targetNumber}) 12'den küçük olduğu için aralıkta 3 ve 4'e tam bölünen pozitif sayı yoktur. 
                Java programında <code className="bg-amber-900/40 px-1 py-0.5 rounded font-mono text-white">toplam / adet</code> işlemi 
                yapılmadan önce mutlaka <code className="bg-amber-900/40 px-1 py-0.5 rounded font-mono text-white">if (adet &gt; 0)</code> 
                kontrolü yapılmalıdır; aksi halde Java çalışma zamanında program çöker!
              </div>
            </div>
          )}

          {/* Matched Numbers Grid Showcase */}
          <div className="bg-slate-900/90 border border-slate-800 rounded-xl p-5 space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-xs font-bold uppercase tracking-wider text-slate-200">
                  3 ve 4'e Tam Bölünen Sayılar
                </h3>
                <p className="text-xs text-slate-400">
                  Bu sayılar aynı zamanda 12'nin katlarıdır (EKOK).
                </p>
              </div>
              <span className="text-xs font-mono text-slate-400">
                Toplam <strong className="text-amber-400">{currentDisplayMatches.length}</strong> sayı
              </span>
            </div>

            {currentDisplayMatches.length > 0 ? (
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-2.5 max-h-64 overflow-y-auto pr-1">
                {currentDisplayMatches.map((num, idx) => (
                  <div
                    key={num}
                    className="p-2.5 rounded-lg bg-slate-950 border border-slate-800 flex flex-col items-center justify-center text-center group hover:border-amber-500/50 transition-colors"
                  >
                    <span className="text-base font-extrabold text-white font-mono group-hover:text-amber-400 transition-colors">
                      {num}
                    </span>
                    <span className="text-[10px] text-slate-400 font-mono mt-0.5">
                      {num === 0 ? '0 = 12 × 0' : `12 × ${num / 12}`}
                    </span>
                    <div className="flex items-center gap-1 text-[9px] text-slate-500 mt-1">
                      <span>{num / 3} × 3</span>
                      <span>·</span>
                      <span>{num / 4} × 4</span>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="p-8 text-center bg-slate-950/60 rounded-lg border border-slate-800/80">
                <Info className="w-6 h-6 text-slate-500 mx-auto mb-2" />
                <p className="text-xs text-slate-400">
                  Bu aralıkta hem 3'e hem 4'e tam bölünen sayı bulunmuyor. Daha büyük bir sayı giriniz (örn: 50 veya 100).
                </p>
              </div>
            )}

            {/* Average Calculation Formula Breakdown */}
            {currentDisplayCount > 0 && (
              <div className="p-3.5 bg-slate-950 border border-slate-800 rounded-lg text-xs font-mono space-y-1.5 text-slate-300">
                <div className="text-slate-400 font-sans text-xs font-semibold">
                  Java'daki Matematiksel Formül:
                </div>
                <div className="text-amber-300">
                  double ortalama = (double) toplam / adet;
                </div>
                <div className="text-slate-400">
                  // Değerler: ({currentDisplaySum}.0) / {currentDisplayCount} = <strong className="text-white">{currentDisplayAvg.toFixed(4)}</strong>
                </div>
              </div>
            )}
          </div>

          {/* Quick Code Reference Card */}
          <div className="bg-slate-900/90 border border-slate-800 rounded-xl p-5 space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold uppercase tracking-wider text-slate-200 flex items-center gap-1.5">
                <Code className="w-4 h-4 text-amber-400" />
                Bu Durumun Java Kod Karşılığı
              </span>
              <span className="text-xs text-slate-500 font-mono">Enes Öztürk</span>
            </div>

            <pre className="p-3.5 bg-slate-950 border border-slate-800 rounded-lg font-mono text-xs text-slate-300 overflow-x-auto leading-relaxed">
{`int toplam = 0, adet = 0;
for (int i = ${includeZero ? 0 : 1}; i <= ${targetNumber}; i++) {
    if (i % 3 == 0 && i % 4 == 0) {
        toplam += i;
        adet++;
    }
}
if (adet > 0) {
    double ortalama = (double) toplam / adet;
    System.out.println("Ortalama: " + ortalama); // Sonuç: ${currentDisplayCount > 0 ? currentDisplayAvg.toFixed(2) : "Hesaplanamaz"}
}`}
            </pre>
          </div>
        </div>
      </div>
    </div>
  );
};
