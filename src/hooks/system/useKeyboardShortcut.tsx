import { useEffect } from 'react';

type KeyActionMap = {
  [key: string]: () => void;
};

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