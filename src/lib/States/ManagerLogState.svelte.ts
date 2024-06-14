export const ManagerLogsState = $state() as IManagerLogs;

export default {
  ManagerLogsState,
  ManagerLogs
};

interface IManagerLogs {
  logs: IManagerLog[];
  addLog(log: IManagerLog): void;
}


export interface IManagerLog {
  title: string;
  message: string;
}



export function ManagerLogs(): IManagerLogs {
  const logs: IManagerLog[] = $state([]) as IManagerLog[];

  function addLog(log: IManagerLog) {
    logs.push(log);
  }

  return {
    get logs() {
      return logs;
    },
    addLog
  };
}
