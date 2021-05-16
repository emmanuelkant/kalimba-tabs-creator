<script>
  import { deleteMode, editMode } from '../store/modes';

  let text = '';
  $: if ($deleteMode || $editMode) {
    text = $deleteMode ? 'DELETE MODE' : 'EDIT MODE'
  }
</script>

<style>
  div {
    position: absolute;
    top: 0;
    left: 10px;
    padding: 10px;
    border-radius: 3px;
    color: #fff;
  }

  .red {
    background-color: #ff6347;
    border: #853425 2px solid;
  }

  .blue {
    background-color: #6495ed;
    border: #314874 2px solid;
  }
</style>

{#if $deleteMode || $editMode}
  <div class="no-print {$deleteMode ? 'red' : 'blue'}">
    <span>{text} ON</span>
  </div>
{/if}