<script>
  import { toggle } from '../helper';
  import { lines } from '../store/lines';
  
  const { add, backspace, newLine, changeChordType } = lines;
  let buttons = ['1', '2', '3', '4', '5', '6', '7'];

  function changeAllChordType() {
    buttons = buttons.map(toggle);
    changeChordType(toggle);
  }
</script>

<div class="no-print">
  {#each buttons as button }
    <button class="chord-button" on:click={() => add(button, '..')}>{button}**</button>
  {/each}
</div>
<div class="no-print">
  {#each buttons as button }
    <button class="chord-button" on:click={() => add(button, '.')}>{button}*</button>
  {/each}
</div>
<div class="no-print">
  {#each buttons as button }
    <button class="chord-button" on:click={() => add(button, '')}>{button}</button>
  {/each}
</div>
<div class="no-print">
  <button on:click={() => add('(', '')}>(</button>
  <button on:click={() => add(')', '')}>)</button>
  <button on:click={() => add('', '')}>Space</button>
  <button on:click={() => backspace()}>Backspace</button>
  <button on:click={() => newLine()}>New Line</button>
  <button>Edit</button>
  <button>Delete</button>
  <button on:click={() => changeAllChordType()}>Toggle Chords</button>
</div>

<style>
  div {
    display: flex;
    justify-content: center;
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