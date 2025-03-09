/**
 * 食物记录的状态
 */
export enum FoodRecordStatus {
  /** 正在创建 */
  CREATING = 'creating',
  /** 正在分析 */
  ANALYZING = 'analyzing',
  /** 分析完成 */
  COMPLETED = 'completed',
  /** 分析失败 */
  FAILED = 'failed',
}

/**
 * 食物记录的营养成分
 */
export interface FoodNutrition {
  /** 卡路里 (千卡) */
  calories: number;
  /** 蛋白质 (克) */
  protein: number;
  /** 脂肪 (克) */
  fat: number;
  /** 碳水化合物 (克) */
  carbs: number;
  /** 纤维素 (克) */
  fiber: number;
  /** 糖 (克) */
  sugar: number;
  /** 钠 (毫克) */
  sodium: number;
}

/**
 * 食物记录
 */
export interface FoodRecord {
  /** 记录 ID */
  id: string;
  /** 创建时间 */
  createdAt: Date;
  /** 对应的用餐时间 */
  mealTime: Date;
  /** 食物名称 */
  name: string;
  /** 食物描述 */
  description: string;
  /** 食物图片 URL 列表 */
  imageUrls: string[];
  /** 记录状态 */
  status: FoodRecordStatus;
  /** 营养成分，仅在状态为 COMPLETED 时有效 */
  nutrition?: FoodNutrition;
}

/**
 * 生成唯一 ID
 */
export function generateId(): string {
  return Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);
}

/**
 * 格式化日期为 YYYY-MM-DD
 */
export function formatDate(date: Date): string {
  return date.toISOString().split('T')[0] ?? '';
}

/**
 * 格式化时间为 HH:MM
 */
export function formatTime(date: Date): string {
  const timePart = date.toTimeString().split(' ')[0];
  return timePart ? timePart.substring(0, 5) : '';
}

/**
 * 格式化日期时间为 YYYY-MM-DD HH:MM
 */
export function formatDateTime(date: Date): string {
  return `${formatDate(date)} ${formatTime(date)}`;
}

/**
 * 获取状态文本
 */
export function getStatusText(status: FoodRecordStatus): string {
  switch (status) {
    case FoodRecordStatus.CREATING:
      return '正在创建';
    case FoodRecordStatus.ANALYZING:
      return '正在分析';
    case FoodRecordStatus.COMPLETED:
      return '分析完成';
    case FoodRecordStatus.FAILED:
      return '分析失败';
    default:
      return '未知状态';
  }
}
