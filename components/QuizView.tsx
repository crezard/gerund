import React, { useState } from 'react';
import { generateQuizQuestions } from '../services/geminiService';
import { QuizQuestion, GerundTopic } from '../types';

export const QuizView: React.FC = () => {
  const [questions, setQuestions] = useState<QuizQuestion[]>([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedTopic, setSelectedTopic] = useState<GerundTopic | null>(null);
  const [loading, setLoading] = useState(false);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [score, setScore] = useState(0);
  const [showResult, setShowResult] = useState(false);
  const [quizCompleted, setQuizCompleted] = useState(false);

  const startQuiz = async (topic: GerundTopic) => {
    setSelectedTopic(topic);
    setLoading(true);
    setQuizCompleted(false);
    setQuestions([]);
    setScore(0);
    setCurrentQuestionIndex(0);
    setShowResult(false);

    try {
      const qs = await generateQuizQuestions(topic, 5);
      setQuestions(qs);
    } catch (e) {
      alert("퀴즈 생성 중 오류가 발생했습니다. 잠시 후 다시 시도해주세요.");
      setSelectedTopic(null);
    } finally {
      setLoading(false);
    }
  };

  const handleAnswer = (index: number) => {
    if (showResult) return;
    setSelectedAnswer(index);
    setShowResult(true);
    if (index === questions[currentQuestionIndex].correctAnswerIndex) {
      setScore(prev => prev + 1);
    }
  };

  const nextQuestion = () => {
    setSelectedAnswer(null);
    setShowResult(false);
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(prev => prev + 1);
    } else {
      setQuizCompleted(true);
    }
  };

  const resetQuiz = () => {
    setSelectedTopic(null);
    setQuestions([]);
    setQuizCompleted(false);
  };

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center h-full min-h-[50vh] space-y-4">
        <div className="w-16 h-16 border-4 border-indigo-200 border-t-indigo-600 rounded-full animate-spin"></div>
        <p className="text-gray-600 font-medium animate-pulse">AI가 문제를 출제하고 있습니다...</p>
        <p className="text-sm text-gray-400">"{selectedTopic}" 관련 문제 생성 중</p>
      </div>
    );
  }

  if (quizCompleted) {
    return (
      <div className="flex flex-col items-center justify-center h-full min-h-[50vh] text-center px-6">
        <div className="bg-white p-8 rounded-3xl shadow-xl max-w-md w-full">
          <div className="text-6xl mb-4">🎉</div>
          <h2 className="text-2xl font-bold text-gray-800 mb-2">퀴즈 완료!</h2>
          <p className="text-gray-600 mb-6">수고하셨습니다.</p>
          
          <div className="mb-8">
            <span className="text-5xl font-extrabold text-indigo-600">{score}</span>
            <span className="text-gray-400 text-2xl"> / {questions.length}</span>
          </div>

          <button 
            onClick={resetQuiz}
            className="w-full py-3 bg-indigo-600 text-white rounded-xl font-semibold hover:bg-indigo-700 transition-colors shadow-lg shadow-indigo-200"
          >
            새로운 주제 선택하기
          </button>
        </div>
      </div>
    );
  }

  if (questions.length > 0) {
    const question = questions[currentQuestionIndex];
    return (
      <div className="max-w-2xl mx-auto pb-24">
        {/* Progress Bar */}
        <div className="mb-6 flex items-center justify-between text-sm text-gray-500 font-medium">
          <span>Question {currentQuestionIndex + 1} / {questions.length}</span>
          <span>Score: {score}</span>
        </div>
        <div className="w-full bg-gray-200 rounded-full h-2.5 mb-8">
          <div 
            className="bg-indigo-600 h-2.5 rounded-full transition-all duration-300" 
            style={{ width: `${((currentQuestionIndex + 1) / questions.length) * 100}%` }}
          ></div>
        </div>

        {/* Question Card */}
        <div className="bg-white rounded-2xl shadow-lg p-6 md:p-8 mb-6">
          <h3 className="text-xl md:text-2xl font-bold text-gray-800 mb-6 leading-relaxed">
            {question.question}
          </h3>

          <div className="space-y-3">
            {question.options.map((option, idx) => {
              let btnClass = "w-full text-left p-4 rounded-xl border-2 transition-all duration-200 font-medium text-gray-700 ";
              
              if (showResult) {
                if (idx === question.correctAnswerIndex) {
                  btnClass += "border-green-500 bg-green-50 text-green-800";
                } else if (idx === selectedAnswer) {
                  btnClass += "border-red-500 bg-red-50 text-red-800";
                } else {
                  btnClass += "border-gray-100 opacity-50";
                }
              } else {
                btnClass += "border-gray-100 hover:border-indigo-200 hover:bg-indigo-50";
              }

              return (
                <button
                  key={idx}
                  onClick={() => handleAnswer(idx)}
                  disabled={showResult}
                  className={btnClass}
                >
                  <span className="inline-block w-6 font-bold mr-2">{String.fromCharCode(65 + idx)}.</span>
                  {option}
                </button>
              );
            })}
          </div>
        </div>

        {/* Explanation & Next Button */}
        {showResult && (
          <div className="space-y-6 animate-fade-in-up">
            <div className={`p-6 rounded-xl ${selectedAnswer === question.correctAnswerIndex ? 'bg-green-100 border-l-4 border-green-500' : 'bg-red-50 border-l-4 border-red-500'}`}>
              <h4 className={`font-bold mb-2 ${selectedAnswer === question.correctAnswerIndex ? 'text-green-800' : 'text-red-800'}`}>
                {selectedAnswer === question.correctAnswerIndex ? '정답입니다!' : '오답입니다.'}
              </h4>
              <p className="text-gray-700">{question.explanation}</p>
            </div>
            
            <button
              onClick={nextQuestion}
              className="w-full py-4 bg-indigo-600 text-white rounded-xl font-bold hover:bg-indigo-700 shadow-lg shadow-indigo-200 transition-transform active:scale-95"
            >
              {currentQuestionIndex < questions.length - 1 ? '다음 문제' : '결과 보기'}
            </button>
          </div>
        )}
      </div>
    );
  }

  // Topic Selection View
  return (
    <div className="max-w-4xl mx-auto pb-24">
      <div className="text-center py-8">
        <h2 className="text-2xl font-bold text-gray-900">도전! 실전 문제 풀이</h2>
        <p className="text-gray-500 mt-2">주제를 선택하면 AI가 새로운 문제를 만들어드려요.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 px-4">
        {Object.values(GerundTopic).map((topic) => (
          <button
            key={topic}
            onClick={() => startQuiz(topic)}
            className="flex flex-col items-center justify-center p-6 bg-white rounded-2xl shadow-sm border border-gray-100 hover:shadow-md hover:border-indigo-200 hover:-translate-y-1 transition-all duration-300 group"
          >
            <div className="w-12 h-12 bg-indigo-50 rounded-full flex items-center justify-center mb-4 text-2xl group-hover:scale-110 transition-transform">
              📝
            </div>
            <span className="font-bold text-gray-800 group-hover:text-indigo-600">{topic}</span>
          </button>
        ))}
      </div>
    </div>
  );
};
