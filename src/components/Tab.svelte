<script>
  import { fade } from 'svelte/transition';
  import { lines } from '../store/lines';
  import { editMode, deleteMode } from '../store/modes';
  import { currentTarget } from '../store/current-target';

  const { set } = currentTarget;
  const { deleteAt } = lines;
  let someModeOn = false;
  let stringCurrentTarget = '';

  function handleChordClick(lineIndex, markIndex) {
    if ($editMode) {
      set(lineIndex, markIndex);
    }

    if ($deleteMode) {
      deleteAt([lineIndex, markIndex]);
    }
  }

  $: if ($editMode || $deleteMode) {
    someModeOn = true;
  } else {
    someModeOn = false;
  }

  $: stringCurrentTarget = `${$currentTarget[0]}${$currentTarget[1]}`;
</script>

<style>
  .container {
    display: flex;
    justify-content: center;
  }

  .mark {
    display: flex;
    justify-content: center;
    flex-basis: 25px;
    transition: all 0.2s ease-in-out;
  }

  span {
    font-size: 30px;
  }

  .current-line {
    box-shadow: 0px 0px 5px 1px rgba(0, 0, 0, 0.2);
    border-radius: 5px;
    background-color: #faebd7;
  }

  .line {
    min-height: 70px;
    max-width: 1280px;
    margin: 0 auto;
    transition: all 0.2s ease-in-out;
  }

  .modes-on {
    cursor: pointer;
  }

  .modes-on:hover {
    box-shadow: 0px 0px 3px 1px rgba(0, 0, 0, 0.5);
  }

  .edit-target-up {
    background-color: #cec1b0;
    transform: scale(1.2) translate3d(0, -5px, 0);
  }

  .edit-target-down {
    background-color: #cec1b0;
    transform: scale(1.2) translate3d(0, 5px, 0);
  }
</style>

{#each $lines as line, indexLine }
  <div in:fade out:fade class="line {indexLine === $lines.length - 1 ? 'current-line' : ''}">
    <div class="container">
      {#each line.up as marks, markIndex}
        <div
          on:click={() => handleChordClick(indexLine, markIndex)}
          class="mark {stringCurrentTarget === `${indexLine}${markIndex}` ? 'edit-target-up' : ''}"
        >
          {#if marks}
            <span>{marks}</span>
          {:else}
            <span>&nbsp;</span>
          {/if}
        </div>
      {/each}
    </div>
    <div class="container">
      {#each line.down as marks, markIndex}
        <div
          on:click={() => handleChordClick(indexLine, markIndex)}
          class="mark {someModeOn ? 'modes-on' : ''} {stringCurrentTarget === `${indexLine}${markIndex}` ? 'edit-target-down' : ''}"
        >
          <span>{marks}</span>
        </div>
      {/each}
    </div>
  </div>
{/each}