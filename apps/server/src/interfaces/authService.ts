import { type LoginOutput } from '@/dtos/authDto';
import type { UserSessionData } from '@/sharedTypes';

export interface AuthService {
  whoami: (sessionId: number) => Promise<UserSessionData>;
  login: (email: string, password: string) => Promise<LoginOutput>;
}
