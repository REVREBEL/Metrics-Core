export function getShortcutKey(key: string): { symbol: string; name: string } {
  const lowercaseKey = key.toLowerCase();
  
  // Detect if Mac or Windows for "mod" (Command vs Control)
  const isMac = typeof window !== 'undefined' && /Mac|iPod|iPhone|iPad/.test(window.navigator.userAgent);
  
  switch (lowercaseKey) {
    case 'mod':
    case 'meta':
    case 'cmd':
    case 'command':
      return { symbol: isMac ? '⌘' : 'Ctrl', name: 'Command' };
    case 'ctrl':
    case 'control':
      return { symbol: 'Ctrl', name: 'Control' };
    case 'shift':
      return { symbol: '⇧', name: 'Shift' };
    case 'alt':
    case 'option':
      return { symbol: isMac ? '⌥' : 'Alt', name: 'Alt' };
    case 'enter':
    case 'return':
      return { symbol: '↵', name: 'Enter' };
    case 'backspace':
      return { symbol: '⌫', name: 'Backspace' };
    case 'tab':
      return { symbol: '⇥', name: 'Tab' };
    case 'escape':
    case 'esc':
      return { symbol: '⎋', name: 'Escape' };
    default:
      // Capitalize first letter for display
      return { 
        symbol: key.length === 1 ? key.toUpperCase() : key.charAt(0).toUpperCase() + key.slice(1), 
        name: key 
      };
  }
}
