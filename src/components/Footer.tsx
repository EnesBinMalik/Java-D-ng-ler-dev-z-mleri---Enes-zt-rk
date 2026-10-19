import React from 'react';
import { ActiveTab } from '../types';
import { Heart, Code2 } from 'lucide-react';

interface FooterProps {
  onTabChange: (tab: ActiveTab) => void;
  onOpenAuthorModal: () => void;
}

export const Footer: React.FC<FooterProps> = ({ onTabChange, onOpenAuthorModal }) => {
  return (
    <footer className="mt-16 border-t border-slate-800/80 bg-slate-950/80 py-10 text-xs text-slate-500">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <span className="font-semibold text-slate-300">Java Döngüler & Ödev Çözümleri</span>
            <span aria-hidden="true">·</span>
            <span>Patika.dev Java 101</span>
          </div>

          <div className="flex items-center gap-4 text-xs">
            <button
              onClick={() => onTabChange('homework')}
              className="text-slate-400 hover:text-white transition-colors"
            >
              Ödev Çözümü
            </button>
            <button
              onClick={() => onTabChange('even_numbers')}
              className="text-slate-400 hover:text-white transition-colors"
            >
              Çift Sayılar
            </button>
            <button
              onClick={() => onTabChange('code_terminal')}
              className="text-slate-400 hover:text-white transition-colors"
            >
              Java Kodları
            </button>
            <button
              onClick={onOpenAuthorModal}
              className="text-amber-400 hover:text-amber-300 font-medium transition-colors"
            >
              Enes Öztürk İmzası
            </button>
          </div>
        </div>

        <div className="mt-6 pt-6 border-t border-slate-900 flex flex-col sm:flex-row items-center justify-between gap-3 text-[11px] text-slate-500">
          <p>
            © {new Date().getFullYear()} — Tüm hakları saklıdır. Java Döngü & Bölünebilme Laboratuvarı.
          </p>
          <div className="flex items-center gap-1.5 font-mono">
            <span>Hazırlayan & Geliştiren:</span>
            <strong className="text-amber-400 font-sans">Enes Öztürk</strong>
          </div>
        </div>
      </div>
    </footer>
  );
};
