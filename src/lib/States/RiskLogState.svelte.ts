export const RiskLogsState = $state() as IRiskLogs;

export default {
  RiskLogsState,
  RiskLogs
};

interface IRiskLogs {
  logs: IRiskLog[];
  addLog(log: IRiskLog): void;
}

interface IAttributes {
  scope: number;
  quality: number;
  time: number;
  cost: number;
}

export interface IRiskLog {
  title: string;
  category?: Category;
  respond: string;
  attributes: IAttributes;
}

type Category = 'Technical' | 'Management' | 'Commercial' | 'External';

export function RiskLogs(): IRiskLogs {
  const logs: IRiskLog[] = $state([]) as IRiskLog[];

  function addLog(log: IRiskLog) {
    logs.unshift(log);
  }

  return {
    get logs() {
      return logs;
    },
    addLog
  };
}
