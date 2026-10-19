import React from 'react';
import { 
  Lightbulb, 
  AlertOctagon, 
  Cpu, 
  Calculator, 
  GitBranch, 
  CheckCircle2, 
  ArrowRight,
  ShieldAlert
} from 'lucide-react';

export const AnalysisTab: React.FC = () => {
  return (
    <div className="space-y-8">
      {/* Hero header */}
      <section className="bg-gradient-to-b from-slate-900 to-slate-900/60 border border-slate-800 rounded-2xl p-6 sm:p-8">
        <div className="max-w-3xl">
          <div className="flex items-center gap-2 text-xs font-mono text-purple-400 mb-2">
            <span>Matematik & Algoritma</span>
            <span aria-hidden="true">·</span>
            <span>Derinlemesine Analiz</span>
            <span aria-hidden="true">·</span>
            <span className="text-slate-300">Enes Öztürk</span>
          </div>

          <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-white mb-3 text-balance">
            Algoritma Mantığı, EKOK ve Java Tuzakları
          </h1>

          <p className="text-sm sm:text-base text-slate-300 leading-relaxed">
            Bu ödev yalnızca basit bir döngü yazmaktan ibaret değildir; aralarında asal sayılar, 
            tamsayı bölme mekanizması (<em className="text-purple-300">integer division</em>) ve 
            sıfıra bölme (<em className="text-purple-300">division by zero</em>) gibi Java'nın en kritik temel kavramlarını içerir.
          </p>
        </div>
      </section>

      {/* 4 In-depth Educational Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Card 1: EKOK(3, 4) = 12 Mantığı */}
        <div className="bg-slate-900/90 border border-slate-800 rounded-xl p-6 space-y-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-purple-500/10 border border-purple-500/30 flex items-center justify-center text-purple-400">
              <Calculator className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-base font-bold text-white">1. EKOK(3, 4) = 12 Matematik Kuralı</h2>
              <span className="text-xs text-slate-400 font-mono">En Küçük Ortak Kat</span>
            </div>
          </div>

          <p className="text-xs text-slate-300 leading-relaxed">
            3 ve 4 sayıları aralarında asaldır; yani 1'den başka ortak pozitif bölenleri yoktur. 
            Bu nedenle her iki sayıya birden tam bölünebilen en küçük pozitif tam sayı çarpımlarıdır:
          </p>

          <div className="p-3.5 bg-slate-950 border border-slate-800 rounded-lg font-mono text-xs text-center text-purple-300">
            EKOK(3, 4) = 3 × 4 = 12
          </div>

          <div className="text-xs text-slate-400 space-y-2">
            <p>
              Dolayısıyla Java'daki <code className="text-white font-mono">(i % 3 == 0 && i % 4 == 0)</code> koşulu ile 
              <code className="text-emerald-400 font-mono"> (i % 12 == 0)</code> koşulu matematiksel olarak tamamen özdeştir!
            </p>
            <div className="p-2.5 rounded bg-slate-950/60 border border-slate-800/80 text-[11px] text-slate-300">
              💡 <strong>Enes Öztürk İpucu:</strong> Döngüde her sayıyı 1'er 1'er test etmek yerine <code className="text-amber-300 font-mono">i += 12</code> artışı kullanırsanız, 
              döngü 12 kat daha az adımda tamamlanır.
            </div>
          </div>
        </div>

        {/* Card 2: Integer Division Trap */}
        <div className="bg-slate-900/90 border border-slate-800 rounded-xl p-6 space-y-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-amber-500/10 border border-amber-500/30 flex items-center justify-center text-amber-400">
              <AlertOctagon className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-base font-bold text-white">2. Tamsayı Bölmesi Tuzağı</h2>
              <span className="text-xs text-slate-400 font-mono">Integer Division Problem</span>
            </div>
          </div>

          <p className="text-xs text-slate-300 leading-relaxed">
            Java'da iki <code className="text-amber-300 font-mono">int</code> değişken bölündüğünde sonuç her zaman 
            ondalıklı kısmı atılmış bir tamsayı (<code className="text-amber-300 font-mono">int</code>) olur.
          </p>

          <div className="p-3 bg-slate-950 border border-slate-800 rounded-lg font-mono text-xs space-y-1">
            <div className="text-rose-400">// YANLIŞ YAKLAŞIM:</div>
            <div className="text-slate-400">int toplam = 30; int adet = 4;</div>
            <div className="text-slate-400">double ort = toplam / adet; <span className="text-rose-400">// Sonuç: 7.0 ! (7.5 kaybolur)</span></div>
            <div className="text-emerald-400 pt-1">// DOĞRU YAKLAŞIM (Type Casting):</div>
            <div className="text-emerald-300">double ort = (double) toplam / adet; <span className="text-emerald-400">// Sonuç: 7.5 ✓</span></div>
          </div>

          <p className="text-xs text-slate-400">
            Değişkenlerden en az birini <code className="text-white font-mono">(double)</code> tipine dönüştürmek, 
            işlemin reel sayılar kümesinde kayıpsız yapılmasını garanti eder.
          </p>
        </div>

        {/* Card 3: Division by Zero Security */}
        <div className="bg-slate-900/90 border border-slate-800 rounded-xl p-6 space-y-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-rose-500/10 border border-rose-500/30 flex items-center justify-center text-rose-400">
              <ShieldAlert className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-base font-bold text-white">3. Sıfıra Bölme Koruması</h2>
              <span className="text-xs text-slate-400 font-mono">ArithmeticException: / by zero</span>
            </div>
          </div>

          <p className="text-xs text-slate-300 leading-relaxed">
            Eğer kullanıcı 12'den küçük bir sayı girerse (örneğin 10 veya 7), döngü boyunca şartı sağlayan hiçbir sayı bulunamaz 
            ve <code className="text-rose-300 font-mono">adet = 0</code> olarak kalır.
          </p>

          <div className="p-3 bg-slate-950 border border-slate-800 rounded-lg font-mono text-xs space-y-1">
            <div className="text-rose-400">// adet = 0 iken toplam / adet yapılırsa:</div>
            <div className="text-rose-300">Exception in thread "main" java.lang.ArithmeticException: / by zero</div>
          </div>

          <p className="text-xs text-slate-400">
            Sağlam bir Java uygulamasında bu durum mutlaka kontrol edilmelidir:
            <code className="block mt-1 p-2 bg-slate-950 rounded text-emerald-400 font-mono">
              if (adet &gt; 0) &#123; ... &#125; else &#123; System.out.println("Sayı bulunamadı"); &#125;
            </code>
          </p>
        </div>

        {/* Card 4: Loop Types Comparison */}
        <div className="bg-slate-900/90 border border-slate-800 rounded-xl p-6 space-y-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-sky-500/10 border border-sky-500/30 flex items-center justify-center text-sky-400">
              <Cpu className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-base font-bold text-white">4. Java Döngü Çeşitleri</h2>
              <span className="text-xs text-slate-400 font-mono">for vs while vs do-while</span>
            </div>
          </div>

          <div className="space-y-2.5 text-xs">
            <div className="p-2.5 rounded bg-slate-950 border border-slate-800">
              <span className="font-mono text-sky-300 font-bold block mb-1">for Döngüsü (Önerilen)</span>
              <p className="text-slate-400">
                Başlangıç, bitiş ve artış miktarı önceden bilinen sayma işlemlerinde en derli toplu ve hataya en kapalı yapıdır.
              </p>
            </div>

            <div className="p-2.5 rounded bg-slate-950 border border-slate-800">
              <span className="font-mono text-emerald-300 font-bold block mb-1">while Döngüsü</span>
              <p className="text-slate-400">
                Koşul doğru olduğu sürece devam eder. Sayaç artışı döngü gövdesinde unutulursa sonsuz döngü tehlikesi oluşur.
              </p>
            </div>

            <div className="p-2.5 rounded bg-slate-950 border border-slate-800">
              <span className="font-mono text-amber-300 font-bold block mb-1">do-while Döngüsü</span>
              <p className="text-slate-400">
                Koşula bakılmaksızın en az 1 kez çalışması garanti edilen durumlarda (örn. kullanıcıdan menü seçimi alma) kullanılır.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Complexity & Comparison Table */}
      <div className="bg-slate-900/90 border border-slate-800 rounded-xl p-6 space-y-4">
        <h2 className="text-base font-bold text-white flex items-center gap-2">
          <GitBranch className="w-5 h-5 text-amber-400" />
          Zaman ve Bellek Karmaşıklığı (Complexity Analysis)
        </h2>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs font-mono">
            <thead>
              <tr className="border-b border-slate-800 text-slate-400">
                <th className="py-2.5 px-3">Algoritma Yöntemi</th>
                <th className="py-2.5 px-3">Adım Sayısı</th>
                <th className="py-2.5 px-3">Zaman Karmaşıklığı</th>
                <th className="py-2.5 px-3">Bellek (Space)</th>
                <th className="py-2.5 px-3">Değerlendirme</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/60 text-slate-300">
              <tr>
                <td className="py-2.5 px-3 font-semibold text-white">Standart for (1'er artış)</td>
                <td className="py-2.5 px-3 tabular-nums">N adım</td>
                <td className="py-2.5 px-3 text-amber-400">O(N)</td>
                <td className="py-2.5 px-3 text-emerald-400">O(1)</td>
                <td className="py-2.5 px-3 font-sans text-slate-400">Anlaşılır, ödev standartına uygun</td>
              </tr>
              <tr>
                <td className="py-2.5 px-3 font-semibold text-emerald-300">EKOK Optimize (12'şer artış)</td>
                <td className="py-2.5 px-3 tabular-nums">N / 12 adım</td>
                <td className="py-2.5 px-3 text-emerald-400">O(N / 12)</td>
                <td className="py-2.5 px-3 text-emerald-400">O(1)</td>
                <td className="py-2.5 px-3 font-sans text-emerald-300">12 kat daha hızlı, büyük sayılarda ideal</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
