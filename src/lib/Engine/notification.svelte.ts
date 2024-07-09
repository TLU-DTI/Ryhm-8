import type { Component } from "svelte";
import Manager_Happy from '$lib/UI/Notification/People/Manager/Happy.svelte';
import Manager_UnHappy from '$lib/UI/Notification/People/Manager/Unhappy.svelte';
import Manager_Mad from '$lib/UI/Notification/People/Manager/Mad.svelte';
import Manager_Evil from '$lib/UI/Notification/People/Manager/Evil.svelte';

const people = <const>[
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
]

type PersonName = typeof people[number]['name']
type PersonMood = typeof people[number]['moods'][number]['mood']

export class Notification {
  name: PersonName;
  message: string;
  mood: string;

  _icon: Component;
  get icon() { return this._icon; }

  constructor(name: PersonName, message: string, mood: PersonMood) {
    console.assert(people.find(p => p.name === name) !== undefined, 'Person not found: ' + name);
    console.assert(people.find(p => p.name === name)?.moods.find(m => m.mood === mood) !== undefined,
      'Mood not found for ' + name + ': ' + mood
    );

    this.name = name;
    this.message = message;
    this.mood = mood;

    this._icon = people
      .find(p => p.name === name)?.moods
      .find(m => m.mood === mood)?.icon as Component;
  }
}

export class Notifications {
  private _notifications: Notification[] | undefined = $state();
  get notifications() { return this._notifications; }

  add(notification: Notification) {
    if (this._notifications === undefined) {
      this._notifications = [];
    }

    this._notifications.push(notification);
  }

  clear() {
    this._notifications = undefined;
  }
}