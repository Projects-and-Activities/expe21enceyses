import { ASCII_CHARS_SAFE } from './constants';

// Global reactive state
export const asciiState = $state({
  currentChars: ASCII_CHARS_SAFE
});

// Helper to reset
export function resetAscii() {
  asciiState.currentChars = ASCII_CHARS_SAFE;
}
