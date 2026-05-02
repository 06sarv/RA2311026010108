import { useState } from 'react';

export function useLogs(initialValue = []) {
  const [logs, setLogs] = useState(Array.isArray(initialValue) ? initialValue : []);

  function appendLog(entry) {
    setLogs((currentLogs) => {
      const nextLogs = [
        {
          ...entry,
          id: `${Date.now()}-${Math.random().toString(16).slice(2, 8)}`,
        },
        ...currentLogs,
      ];

      return nextLogs.slice(0, 6);
    });
  }

  return {
    logs,
    appendLog,
  };
}
