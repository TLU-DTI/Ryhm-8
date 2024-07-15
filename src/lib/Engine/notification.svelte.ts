import type { Component } from 'svelte';
import Manager_Happy from '$lib/UI/Notification/People/Manager/Happy.svelte';
import Manager_UnHappy from '$lib/UI/Notification/People/Manager/Unhappy.svelte';
import Manager_Mad from '$lib/UI/Notification/People/Manager/Mad.svelte';
import Manager_Evil from '$lib/UI/Notification/People/Manager/Evil.svelte';

export const people = <const>[
  {
    name: 'Manager',
    moods: [
      {
        mood: 'Happy',
        icon: Manager_Happy
      },
      {
        mood: 'UnHappy',
        icon: Manager_UnHappy
      },
      {
        mood: 'Mad',
        icon: Manager_Mad
      },
      {
        mood: 'Evil',
        icon: Manager_Evil
      }
    ]
  }
];

type PersonName = (typeof people)[number]['name'];
type PersonMood = (typeof people)[number]['moods'][number]['mood'];

export class Notification {
  name: PersonName;
  message: string;
  mood: string;

  constructor(name: PersonName, message: string, mood: PersonMood) {
    this.name = name;
    this.message = message;
    this.mood = mood;
  }
}

export class Notifications {
  notifications: Notification[] | undefined = $state();

  add(notification: Notification) {
    if (this.notifications === undefined) {
      this.notifications = [];
    }

    this.notifications.push(notification);
  }

  clear() {
    this.notifications = undefined;
  }
}
