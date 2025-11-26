export enum AppView {
  HOME = 'HOME',
  LEARN = 'LEARN',
  QUIZ = 'QUIZ',
  CHAT = 'CHAT'
}

export interface QuizQuestion {
  question: string;
  options: string[];
  correctAnswerIndex: number;
  explanation: string;
}

export interface ChatMessage {
  id: string;
  role: 'user' | 'model';
  text: string;
  isError?: boolean;
}

export enum GerundTopic {
  BASICS = '기본 개념',
  ROLES = '문장 성분 (주어/목적어/보어)',
  PREPOSITIONS = '전치사의 목적어',
  VERBS_GERUND_ONLY = '동명사만 목적어로 취하는 동사',
  VERBS_DIFF_MEANING = '의미가 달라지는 동사'
}
