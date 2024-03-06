import { isProd } from '@/env';

export class HttpService {
  private static readonly host = 'todo-list-fullstack-test.vercel.com';

  private static readonly serverPort = 3001;

  private static readonly clientPort = 3000;

  public static readonly serverUrl = isProd ? `https://${this.host}` : `http://localhost:${this.serverPort}`;

  public static readonly clientUrl = isProd ? `https://${this.host}` : `http://localhost:${this.clientPort}`;
}
