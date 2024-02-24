import { useEffect } from 'react';

type KeyActionMap = {
  [key: string]: () => void;
};

/**
 * Custom hook that allows registering keyboard shortcuts and their corresponding actions.
 *
 * @param keyActionMap - An object mapping key combinations to action functions.
 */
export const useKeyboardShortcut = (keyActionMap: KeyActionMap) => {
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      const keyCombination = `${event.ctrlKey ? 'Control+' : ''}${event.altKey ? 'Alt+' : ''}${event.key}`;
      const action = keyActionMap[keyCombination];
      if (action) {
        action();
      }
    };

    window.addEventListener('keydown', handleKeyDown);

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [keyActionMap]);
}