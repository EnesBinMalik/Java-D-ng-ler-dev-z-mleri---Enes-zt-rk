import React, { useState } from 'react';
import { JAVA_SNIPPETS } from '../data/javaSnippets';
import { Copy, Check, Terminal, Play, RotateCcw, FileCode, CheckCircle2, Award } from 'lucide-react';

interface TerminalLine {
  type: 'system' | 'prompt' | 'input' | 'output' | 'error' | 'success';
  text: string;
}

export const JavaCodesTab: React.FC = () => {
  const [selectedSnippetId, setSelectedSnippetId] = useState<string>('homework_standard');
  const [copiedId, setCopiedId] = useState<string | null>(null);

  // Terminal Simulator State
  const [terminalInput, setTerminalInput] = useState<string>('50');
  const [terminalHistory, setTerminalHistory] = useState<TerminalLine[]>([
    { type: 'system', text: '$ javac OdevBolunmeOrtalamasi.java' },
    { type: 'system', text: '$ java OdevBolunmeOrtalamasi' },
    { type: 'output', text: '==================================================' },
    { type: 'output', text: '  Java 101 - 3 ve 4\'e Bölünenlerin Ortalaması' },
    { type: 'output', text: '  Geliştirici: Enes Öztürk' },
    { type: 'output', text: '==================================================' },
    { type: 'prompt', text: 'Lütfen bir pozitif tam sayı giriniz: ' }
  ]);
  const [isWaitingInput, setIsWaitingInput] = useState<boolean>(true);

  const activeSnippet = JAVA_SNIPPETS.find((s) => s.id === selectedSnippetId) || JAVA_SNIPPETS[0];

  const handleCopyCode = (code: string, id: string) => {
    navigator.clipboard.writeText(code);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  const handleRunProgram = (inputValue: string) => {
    const num = parseInt(inputValue.trim());
    if (isNaN(num) || num < 0) {
      setTerminalHistory((prev) => [
        ...prev,
        { type: 'input', text: inputValue },
        { type: 'error', text: 'Hata: Lütfen geçerli bir pozitif tam sayı giriniz!' },
        { type: 'prompt', text: 'Lütfen bir pozitif tam sayı giriniz: ' }
      ]);
      return;
    }

    // Run Java simulation logic
    const newLines: TerminalLine[] = [
      { type: 'input', text: inputValue }
    ];

    let toplam = 0;
    let adet = 0;

    for (let i = 1; i <= num; i++) {
      if (i % 3 === 0 && i % 4 === 0) {
        newLines.push({ type: 'output', text: `-> Bulunan sayı: ${i}` });
        toplam += i;
        adet++;
      }
    }

    newLines.push({ type: 'output', text: '--------------------------------------------------' });

    if (adet > 0) {
      const ortalama = toplam / adet;
      newLines.push({ type: 'output', text: `3 ve 4'e tam bölünen sayı adedi : ${adet}` });
      newLines.push({ type: 'output', text: `Bu sayıların toplamı            : ${toplam}` });
      newLines.push({ type: 'success', text: `Bu sayıların ortalaması         : ${ortalama.toFixed(2)}` });
    } else {
      newLines.push({ type: 'error', text: `1 ile ${num} arasında 3 ve 4'e tam bölünen sayı bulunamadı!` });
    }

    newLines.push({ type: 'output', text: '==================================================' });
    newLines.push({ type: 'output', text: 'Program başarıyla tamamlandı. - Enes Öztürk' });
    newLines.push({ type: 'prompt', text: '\nYeni bir sayı giriniz: ' });

    setTerminalHistory((prev) => [...prev, ...newLines]);
    setTerminalInput('');
  };

  const handleResetTerminal = () => {
    setTerminalHistory([
      { type: 'system', text: '$ javac OdevBolunmeOrtalamasi.java' },
      { type: 'system', text: '$ java OdevBolunmeOrtalamasi' },
      { type: 'output', text: '==================================================' },
      { type: 'output', text: '  Java 101 - 3 ve 4\'e Bölünenlerin Ortalaması' },
      { type: 'output', text: '  Geliştirici: Enes Öztürk' },
      { type: 'output', text: '==================================================' },
      { type: 'prompt', text: 'Lütfen bir pozitif tam sayı giriniz: ' }
    ]);
    setTerminalInput('50');
    setIsWaitingInput(true);
  };

  return (
    <div className="space-y-8">
      {/* Introduction */}
      <section className="bg-gradient-to-b from-slate-900 to-slate-900/60 border border-slate-800 rounded-2xl p-6 sm:p-8">
        <div className="max-w-3xl">
          <div className="flex items-center gap-2 text-xs font-mono text-emerald-400 mb-2">
            <span>Kaynak Kodları & Simülasyon</span>
            <span aria-hidden="true">·</span>
            <span>Enes Öztürk İmzasıyla</span>
          </div>

          <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-white mb-3 text-balance">
            Tam Java Kaynak Kodları & Canlı Konsol
          </h1>

          <p className="text-sm sm:text-base text-slate-300 leading-relaxed mb-4">
            Eclipse, IntelliJ IDEA veya VS Code'a doğrudan yapıştırabileceğiniz, <code className="text-emerald-300 font-mono">Scanner</code> girdili, 
            sıfıra bölme kontrollü eksiksiz Java kaynak dosyaları ve web tabanlı interaktif Java terminal simülatörü.
          </p>

          <div className="flex flex-wrap items-center gap-4 text-xs text-slate-400 pt-2 border-t border-slate-800/80">
            <span className="flex items-center gap-1.5 text-slate-300">
              <Award className="w-4 h-4 text-amber-400" />
              <span>Yazar: <strong>Enes Öztürk</strong></span>
            </span>
            <span aria-hidden="true">·</span>
            <span className="flex items-center gap-1.5 text-slate-300">
              <CheckCircle2 className="w-4 h-4 text-emerald-400" />
              <span>Java 8+ / JDK 21 Uyumlu</span>
            </span>
          </div>
        </div>
      </section>

      {/* Main Grid: Code Viewer & Interactive Console */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left Column: Code Selector & Viewer */}
        <div className="lg:col-span-7 space-y-4">
          {/* File Tab Selector */}
          <div className="flex items-center gap-2 overflow-x-auto pb-1">
            {JAVA_SNIPPETS.map((snippet) => (
              <button
                key={snippet.id}
                onClick={() => setSelectedSnippetId(snippet.id)}
                className={`flex items-center gap-2 px-3.5 py-2 rounded-lg text-xs font-mono transition-all whitespace-nowrap ${
                  selectedSnippetId === snippet.id
                    ? 'bg-slate-800 text-amber-300 border border-slate-700 font-bold shadow-sm'
                    : 'text-slate-400 hover:text-slate-200 hover:bg-slate-900 border border-transparent'
                }`}
              >
                <FileCode className="w-3.5 h-3.5" />
                <span>{snippet.fileName}</span>
              </button>
            ))}
          </div>

          {/* Code Container */}
          <div className="bg-slate-950 border border-slate-800 rounded-xl overflow-hidden shadow-xl">
            {/* Window Top Bar */}
            <div className="flex items-center justify-between px-4 py-3 bg-slate-900 border-b border-slate-800">
              <div className="flex items-center gap-3">
                <div className="flex items-center gap-1.5">
                  <div className="w-2.5 h-2.5 rounded-full bg-rose-500/80" />
                  <div className="w-2.5 h-2.5 rounded-full bg-amber-500/80" />
                  <div className="w-2.5 h-2.5 rounded-full bg-emerald-500/80" />
                </div>
                <span className="text-xs font-mono text-slate-300">
                  {activeSnippet.fileName}
                </span>
                <span className="text-[10px] text-slate-500 font-mono hidden sm:inline">
                  — @author {activeSnippet.author}
                </span>
              </div>

              <button
                onClick={() => handleCopyCode(activeSnippet.code, activeSnippet.id)}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold bg-slate-800 text-slate-200 hover:bg-slate-700 hover:text-white transition-all cursor-pointer"
              >
                {copiedId === activeSnippet.id ? (
                  <>
                    <Check className="w-3.5 h-3.5 text-emerald-400" />
                    <span className="text-emerald-400">Kopyalandı!</span>
                  </>
                ) : (
                  <>
                    <Copy className="w-3.5 h-3.5" />
                    <span>Kodu Kopyala</span>
                  </>
                )}
              </button>
            </div>

            {/* Code Body */}
            <div className="p-4 overflow-x-auto max-h-[540px]">
              <pre className="font-mono text-xs text-slate-300 leading-relaxed">
                <code>{activeSnippet.code}</code>
              </pre>
            </div>

            {/* Code Footer Description */}
            <div className="p-3 bg-slate-900/60 border-t border-slate-800/80 text-xs text-slate-400 flex items-center justify-between">
              <span>{activeSnippet.description}</span>
              <span className="font-mono text-amber-400 shrink-0 ml-2">Enes Öztürk</span>
            </div>
          </div>
        </div>

        {/* Right Column: Live Java Terminal Simulator */}
        <div className="lg:col-span-5 space-y-4">
          <div className="bg-slate-950 border border-slate-800 rounded-xl overflow-hidden shadow-xl flex flex-col h-[610px]">
            {/* Terminal Header */}
            <div className="flex items-center justify-between px-4 py-3 bg-slate-900 border-b border-slate-800">
              <div className="flex items-center gap-2">
                <Terminal className="w-4 h-4 text-emerald-400" />
                <span className="text-xs font-mono font-bold text-slate-200">
                  Simüle Java Konsolu (Terminal)
                </span>
              </div>

              <button
                onClick={handleResetTerminal}
                className="p-1.5 text-slate-400 hover:text-white rounded hover:bg-slate-800 transition-colors"
                title="Konsolu Sıfırla"
              >
                <RotateCcw className="w-3.5 h-3.5" />
              </button>
            </div>

            {/* Terminal Screen */}
            <div className="flex-1 p-4 font-mono text-xs overflow-y-auto space-y-1 bg-black/90">
              {terminalHistory.map((line, idx) => (
                <div key={idx} className="leading-relaxed whitespace-pre-wrap">
                  {line.type === 'system' && (
                    <span className="text-slate-500">{line.text}</span>
                  )}
                  {line.type === 'prompt' && (
                    <span className="text-sky-300 font-semibold">{line.text}</span>
                  )}
                  {line.type === 'input' && (
                    <span className="text-amber-300 font-bold underline decoration-amber-500/40">{line.text}</span>
                  )}
                  {line.type === 'output' && (
                    <span className="text-slate-300">{line.text}</span>
                  )}
                  {line.type === 'success' && (
                    <span className="text-emerald-400 font-bold">{line.text}</span>
                  )}
                  {line.type === 'error' && (
                    <span className="text-rose-400">{line.text}</span>
                  )}
                </div>
              ))}
            </div>

            {/* Terminal Input Bar */}
            <div className="p-3 bg-slate-900 border-t border-slate-800">
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  if (terminalInput.trim()) {
                    handleRunProgram(terminalInput);
                  }
                }}
                className="flex items-center gap-2"
              >
                <span className="text-xs font-mono text-sky-400 shrink-0 font-bold">&gt;</span>
                <input
                  type="text"
                  value={terminalInput}
                  onChange={(e) => setTerminalInput(e.target.value)}
                  placeholder="Bir sayı yazıp Enter'a basınız (örn: 50)"
                  className="flex-1 bg-slate-950 border border-slate-700 rounded px-2.5 py-1.5 font-mono text-xs text-white focus:outline-none focus:border-emerald-500"
                />
                <button
                  type="submit"
                  className="flex items-center gap-1 px-3 py-1.5 rounded bg-emerald-600 hover:bg-emerald-500 text-slate-950 font-bold text-xs transition-colors cursor-pointer"
                >
                  <Play className="w-3 h-3 fill-current" />
                  <span>Çalıştır</span>
                </button>
              </form>

              {/* Quick Terminal Presets */}
              <div className="flex items-center gap-1.5 text-[11px] font-mono text-slate-400 mt-2">
                <span>Dene:</span>
                {[12, 50, 100, 5].map((val) => (
                  <button
                    key={val}
                    type="button"
                    onClick={() => {
                      setTerminalInput(val.toString());
                      handleRunProgram(val.toString());
                    }}
                    className="px-1.5 py-0.5 rounded bg-slate-800 text-slate-300 hover:text-white hover:bg-slate-700"
                  >
                    {val}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
