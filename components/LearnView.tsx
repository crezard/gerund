import React from 'react';

interface LessonCardProps {
  title: string;
  children?: React.ReactNode;
  color?: 'blue' | 'indigo' | 'purple' | 'orange';
}

const colorStyles = {
  blue: {
    bg: 'bg-blue-50',
    border: 'border-blue-100',
    text: 'text-blue-800'
  },
  indigo: {
    bg: 'bg-indigo-50',
    border: 'border-indigo-100',
    text: 'text-indigo-800'
  },
  purple: {
    bg: 'bg-purple-50',
    border: 'border-purple-100',
    text: 'text-purple-800'
  },
  orange: {
    bg: 'bg-orange-50',
    border: 'border-orange-100',
    text: 'text-orange-800'
  }
};

const LessonCard = ({ title, children, color = "indigo" }: LessonCardProps) => {
  const styles = colorStyles[color] || colorStyles.indigo;
  
  return (
    <div className={`bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden mb-6 transition-transform duration-300 hover:shadow-md`}>
      <div className={`${styles.bg} px-6 py-4 border-b ${styles.border}`}>
        <h3 className={`text-lg font-bold ${styles.text}`}>{title}</h3>
      </div>
      <div className="p-6 text-gray-700 leading-relaxed space-y-4">
        {children}
      </div>
    </div>
  );
};

export const LearnView: React.FC = () => {
  return (
    <div className="max-w-3xl mx-auto space-y-6 pb-24 animate-fade-in">
      <div className="text-center py-8">
        <h2 className="text-3xl font-extrabold text-gray-900">동명사 완전 정복</h2>
        <p className="text-gray-500 mt-2">중학교 3학년 필수 영문법, 이것만 알면 끝!</p>
      </div>

      <LessonCard title="1. 동명사(Gerund)란?" color="blue">
        <p>
          동명사는 <span className="font-bold bg-yellow-100 px-1 rounded">동사원형 + -ing</span> 형태로, 
          동사의 성질을 가지고 있지만 문장에서는 <span className="font-bold text-blue-600">명사</span>처럼 쓰입니다.
        </p>
        <p>해석은 <strong>'~하는 것', '~하기'</strong>로 합니다.</p>
        <div className="bg-gray-50 p-4 rounded-lg text-sm text-gray-600">
          <p>예시: I like <strong>swimming</strong>. (나는 수영하는 것을 좋아한다.)</p>
        </div>
      </LessonCard>

      <LessonCard title="2. 동명사의 역할" color="indigo">
        <ul className="list-disc pl-5 space-y-2">
          <li>
            <strong>주어(Subject):</strong> 문장의 맨 앞에 옴. (단수 취급)
            <br/><em className="text-gray-500">Running is fun. (달리는 것은 재미있다.)</em>
          </li>
          <li>
            <strong>목적어(Object):</strong> 일반동사 뒤에 옴.
            <br/><em className="text-gray-500">I enjoy reading. (나는 독서하는 것을 즐긴다.)</em>
          </li>
          <li>
            <strong>보어(Complement):</strong> be동사 뒤에 와서 주어를 설명.
            <br/><em className="text-gray-500">My hobby is drawing. (내 취미는 그림 그리기이다.)</em>
          </li>
        </ul>
      </LessonCard>

      <LessonCard title="3. 동명사 vs 투부정사 목적어" color="purple">
        <div className="grid md:grid-cols-2 gap-4">
          <div className="bg-purple-50 p-4 rounded-lg">
            <h4 className="font-bold text-purple-700 mb-2">동명사만 쓰는 동사 (-ing)</h4>
            <p className="text-sm">enjoy, finish, mind, avoid, give up, keep, practice, suggest</p>
            <p className="text-xs text-gray-500 mt-1">Tip: 과거지향적, 중단, 부정적 뉘앙스가 많아요.</p>
          </div>
          <div className="bg-green-50 p-4 rounded-lg">
            <h4 className="font-bold text-green-700 mb-2">투부정사만 쓰는 동사 (to-v)</h4>
            <p className="text-sm">want, hope, wish, expect, plan, decide, promise</p>
            <p className="text-xs text-gray-500 mt-1">Tip: 미래지향적, 희망, 계획의 뉘앙스가 많아요.</p>
          </div>
        </div>
        <div className="mt-4">
          <h4 className="font-bold text-gray-800">의미가 달라지는 동사들</h4>
          <ul className="mt-2 space-y-2 text-sm border-t pt-2">
            <li><span className="font-semibold text-red-500">remember/forget + ing</span>: 과거의 일을 기억/망각</li>
            <li><span className="font-semibold text-blue-500">remember/forget + to-v</span>: (미래에) 할 일을 기억/망각</li>
            <li><span className="font-semibold text-red-500">stop + ing</span>: ~하는 것을 멈추다</li>
            <li><span className="font-semibold text-blue-500">stop + to-v</span>: ~하기 위해 멈추다</li>
            <li><span className="font-semibold text-red-500">try + ing</span>: 시험 삼아 해보다</li>
            <li><span className="font-semibold text-blue-500">try + to-v</span>: ~하려고 노력하다</li>
          </ul>
        </div>
      </LessonCard>

      <LessonCard title="4. 동명사의 관용 표현" color="orange">
        <ul className="grid grid-cols-1 md:grid-cols-2 gap-2 text-sm">
          <li className="bg-orange-50 p-2 rounded">go ~ing (~하러 가다)</li>
          <li className="bg-orange-50 p-2 rounded">be busy ~ing (~하느라 바쁘다)</li>
          <li className="bg-orange-50 p-2 rounded">look forward to ~ing (~를 고대하다)</li>
          <li className="bg-orange-50 p-2 rounded">cannot help ~ing (~하지 않을 수 없다)</li>
          <li className="bg-orange-50 p-2 rounded">spend 시간/돈 ~ing (~하는 데 쓰다)</li>
          <li className="bg-orange-50 p-2 rounded">It is no use ~ing (~해도 소용없다)</li>
        </ul>
      </LessonCard>
    </div>
  );
};