import { User } from '@/types/user';
import { v4 as uuidv4 } from 'uuid';

// 模拟用户数据库
const users: User[] = [];

export const userService = {
  // 根据邮箱查找用户
  findByEmail: (email: string): User | undefined => {
    return users.find((user) => user.email === email);
  },

  // 创建新用户
  create: (userData: Omit<User, 'id' | 'createdAt' | 'updatedAt'>): User => {
    const newUser: User = {
      id: uuidv4(),
      ...userData,
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    users.push(newUser);
    return newUser;
  },

  // 获取所有用户（仅用于测试）
  getAll: (): User[] => {
    return [...users];
  },
};
