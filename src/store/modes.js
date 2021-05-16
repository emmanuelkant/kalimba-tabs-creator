import { writable } from 'svelte/store';

function createModeStore() {
  const { subscribe, update, set } = writable(false);

  return {
    subscribe,
    toggle: () => update(mode => !mode),
    turnOff: () => set(false)
  }
};

export const editMode = createModeStore();

export const deleteMode = createModeStore();