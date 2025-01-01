import { EnvironmentData } from '../interfaces/environment-data';

declare global {
  var __environmentStore: EnvironmentData | null;
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

  setConfig(config: EnvironmentData) {
    global.__environmentStore = config;
  }

  getConfig(): EnvironmentData | null {
    return global.__environmentStore;
  }
}

export const environmentStore = EnvironmentStore.getInstance();
