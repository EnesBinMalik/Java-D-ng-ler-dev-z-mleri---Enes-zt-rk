import React, { useState, useMemo } from 'react';
import { Sparkles, Hash, Zap, Code, CheckCircle, Info } from 'lucide-react';

export const EvenNumbersTab: React.FC = () => {
  const [targetNumber, setTargetNumber] = useState<number>(20);
  const [includeZero, setIncludeZero] = useState<boolean>(false);
  const [activeMethod, setActiveMethod] = useState<'for_mod' | 'for_step' | 'while_loop'>('for_mod');

  const { evens, count, sum, iterationsMod, iterationsStep } = useMemo(() => {
    const k = Math.max(0, Math.min(1000, targetNumber || 0));
    const start = includeZero ? 0 : 1;
    const list: number[] = [];
    let total = 0;

    for (let i = start; i <= k; i++) {
      if (i % 2 === 0) {
        list.push(i);
        total += i;
      }
    }

    const iterMod = k - start + 1;
    const iterStep = Math.floor(k / 2);

    return {
      evens: list,
      count: list.length,
      sum: total,
      iterationsMod: iterMod,
      iterationsStep: iterStep
    };
  }, [targetNumber, includeZero]);

  return (
    <div className="space-y-8">
      {/* Header section */}
      <section className="bg-gradient-to-b from-slate-900 to-slate-900/60 border border-slate-800 rounded-2xl p-6 sm:p-8">
        <div className="max-w-3xl">
          <div className="flex items-center gap-2 text-xs font-mono text-sky-400 mb-2">
            <span>Patika.dev Java 101</span>
            <span aria-hidden="true">·</span>
            <span>Ders Pratiği</span>
            <span aria-hidden="true">·</span>
            <span className="text-slate-300">Enes Öztürk İmzasıyla</span>
          </div>

          <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-white mb-3 text-balance">
            Girilen Sayıya Kadar Çift Sayıları Bulan Program
          </h1>

          <p className="text-sm sm:text-base text-slate-300 leading-relaxed mb-4">
            Java'da döngüler (<code className="text-sky-300 font-mono">for</code>, <code className="text-sky-300 font-mono">while</code>) ve 
            kalan operatörü (<code className="text-sky-300 font-mono">i % 2 == 0</code>) kullanarak, 
            kullanıcının girdiği sayıya kadar olan tüm çift sayıları tespit edip listeleyen program simülatörü.
          </p>

          <div className="flex flex-wrap items-center gap-4 text-xs text-slate-400 pt-2 border-t border-slate-800/80">
            <span className="flex items-center gap-1.5 text-slate-300">
              <Zap className="w-4 h-4 text-amber-400" />
              <span>Mod Operatörü: <strong className="text-white font-mono">i % 2 == 0</strong></span>
            </span>
            <span aria-hidden="true">·</span>
            <span className="flex items-center gap-1.5 text-slate-300">
              <CheckCircle className="w-4 h-4 text-emerald-400" />
              <span>Optimizasyon: <code className="text-emerald-300 font-mono">i += 2</code></span>
            </span>
          </div>
        </div>
      </section>

      {/* Grid container */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left column: Controls */}
        <div className="lg:col-span-5 space-y-6">
          <div className="bg-slate-900/90 border border-slate-800 rounded-xl p-5 space-y-5">
            <h2 className="text-sm font-bold uppercase tracking-wider text-slate-200 flex items-center justify-between">
              <span>Giriş Değeri</span>
              <span className="text-xs font-mono font-normal text-sky-400">Scanner.nextInt()</span>
            </h2>

            <div className="space-y-2">
              <label htmlFor="even-target-input" className="block text-xs font-semibold text-slate-300">
                Sayı Giriniz (k):
              </label>
              <input
                id="even-target-input"
                type="number"
                min="1"
                max="500"
                value={targetNumber}
                onChange={(e) => {
                  const val = parseInt(e.target.value) || 0;
                  setTargetNumber(Math.min(500, Math.max(0, val)));
                }}
                className="w-full px-3.5 py-2.5 bg-slate-950 border border-slate-700 rounded-lg text-white font-mono text-base focus:outline-none focus:border-sky-500 transition-colors"
                placeholder="Örn: 20"
              />

              {/* Quick presets */}
              <div className="flex items-center gap-1.5 flex-wrap pt-1">
                <span className="text-xs text-slate-500 mr-1">Örnekler:</span>
                {[10, 20, 35, 50, 100].map((preset) => (
                  <button
                    key={preset}
                    type="button"
                    onClick={() => setTargetNumber(preset)}
                    className={`px-2.5 py-1 text-xs font-mono rounded transition-colors ${
                      targetNumber === preset
                        ? 'bg-sky-500 text-slate-950 font-bold'
                        : 'bg-slate-800 text-slate-300 hover:bg-slate-700'
                    }`}
                  >
                    {preset}
                  </button>
                ))}
              </div>
            </div>

            {/* Method selection */}
            <div className="space-y-2 pt-2 border-t border-slate-800">
              <label className="block text-xs font-semibold text-slate-300">
                Java Çözüm Yöntemi:
              </label>
              <div className="space-y-2">
                <button
                  type="button"
                  onClick={() => setActiveMethod('for_mod')}
                  className={`w-full p-3 rounded-lg border text-left transition-all ${
                    activeMethod === 'for_mod'
                      ? 'border-sky-500/60 bg-sky-500/10 text-white'
                      : 'border-slate-800 bg-slate-950/60 text-slate-300 hover:border-slate-700'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-mono font-bold">1. for + if (i % 2 == 0)</span>
                    <span className="text-[10px] text-sky-400 font-sans">Klasik Yaklaşım</span>
                  </div>
                  <p className="text-xs text-slate-400 mt-1">
                    1'den k'ya kadar her sayıyı tek tek kontrol eder.
                  </p>
                </button>

                <button
                  type="button"
                  onClick={() => setActiveMethod('for_step')}
                  className={`w-full p-3 rounded-lg border text-left transition-all ${
                    activeMethod === 'for_step'
                      ? 'border-sky-500/60 bg-sky-500/10 text-white'
                      : 'border-slate-800 bg-slate-950/60 text-slate-300 hover:border-slate-700'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-mono font-bold">2. for (i = 2; i &lt;= k; i += 2)</span>
                    <span className="text-[10px] text-emerald-400 font-sans">Hızlı (2'şer Adım)</span>
                  </div>
                  <p className="text-xs text-slate-400 mt-1">
                    Doğrudan çift sayıları gezer, yarı yarıya daha az döner.
                  </p>
                </button>

                <button
                  type="button"
                  onClick={() => setActiveMethod('while_loop')}
                  className={`w-full p-3 rounded-lg border text-left transition-all ${
                    activeMethod === 'while_loop'
                      ? 'border-sky-500/60 bg-sky-500/10 text-white'
                      : 'border-slate-800 bg-slate-950/60 text-slate-300 hover:border-slate-700'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-mono font-bold">3. while Döngüsü ile</span>
                    <span className="text-[10px] text-purple-400 font-sans">Alternatif</span>
                  </div>
                  <p className="text-xs text-slate-400 mt-1">
                    Sayaç değişkeni manuel artırılarak koşul kontrol edilir.
                  </p>
                </button>
              </div>
            </div>

            {/* Zero inclusion */}
            <div className="pt-2 border-t border-slate-800">
              <label className="flex items-start gap-3 cursor-pointer">
                <input
                  type="checkbox"
                  checked={includeZero}
                  onChange={(e) => setIncludeZero(e.target.checked)}
                  className="mt-1 h-4 w-4 rounded border-slate-700 bg-slate-950 text-sky-500 focus:ring-sky-500 focus:ring-offset-slate-900"
                />
                <div className="space-y-0.5">
                  <span className="text-xs font-semibold text-slate-200">
                    0 sayısı çift sayı olarak dahil edilsin mi?
                  </span>
                  <p className="text-xs text-slate-400">
                    0 çift bir sayıdır (0 % 2 = 0). Varsayılan olarak 1'den başlanır.
                  </p>
                </div>
              </label>
            </div>
          </div>

          {/* Efficiency Comparison Card */}
          <div className="bg-slate-900/90 border border-slate-800 rounded-xl p-5 space-y-3">
            <h3 className="text-xs font-bold uppercase tracking-wider text-slate-200 flex items-center gap-1.5">
              <Zap className="w-4 h-4 text-emerald-400" />
              Döngü Verimlilik Karşılaştırması
            </h3>
            <div className="space-y-2 text-xs">
              <div className="flex items-center justify-between p-2 rounded bg-slate-950 border border-slate-800">
                <span className="text-slate-400">Klasik Yöntem (1'er artış):</span>
                <span className="font-mono text-rose-300 font-bold">{iterationsMod} İterasyon</span>
              </div>
              <div className="flex items-center justify-between p-2 rounded bg-slate-950 border border-slate-800">
                <span className="text-slate-400">Optimize Yöntem (2'şer artış):</span>
                <span className="font-mono text-emerald-300 font-bold">{iterationsStep} İterasyon (%50 Tasarruf)</span>
              </div>
            </div>
          </div>
        </div>

        {/* Right column: Results & Code */}
        <div className="lg:col-span-7 space-y-6">
          {/* KPI metrics */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div className="p-4 bg-slate-900 border border-slate-800 rounded-xl">
              <span className="text-xs text-slate-400 uppercase tracking-wider font-semibold block">
                Bulunan Çift Sayı
              </span>
              <span className="text-2xl sm:text-3xl font-extrabold text-sky-400 font-mono tabular-nums mt-1 block">
                {count} Adet
              </span>
              <span className="text-xs text-slate-500 mt-1 block">
                Aralık: [{includeZero ? 0 : 1}, {targetNumber}]
              </span>
            </div>

            <div className="p-4 bg-slate-900 border border-slate-800 rounded-xl">
              <span className="text-xs text-slate-400 uppercase tracking-wider font-semibold block">
                Çift Sayılar Toplamı
              </span>
              <span className="text-2xl sm:text-3xl font-extrabold text-white font-mono tabular-nums mt-1 block">
                {sum}
              </span>
              <span className="text-xs text-slate-500 mt-1 block">
                ∑(çift sayılar)
              </span>
            </div>

            <div className="p-4 bg-slate-900 border border-slate-800 rounded-xl">
              <span className="text-xs text-slate-400 uppercase tracking-wider font-semibold block">
                Çift Sayı Oranı
              </span>
              <span className="text-2xl sm:text-3xl font-extrabold text-emerald-400 font-mono tabular-nums mt-1 block">
                {targetNumber > 0 ? `%${((count / targetNumber) * 100).toFixed(0)}` : '%0'}
              </span>
              <span className="text-xs text-slate-500 mt-1 block">
                Toplam sayıya oranı
              </span>
            </div>
          </div>

          {/* Even Numbers Grid */}
          <div className="bg-slate-900/90 border border-slate-800 rounded-xl p-5 space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-xs font-bold uppercase tracking-wider text-slate-200">
                  Bulunan Çift Sayılar Listesi
                </h3>
                <p className="text-xs text-slate-400">
                  Her biri 2'ye tam bölünen (<code className="text-sky-300 font-mono">sayi % 2 == 0</code>) değerler.
                </p>
              </div>
              <span className="text-xs font-mono text-slate-400">
                {evens.length} eleman
              </span>
            </div>

            {evens.length > 0 ? (
              <div className="grid grid-cols-4 sm:grid-cols-6 md:grid-cols-8 gap-2 max-h-60 overflow-y-auto pr-1">
                {evens.map((num) => (
                  <div
                    key={num}
                    className="p-2 rounded bg-slate-950 border border-slate-800 text-center font-mono text-sm font-bold text-sky-300 hover:border-sky-500/50 transition-colors"
                  >
                    {num}
                  </div>
                ))}
              </div>
            ) : (
              <div className="p-6 text-center bg-slate-950/60 rounded-lg border border-slate-800/80">
                <Info className="w-5 h-5 text-slate-500 mx-auto mb-1.5" />
                <p className="text-xs text-slate-400">
                  Bu aralıkta çift sayı bulunamadı. Lütfen 2 veya daha büyük bir sayı giriniz.
                </p>
              </div>
            )}
          </div>

          {/* Java Code Representation */}
          <div className="bg-slate-900/90 border border-slate-800 rounded-xl p-5 space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold uppercase tracking-wider text-slate-200 flex items-center gap-1.5">
                <Code className="w-4 h-4 text-sky-400" />
                Seçili Yöntemin Java Kodu ({activeMethod})
              </span>
              <span className="text-xs text-slate-500 font-mono">Enes Öztürk</span>
            </div>

            <pre className="p-3.5 bg-slate-950 border border-slate-800 rounded-lg font-mono text-xs text-slate-300 overflow-x-auto leading-relaxed">
{activeMethod === 'for_mod' && `// Yöntem 1: Standart for döngüsü ve if kontrolü
int k = ${targetNumber};
System.out.println("${targetNumber}'e kadar çift sayılar:");
for (int i = ${includeZero ? 0 : 1}; i <= k; i++) {
    if (i % 2 == 0) {
        System.out.print(i + " ");
    }
}`}
{activeMethod === 'for_step' && `// Yöntem 2: 2'şer adımlı optimize for döngüsü
int k = ${targetNumber};
for (int i = ${includeZero ? 0 : 2}; i <= k; i += 2) {
    System.out.print(i + " ");
}`}
{activeMethod === 'while_loop' && `// Yöntem 3: while döngüsü ile çözüm
int k = ${targetNumber};
int sayac = ${includeZero ? 0 : 1};
while (sayac <= k) {
    if (sayac % 2 == 0) {
        System.out.print(sayac + " ");
    }
    sayac++;
}`}
            </pre>
          </div>
        </div>
      </div>
    </div>
  );
};
