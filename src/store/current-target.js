import { writable } from 'svelte/store';

function createCurrentTarget() {
  const { subscribe, set } = writable([]);

  return {
    subscribe,
    set: (line, chord) => set([line, chord]),
    clear: () => set([])
  }
};

export const currentTarget = createCurrentTarget();