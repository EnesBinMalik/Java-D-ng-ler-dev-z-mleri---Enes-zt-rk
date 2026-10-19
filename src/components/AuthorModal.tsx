import React, { useState } from 'react';
import { Check, Copy, User, X, BookOpen, ShieldCheck, Award } from 'lucide-react';

interface AuthorModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const AuthorModal: React.FC<AuthorModalProps> = ({ isOpen, onClose }) => {
  const [copied, setCopied] = useState(false);

  if (!isOpen) return null;

  const javaDocSignature = `/**
 * @title    Java 101 - Döngüler & Bölünebilme Ortalaması
 * @author   Enes Öztürk
 * @note     Java döngü yapıları, mod operatörü (%) ve 
 *           sıfıra bölme koruması içeren eksiksiz ödev çözümü.
 * @version  1.0.0
 */`;

  const handleCopy = () => {
    navigator.clipboard.writeText(javaDocSignature);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm animate-in fade-in duration-150">
      <div 
        className="w-full max-w-lg bg-slate-900 border border-slate-800 rounded-2xl shadow-2xl overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between p-5 border-b border-slate-800 bg-slate-950/50">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-amber-500/10 border border-amber-500/30 flex items-center justify-center text-amber-400">
              <Award className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-base font-bold text-white">Geliştirici İmzası & Bilgileri</h3>
              <p className="text-xs text-slate-400">Patika.dev Java 101 Eğitimi Ödevi</p>
            </div>
          </div>
          <button 
            onClick={onClose}
            className="p-1.5 text-slate-400 hover:text-white rounded-lg hover:bg-slate-800 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 space-y-5">
          <div className="p-4 rounded-xl bg-slate-800/40 border border-slate-800 space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-xs font-medium text-slate-400">Proje Sahibi</span>
              <span className="text-sm font-bold text-amber-300">Enes Öztürk</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-xs font-medium text-slate-400">Konu</span>
              <span className="text-xs text-slate-300">Java Döngüler ile 3 ve 4'e Bölünenlerin Ortalaması</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-xs font-medium text-slate-400">Algoritma Kuralı</span>
              <span className="text-xs font-mono text-emerald-400">i % 3 == 0 && i % 4 == 0 (EKOK 12)</span>
            </div>
          </div>

          <div className="space-y-2">
            <h4 className="text-xs font-semibold text-slate-300 uppercase tracking-wider flex items-center gap-1.5">
              <ShieldCheck className="w-4 h-4 text-amber-400" />
              Enes Öztürk'ün Kodlama Prensipleri:
            </h4>
            <ul className="text-xs text-slate-300 space-y-1.5 pl-1">
              <li className="flex items-start gap-2">
                <span className="text-amber-400 font-bold">•</span>
                <span><strong>Sıfıra Bölme Koruması:</strong> Sayı 12'den küçükse veya eşleşme yoksa <code className="text-amber-300 bg-slate-800 px-1 py-0.5 rounded font-mono">adet &gt; 0</code> kontrolüyle <code className="text-rose-400 font-mono">ArithmeticException</code> engellenir.</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-amber-400 font-bold">•</span>
                <span><strong>Doğru Ortalama (Double Casting):</strong> Java'da <code className="text-amber-300 bg-slate-800 px-1 py-0.5 rounded font-mono">(double) toplam / adet</code> yapılarak tamsayı bölme hatası önlenir.</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-amber-400 font-bold">•</span>
                <span><strong>Anlaşılır Konsol Çıktısı:</strong> Kullanıcıdan <code className="text-sky-300 font-mono">Scanner</code> ile veri alıp adım adım sonuç bildiren estetik arayüz.</span>
              </li>
            </ul>
          </div>

          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-xs font-medium text-slate-400">JavaDoc İmzası (Kopyalanabilir)</span>
              <button
                onClick={handleCopy}
                className="flex items-center gap-1 text-xs text-amber-400 hover:text-amber-300 cursor-pointer"
              >
                {copied ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
                <span>{copied ? 'Kopyalandı!' : 'Kopyala'}</span>
              </button>
            </div>
            <pre className="p-3 bg-slate-950 border border-slate-800 rounded-lg text-xs font-mono text-slate-300 overflow-x-auto leading-relaxed">
              {javaDocSignature}
            </pre>
          </div>
        </div>

        {/* Footer */}
        <div className="p-4 border-t border-slate-800 bg-slate-950/40 flex justify-end">
          <button
            onClick={onClose}
            className="px-4 py-2 text-xs font-semibold rounded-lg bg-slate-800 text-slate-200 hover:bg-slate-700 transition-colors"
          >
            Kapat
          </button>
        </div>
      </div>
    </div>
  );
};
