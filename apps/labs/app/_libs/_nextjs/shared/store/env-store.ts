export interface EnvironmentConfig {
  environmentId: string;
  publicKey: string;
  baseURL?: string;
}

declare global {
  var __environmentStore: EnvironmentConfig | null;
}

class EnvironmentStore {
  private static instance: EnvironmentStore;

  private constructor() {
    // Initialize global variable if it doesn't exist
    if (typeof global.__environmentStore === 'undefined') {
      global.__environmentStore = null;
    }
  }

  static getInstance(): EnvironmentStore {
    if (!EnvironmentStore.instance) {
      EnvironmentStore.instance = new EnvironmentStore();
    }
    return EnvironmentStore.instance;
  }

  setConfig(config: EnvironmentConfig) {
    global.__environmentStore = config;
  }

  getConfig(): EnvironmentConfig | null {
    return global.__environmentStore;
  }
}

export const environmentStore = EnvironmentStore.getInstance();
