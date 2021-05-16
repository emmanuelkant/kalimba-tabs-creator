import { writable } from 'svelte/store';

export const lines = writable([
  {
    up: [],
    down: []
  },
]);