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

  function edit(nextChord, nextOctave, position) {
    if (position.length !== 0) {
      update(oldLines => {
        oldLines[position[0]].up[position[1]] = nextOctave;
        oldLines[position[0]].down[position[1]] = nextChord;
        return oldLines;
      });
    }
  };

  function deleteAt(position) {
    update(oldLines => {
      const newUpAndDown = oldLines[position[0]];
      if (newUpAndDown.up.length > 1) {
        newUpAndDown.up = [
          ...newUpAndDown.up.slice(0, position[1]),
          ...newUpAndDown.up.slice(position[1] + 1)
        ];
        newUpAndDown.down = [
          ...newUpAndDown.down.slice(0, position[1]),
          ...newUpAndDown.down.slice(position[1] + 1)
        ];

        oldLines[position[0]] = newUpAndDown;
      } else {
        oldLines = [
          ...oldLines.slice(0, position[0]),
          ...oldLines.slice(position[0] + 1)
        ]
      }

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
    deleteAt,
    edit,
		reset
	};
};

export const lines = createLinesStore();