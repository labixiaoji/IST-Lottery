export interface PrizeLevel {
  id: string;
  name: string;      // 奖项名称（如"一等奖"）
  count: number;     // 该奖项数量
  remaining: number; // 剩余数量
  color: string;     // 主题颜色
  musicUrl?: string; // 中奖音乐URL
}

export interface Ticket {
  number: number;    // 奖券编号
  isDrawn: boolean;  // 是否已抽取
  drawnAt?: string;  // 抽取时间 (ISO string)
  prizeLevelId?: string; // 中奖等级ID
}

export interface DrawRecord {
  id: string;
  ticketNumber: number;
  prizeLevelId: string;
  prizeLevelName: string; // Snapshot of name
  drawnAt: string;
  isRevoked: boolean;
}

export interface AppConfig {
  startNumber: number;       // 起始编号
  endNumber: number;         // 结束编号
  animationSpeed: number;    // 动画速度 (1: Slow, 2: Normal, 3: Fast)
  soundEnabled: boolean;     // 全局音效开关
}

export interface AppState {
  tickets: Ticket[];           // 所有奖券
  prizeLevels: PrizeLevel[];    // 奖项等级配置
  drawRecords: DrawRecord[];  // 抽奖历史
  currentPrizeLevelId: string | null;   // 当前抽奖等级ID
  isDrawing: boolean;         // 是否正在抽奖
  config: AppConfig;
}

export interface AppActions {
  // 配置相关
  setTicketRange: (start: number, end: number) => void;
  addPrizeLevel: (level: Omit<PrizeLevel, 'id' | 'remaining' | 'color'> & { color?: string }) => void;
  updatePrizeLevel: (id: string, updates: Partial<PrizeLevel>) => void;
  removePrizeLevel: (id: string) => void;
  setCurrentPrizeLevel: (id: string) => void;
  
  // 抽奖相关
  startDrawing: () => void;
  stopDrawing: () => void;
  completeDraw: (ticketNumber: number) => void;
  
  // 撤销相关
  revokeDraw: (recordId: string) => void;
  
  // 重置相关
  resetAll: () => void;
  resetPool: () => void;
  
  // 设置相关
  updateConfig: (updates: Partial<AppConfig>) => void;
}
