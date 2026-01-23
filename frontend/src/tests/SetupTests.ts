import '@testing-library/jest-dom';
import { vi, afterEach, beforeEach } from 'vitest';

// 1. Create a mock for localStorage
const localStorageMock = (() => {
  let store: Record<string, string> = {};
  return {
    getItem: vi.fn((key: string) => store[key] || null),
    setItem: vi.fn((key: string, value: string) => {
      store[key] = value.toString();
    }),
    clear: vi.fn(() => {
      store = {};
    }),
    removeItem: vi.fn((key: string) => {
      delete store[key];
    }),
    length: 0,
    key: vi.fn((index: number) => Object.keys(store)[index] || null),
  };
})();

// 2. Attach it to the global 'window' and 'global' objects
Object.defineProperty(window, 'localStorage', { value: localStorageMock });

// 3. Mock geolocation
const geolocationMock = {
  getCurrentPosition: vi.fn((success) => {
    success({
      coords: {
        latitude: 28.6024,
        longitude: -81.2001,
        accuracy: 100,
        altitude: null,
        altitudeAccuracy: null,
        heading: null,
        speed: null,
      },
      timestamp: Date.now(),
    });
  }),
  watchPosition: vi.fn(() => 1),
  clearWatch: vi.fn(),
};

Object.defineProperty(navigator, 'geolocation', {
  value: geolocationMock,
  writable: true,
});

// 4. Use fake timers and clean up after each test
beforeEach(() => {
  vi.useFakeTimers({ shouldAdvanceTime: true });
});

afterEach(() => {
  vi.runOnlyPendingTimers();
  vi.useRealTimers();
  vi.clearAllMocks();
});