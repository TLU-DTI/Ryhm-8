import type { Component } from "svelte";

export const NotificationState: INotification = undefined as unknown as INotification;

export default {
  NotificationState,
  Notification
};

type PersonName = "Manager";


export interface INotification {
  notification: INotificationProps | undefined;
  setNotification(notifi: INotificationProps): void;
  delNotification(): void;
}

export interface INotificationProps {
  name: PersonName;
  icon?: Component;
  message: string;
}

export function Notification(): INotification {
  let notification: INotificationProps | undefined = $state();

  function setNotification(notifi: INotificationProps) {
    notification = notifi;
  }

  function delNotification() {
    notification = undefined;
  }

  return {
    get notification() {
      return notification;
    },
    setNotification,
    delNotification
  };
}