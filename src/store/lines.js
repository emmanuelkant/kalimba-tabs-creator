import { writable } from 'svelte/store';

function createLinesStore() {
	const { subscribe, set, update } = writable([{ up: [], down: [] }]);

  function add(nextChord, nextOctave) {
    update(oldLines => {
      oldLines[oldLines.length - 1].up.push(nextOctave);
      oldLines[oldLines.length - 1].down.push(nextChord);
      return oldLines;
    });
  };

  function backspace() {
    update(oldLines => {
      if(oldLines[0].up.length > 0) {
        if (oldLines[oldLines.length - 1].up.length === 0) {
          oldLines.pop();
        } else {
          oldLines[oldLines.length - 1].up.pop();
          oldLines[oldLines.length - 1].down.pop();
        }
      }

      return oldLines
    });
  };

  function newLine() {
    update(oldLines => {
      if (oldLines[oldLines.length - 1].up.length) {
        oldLines.push({ up: [], down: [] });
      }

      return oldLines;
    })
  };

  function changeChordType(callback) {
    update(oldLines => oldLines.map(({ up, down }) => ({ up, down: down.map(callback) })));
  };

  function reset() {
    set([{ up: [], down: [] }])
  };

	return {
		subscribe,
		add,
		backspace,
    newLine,
    changeChordType,
		reset
	};
};

export const lines = createLinesStore();