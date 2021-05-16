<script>
  import { toggle } from '../helper';
  import { lines } from '../store/lines';
  import { editMode, deleteMode } from '../store/modes';
  import { currentTarget } from '../store/current-target';
  
  const { add, edit, backspace, newLine, changeChordType } = lines;
  const { toggle: toggleEditMode, turnOff: turnOffEditMode } = editMode;
  const { toggle: toggleDeleteMode, turnOff: turnOffDeleteMode } = deleteMode;
  const { clear } = currentTarget;
  let buttons = ['1', '2', '3', '4', '5', '6', '7'];
  let someModeOn = false;

  function changeAllChordType() {
    buttons = buttons.map(toggle);
    changeChordType(toggle);
  };

  function handleClick(chord, octave) {
    if ($editMode) {
      edit(chord, octave, $currentTarget);
    } else {
      add(chord, octave)
    }
  };

  function handleEditClick() {
    if ($deleteMode) {
      turnOffDeleteMode();
    }
    clear();
    toggleEditMode();
  };

  function handleDeleteClick() {
    if ($editMode) {
      turnOffEditMode();
    }
    clear();
    toggleDeleteMode();
  };

  $: if ($editMode || $deleteMode) {
    someModeOn = true;
  } else {
    someModeOn = false;
  }
</script>

<div class="no-print">
  {#each buttons as button }
    <button class="chord-button" on:click={() => handleClick(button, '..')}>{button}**</button>
  {/each}
</div>
<div class="no-print">
  {#each buttons as button }
    <button class="chord-button" on:click={() => handleClick(button, '.')}>{button}*</button>
  {/each}
</div>
<div class="no-print">
  {#each buttons as button }
    <button class="chord-button" on:click={() => handleClick(button, '')}>{button}</button>
  {/each}
</div>
<div class="no-print">
  <button on:click={() => handleClick('(', '')}>(</button>
  <button on:click={() => handleClick(')', '')}>)</button>
  <button on:click={() => handleClick('', '')}>Space</button>
  <button disabled={someModeOn} on:click={() => backspace()}>Backspace</button>
  <button disabled={someModeOn} on:click={() => newLine()}>New Line</button>
  <button on:click={handleEditClick}>Edit</button>
  <button on:click={handleDeleteClick}>Delete</button>
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

  button:disabled {
    cursor: initial;
  }

  button:hover:not(:disabled) {
    box-shadow: 0px 0px 3px 1px rgba(0, 0, 0, 0.7);
  }

  .chord-button {
    width: 45px;
  }
</style>