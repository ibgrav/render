export const ext = "";

declare global {
  namespace HBS {
    interface VueApp {
      id?: string;
      name: string;
      props?: Record<string, any>;
    }

    interface AppScript {
      name: string;
      args?: any[];
    }
  }
}
