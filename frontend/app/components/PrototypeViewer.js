import { useState } from 'react';
import { MobilePrototype } from '../prototypes/MobilePrototype';
import { TabletPrototype } from '../prototypes/TabletPrototype';
import { DesktopPrototype } from '../prototypes/DesktopPrototype';

export function PrototypeViewer({ onBack }) {
  const [activeView, setActiveView] = useState('mobile');

  return (
    <div className="min-h-screen bg-background">
      <div className="bg-primary text-primary-foreground shadow-lg sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-4">
              {onBack && (
                <button
                  onClick={onBack}
                  className="px-4 py-2 bg-primary-foreground/10 hover:bg-primary-foreground/20 rounded-lg transition-colors flex items-center gap-2"
                >
                  <svg
                    className="w-5 h-5"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M10 19l-7-7m0 0l7-7m-7 7h18"
                    />
                  </svg>
                  Voltar ao App
                </button>
              )}
              <h1 className="text-xl sm:text-2xl">Protótipos Visuais - Sistema de Cadastro</h1>
            </div>
            <div className="flex gap-2 bg-primary-foreground/10 p-1 rounded-lg">
              <button
                onClick={() => setActiveView('mobile')}
                className={`px-4 py-2 rounded-md transition-colors ${
                  activeView === 'mobile'
                    ? 'bg-primary-foreground text-primary'
                    : 'hover:bg-primary-foreground/20'
                }`}
              >
                Mobile
              </button>
              <button
                onClick={() => setActiveView('tablet')}
                className={`px-4 py-2 rounded-md transition-colors ${
                  activeView === 'tablet'
                    ? 'bg-primary-foreground text-primary'
                    : 'hover:bg-primary-foreground/20'
                }`}
              >
                Tablet
              </button>
              <button
                onClick={() => setActiveView('desktop')}
                className={`px-4 py-2 rounded-md transition-colors ${
                  activeView === 'desktop'
                    ? 'bg-primary-foreground text-primary'
                    : 'hover:bg-primary-foreground/20'
                }`}
              >
                Desktop
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="w-full">
        {activeView === 'mobile' && <MobilePrototype />}
        {activeView === 'tablet' && <TabletPrototype />}
        {activeView === 'desktop' && <DesktopPrototype />}
      </div>
    </div>
  );
}
