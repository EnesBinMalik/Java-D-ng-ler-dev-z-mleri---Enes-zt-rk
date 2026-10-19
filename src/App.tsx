import React, { useState } from 'react';
import { ActiveTab } from './types';
import { Header } from './components/Header';
import { HomeworkTab } from './components/HomeworkTab';
import { EvenNumbersTab } from './components/EvenNumbersTab';
import { JavaCodesTab } from './components/JavaCodesTab';
import { AnalysisTab } from './components/AnalysisTab';
import { QuizTab } from './components/QuizTab';
import { AuthorModal } from './components/AuthorModal';
import { Footer } from './components/Footer';

export default function App() {
  const [activeTab, setActiveTab] = useState<ActiveTab>('homework');
  const [isAuthorModalOpen, setIsAuthorModalOpen] = useState<boolean>(false);

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col font-sans selection:bg-amber-500/20 selection:text-amber-300">
      {/* Top Header */}
      <Header
        activeTab={activeTab}
        onTabChange={(tab) => {
          setActiveTab(tab);
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }}
        onOpenAuthorModal={() => setIsAuthorModalOpen(true)}
      />

      {/* Main Content Area */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 pt-8">
        {activeTab === 'homework' && <HomeworkTab />}
        {activeTab === 'even_numbers' && <EvenNumbersTab />}
        {activeTab === 'code_terminal' && <JavaCodesTab />}
        {activeTab === 'analysis' && <AnalysisTab />}
        {activeTab === 'quiz' && <QuizTab />}
      </main>

      {/* Footer */}
      <Footer
        onTabChange={(tab) => {
          setActiveTab(tab);
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }}
        onOpenAuthorModal={() => setIsAuthorModalOpen(true)}
      />

      {/* Author & Signature Modal */}
      <AuthorModal
        isOpen={isAuthorModalOpen}
        onClose={() => setIsAuthorModalOpen(false)}
      />
    </div>
  );
}
