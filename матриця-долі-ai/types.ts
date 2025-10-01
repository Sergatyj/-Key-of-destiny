
export interface TelegramWebAppUser {
  id: number;
  is_bot?: boolean;
  first_name: string;
  last_name?: string;
  username?: string;
  language_code?: string;
  is_premium?: boolean;
}

export interface TelegramWebAppInitData {
  user?: TelegramWebAppUser;
}

export interface TelegramWebApp {
  initDataUnsafe: TelegramWebAppInitData;
  ready: () => void;
  expand: () => void;
}

declare global {
  interface Window {
    Telegram: {
      WebApp: TelegramWebApp;
    };
  }
}
