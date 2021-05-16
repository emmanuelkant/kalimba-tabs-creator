<script>
  import { fade } from 'svelte/transition';
  import { lines } from '../store/lines';
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
</style>

{#each $lines as line, indexLine }
  <div in:fade out:fade  class="line {indexLine === $lines.length - 1 ? 'current-line' : ''}">
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
  </div>
{/each}