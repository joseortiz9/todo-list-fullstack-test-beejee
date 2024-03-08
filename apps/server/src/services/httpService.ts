import { isTest } from '@/env';

export class HttpService {
  private static readonly host = 'todo-list-fullstack-test.vercel.app';

  private static readonly serverPort = 3001;

  private static readonly clientPort = 3000;

  public static readonly serverUrl = isTest ? `https://${this.host}` : `http://localhost:${this.serverPort}`;

  public static readonly clientUrl = isTest ? `https://${this.host}` : `http://localhost:${this.clientPort}`;
}
