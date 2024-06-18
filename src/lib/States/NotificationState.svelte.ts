import type { Component } from "svelte";

export const NotificationState = $state() as INotification;

export default {
  NotificationState,
  Notification
};

type PersonName = "Manager";


interface INotification {
}

export interface INotificationProps {
  name: PersonName;
  icon: Component;
  message: string;
}

export function Notification(): INotification {

  return {
  };
}