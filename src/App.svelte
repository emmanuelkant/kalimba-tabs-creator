<script>
  import { map } from './config';
  let titleSong = '';
  let buttons = ['1', '2', '3', '4', '5', '6', '7'];

	let lines = [
    {
      up: [],
      down: []
    },
  ];

  function toggle(target) {
    return map[target] || target;
  }

  function changeChordType() {
    buttons = buttons.map(toggle);

    lines = lines.map(({ up, down }) => ({ up, down: down.map(toggle) }));
  }

  function add(nextChord, nextOctave) {
    const targetLine = lines[lines.length - 1];
    lines[lines.length - 1].up = [...targetLine.up, nextOctave];
    lines[lines.length - 1].down = [...targetLine.down, nextChord];
  }

  function backspace() {
    if(lines[0].up.length > 0) {
      if (!lines[lines.length - 1].up.length) {
        lines = [...lines.slice(0, lines.length - 1)];
      }
      lines[lines.length - 1].up = [...lines[lines.length - 1].up.slice(0, lines[lines.length - 1].up.length - 1)];
      lines[lines.length - 1].down = [...lines[lines.length - 1].down.slice(0, lines[lines.length - 1].down.length - 1)];
    }
  }

  function newLine() {
    if (lines[lines.length - 1].up.length) {
      lines = [...lines, { up: [], down: [] }];
    }
  }
</script>

<main>
  <div class="container button-container no-print">
    {#each buttons as button }
      <button on:click={() => add(button, '')}>{button}</button>
    {/each}
  </div>
  <div class="container button-container no-print">
    {#each buttons as button }
      <button on:click={() => add(button, '.')}>{button}*</button>
    {/each}
  </div>
  <div class="container button-container no-print">
    {#each buttons as button }
      <button on:click={() => add(button, '..')}>{button}**</button>
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
  <div class="container button-container no-print">
    <input bind:value={titleSong}  type="text" placeholder="What is the song name?"/>
  </div>
  <h1 class="just-on-print">{titleSong}</h1>
	{#each lines as line }
    <div class="container">
      {#each line.up as marks}
        <div class="mark">
          {#if marks}
            <span>{marks}</span>
          {:else}
            <span>&nbsp;</span>
          {/if}
        </div>
      {/each}
    </div>
    <div class="container">
      {#each line.down as marks}
        <div class="mark">
          <span>{marks}</span>
        </div>
      {/each}
    </div>
  {/each}
</main>

<style>
  .container {
    display: flex;
    justify-content: center;
  }

  .button-container {
    margin: 10px 0;
    gap: 8px;
  }

  button {
    padding: 8px;
    font-size: 20px;
    cursor: pointer;
  }

  .mark {
    display: flex;
    justify-content: center;
    flex-basis: 25px;
  }

  span {
    font-size: 30px;
  }

  input {
    padding: 20px;
    font-size: 20px;
    border: 0;
    text-align: center;
  }
</style>