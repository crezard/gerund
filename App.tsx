import React, { useState } from 'react';
import { Navigation } from './components/Navigation';
import { LearnView } from './components/LearnView';
import { QuizView } from './components/QuizView';
import { ChatTutor } from './components/ChatTutor';
import { AppView } from './types';

const App: React.FC = () => {
  const [currentView, setCurrentView] = useState<AppView>(AppView.HOME);

  // Render content based on view
  const renderContent = () => {
    switch (currentView) {
      case AppView.HOME:
        return (
          <div className="flex flex-col items-center justify-center min-h-[80vh] text-center px-4 space-y-8 animate-fade-in">
            <div className="space-y-4">
              <span className="inline-block px-4 py-1.5 bg-indigo-100 text-indigo-700 rounded-full text-sm font-bold tracking-wide">
                중3 영어 문법 시리즈
              </span>
              <h1 className="text-4xl md:text-6xl font-black text-gray-900 leading-tight">
                Gerund<span className="text-indigo-600">Master</span>
              </h1>
              <p className="text-lg md:text-xl text-gray-500 max-w-lg mx-auto">
                AI와 함께하는 스마트한 동명사 학습.<br/>
                개념 정리부터 무한 실전 퀴즈까지 한번에 끝내세요.
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 w-full max-w-2xl mt-8">
              <button onClick={() => setCurrentView(AppView.LEARN)} className="group p-6 bg-white rounded-2xl shadow-sm border border-gray-100 hover:border-blue-200 hover:shadow-lg transition-all duration-300">
                <div className="text-4xl mb-3 group-hover:scale-110 transition-transform duration-300">📚</div>
                <h3 className="font-bold text-gray-800 text-lg">개념 학습</h3>
                <p className="text-sm text-gray-500 mt-1">핵심 요약 정리 노트</p>
              </button>
              <button onClick={() => setCurrentView(AppView.QUIZ)} className="group p-6 bg-white rounded-2xl shadow-sm border border-gray-100 hover:border-purple-200 hover:shadow-lg transition-all duration-300">
                <div className="text-4xl mb-3 group-hover:scale-110 transition-transform duration-300">🧠</div>
                <h3 className="font-bold text-gray-800 text-lg">실전 퀴즈</h3>
                <p className="text-sm text-gray-500 mt-1">AI 무한 문제 생성</p>
              </button>
              <button onClick={() => setCurrentView(AppView.CHAT)} className="group p-6 bg-white rounded-2xl shadow-sm border border-gray-100 hover:border-green-200 hover:shadow-lg transition-all duration-300">
                <div className="text-4xl mb-3 group-hover:scale-110 transition-transform duration-300">💬</div>
                <h3 className="font-bold text-gray-800 text-lg">AI 튜터</h3>
                <p className="text-sm text-gray-500 mt-1">궁금한 점 즉시 해결</p>
              </button>
            </div>
          </div>
        );
      case AppView.LEARN:
        return <LearnView />;
      case AppView.QUIZ:
        return <QuizView />;
      case AppView.CHAT:
        return <ChatTutor />;
      default:
        return <div>Not found</div>;
    }
  };

  return (
    <div className="flex min-h-screen bg-[#f8fafc]">
      <Navigation currentView={currentView} setView={setCurrentView} />
      
      <main className="flex-1 p-4 md:p-8 overflow-y-auto md:h-screen w-full">
        {renderContent()}
      </main>
    </div>
  );
};

export default App;
