<script>
  import { map } from './config';
  import { fade } from 'svelte/transition';
  import { lines } from './store/lines';
  let titleSong = '';
  let buttons = ['1', '2', '3', '4', '5', '6', '7'];

  function toggle(target) {
    return map[target] || target;
  }

  function changeChordType() {
    buttons = buttons.map(toggle);

    lines.update(oldLines => oldLines.map(({ up, down }) => ({ up, down: down.map(toggle) })));
  }

  function add(nextChord, nextOctave) {
    lines.update(oldLines => {
      const targetLine = oldLines[oldLines.length - 1];
      oldLines[oldLines.length - 1].up = [...targetLine.up, nextOctave];
      oldLines[oldLines.length - 1].down = [...targetLine.down, nextChord];
      return oldLines;
    })
  }

  function backspace() {
    if($lines[0].up.length > 0) {
      if (!$lines[$lines.length - 1].up.length) {
        lines.update(oldLines => [...oldLines.slice(0, oldLines.length - 1)]);
      } else {
        lines.update(oldLines => {
          oldLines[oldLines.length - 1].up = [...oldLines[oldLines.length - 1].up.slice(0, oldLines[oldLines.length - 1].up.length - 1)];
          oldLines[oldLines.length - 1].down = [...oldLines[oldLines.length - 1].down.slice(0, oldLines[oldLines.length - 1].down.length - 1)];
          return oldLines;
        });

      }
    }
  }

  function newLine() {
    if ($lines[$lines.length - 1].up.length) {
      lines.update(oldLines => {
        return [...oldLines, { up: [], down: [] }]; 
      });
    }
  }
</script>

<div class="container button-container no-print">
  {#each buttons as button }
    <button class="chord-button" on:click={() => add(button, '..')}>{button}**</button>
  {/each}
</div>
<div class="container button-container no-print">
  {#each buttons as button }
    <button class="chord-button" on:click={() => add(button, '.')}>{button}*</button>
  {/each}
</div>
<div class="container button-container no-print">
  {#each buttons as button }
    <button class="chord-button" on:click={() => add(button, '')}>{button}</button>
  {/each}
</div>
<div class="container button-container no-print">
  <button on:click={() => add('(', '')}>(</button>
  <button on:click={() => add(')', '')}>)</button>
  <button on:click={() => add('', '')}>Space</button>
  <button on:click={() => backspace()}>Backspace</button>
  <button on:click={() => newLine()}>New Line</button>
  <button>Edit</button>
  <button>Delete</button>
  <button on:click={() => changeChordType()}>Toggle Chords</button>
</div>

<style>
  .container {
    display: flex;
    justify-content: center;
  }

  .button-container {
    margin: 10px 0;
    gap: 15px;
  }

  button {
    padding: 8px;
    font-size: 20px;
    cursor: pointer;
    border: 0;
    border-radius: 4px;
    background-color: #faebd7;
    box-shadow: 0px 0px 1px 1px rgba(0, 0, 0, 0.2);
    transition: all 0.1s ease-in-out;
  }

  button:hover {
    box-shadow: 0px 0px 3px 1px rgba(0, 0, 0, 0.7);
  }

  .chord-button {
    width: 45px;
  }
</style>