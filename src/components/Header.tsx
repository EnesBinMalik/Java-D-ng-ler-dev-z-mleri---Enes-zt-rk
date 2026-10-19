import React from 'react';
import { ActiveTab } from '../types';
import { Code2, Sparkles, Terminal } from 'lucide-react';

interface HeaderProps {
  activeTab: ActiveTab;
  onTabChange: (tab: ActiveTab) => void;
  onOpenAuthorModal?: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  activeTab,
  onTabChange,
  onOpenAuthorModal
}) => {
  return (
    <header className="border-b border-slate-800 bg-slate-900/80 backdrop-blur-md sticky top-0 z-40">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between gap-8 h-16">
          {/* Zone 1: Single Wordmark */}
          <div className="flex items-center gap-3 shrink-0">
            <div className="w-9 h-9 rounded-lg bg-amber-500/10 border border-amber-500/20 flex items-center justify-center text-amber-400 font-mono font-bold text-base">
              ☕
            </div>
            <div className="flex flex-col">
              <span className="text-base font-bold tracking-tight text-white whitespace-nowrap">
                Java Döngü Stüdyosu
              </span>
              <span className="text-xs text-slate-400 font-mono">
                İmza: Enes Öztürk
              </span>
            </div>
          </div>

          {/* Zone 2: Navigation Links (Single-Line) */}
          <nav className="hidden md:flex items-center gap-1 overflow-x-auto py-1">
            <button
              onClick={() => onTabChange('homework')}
              className={`px-3 py-1.5 text-xs font-medium rounded-md whitespace-nowrap transition-colors ${
                activeTab === 'homework'
                  ? 'bg-amber-500/15 text-amber-300 border border-amber-500/30'
                  : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/50'
              }`}
            >
              Ödev: 3 ve 4'e Bölünenler
            </button>

            <button
              onClick={() => onTabChange('even_numbers')}
              className={`px-3 py-1.5 text-xs font-medium rounded-md whitespace-nowrap transition-colors ${
                activeTab === 'even_numbers'
                  ? 'bg-sky-500/15 text-sky-300 border border-sky-500/30'
                  : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/50'
              }`}
            >
              Pratik: Çift Sayılar
            </button>

            <button
              onClick={() => onTabChange('code_terminal')}
              className={`px-3 py-1.5 text-xs font-medium rounded-md whitespace-nowrap transition-colors flex items-center gap-1.5 ${
                activeTab === 'code_terminal'
                  ? 'bg-emerald-500/15 text-emerald-300 border border-emerald-500/30'
                  : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/50'
              }`}
            >
              <Terminal className="w-3.5 h-3.5" />
              Java Kod & Konsol
            </button>

            <button
              onClick={() => onTabChange('analysis')}
              className={`px-3 py-1.5 text-xs font-medium rounded-md whitespace-nowrap transition-colors ${
                activeTab === 'analysis'
                  ? 'bg-purple-500/15 text-purple-300 border border-purple-500/30'
                  : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/50'
              }`}
            >
              Algoritma & Analiz
            </button>

            <button
              onClick={() => onTabChange('quiz')}
              className={`px-3 py-1.5 text-xs font-medium rounded-md whitespace-nowrap transition-colors ${
                activeTab === 'quiz'
                  ? 'bg-rose-500/15 text-rose-300 border border-rose-500/30'
                  : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/50'
              }`}
            >
              Kendini Sına
            </button>
          </nav>

          {/* Zone 3: Primary Action */}
          <div className="flex items-center gap-3 shrink-0">
            <button
              onClick={onOpenAuthorModal}
              className="flex items-center gap-2 px-3 py-1.5 rounded-lg text-xs font-semibold bg-gradient-to-r from-amber-500 to-amber-600 text-slate-950 hover:from-amber-400 hover:to-amber-500 transition-all shadow-sm shadow-amber-500/10 cursor-pointer"
            >
              <Code2 className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">Geliştirici İmzası:</span> Enes Öztürk
            </button>
          </div>
        </div>

        {/* Mobile Navigation bar */}
        <div className="flex md:hidden items-center gap-1 overflow-x-auto pb-2 pt-1 border-t border-slate-800/60">
          <button
            onClick={() => onTabChange('homework')}
            className={`px-2.5 py-1 text-xs font-medium rounded-md whitespace-nowrap ${
              activeTab === 'homework' ? 'bg-amber-500/20 text-amber-300' : 'text-slate-400'
            }`}
          >
            Ödev
          </button>
          <button
            onClick={() => onTabChange('even_numbers')}
            className={`px-2.5 py-1 text-xs font-medium rounded-md whitespace-nowrap ${
              activeTab === 'even_numbers' ? 'bg-sky-500/20 text-sky-300' : 'text-slate-400'
            }`}
          >
            Çift Sayılar
          </button>
          <button
            onClick={() => onTabChange('code_terminal')}
            className={`px-2.5 py-1 text-xs font-medium rounded-md whitespace-nowrap ${
              activeTab === 'code_terminal' ? 'bg-emerald-500/20 text-emerald-300' : 'text-slate-400'
            }`}
          >
            Java Kodları
          </button>
          <button
            onClick={() => onTabChange('analysis')}
            className={`px-2.5 py-1 text-xs font-medium rounded-md whitespace-nowrap ${
              activeTab === 'analysis' ? 'bg-purple-500/20 text-purple-300' : 'text-slate-400'
            }`}
          >
            Analiz
          </button>
          <button
            onClick={() => onTabChange('quiz')}
            className={`px-2.5 py-1 text-xs font-medium rounded-md whitespace-nowrap ${
              activeTab === 'quiz' ? 'bg-rose-500/20 text-rose-300' : 'text-slate-400'
            }`}
          >
            Quiz
          </button>
        </div>
      </div>
    </header>
  );
};
