<script>
  let titleSong = '';
</script>

<style>
  div {
    display: flex;
    justify-content: center;
  }

  input {
    padding: 20px;
    font-size: 20px;
    border: 0;
    text-align: center;
    background-color: transparent;
  }
</style>

<div class="no-print">
  <input bind:value={titleSong}  type="text" placeholder="What is the song name?"/>
</div>
<h1 class="just-on-print">{titleSong}</h1>