<script lang="ts">
  import { GAMES } from "$lib/data";
  import type { UserFormAction } from "../../routes/data.remote";

  let { formInfo }: { formInfo: UserFormAction } = $props();
</script>

<form {...formInfo}>
  <label class="textInput">
    <span class="label">Title</span>
    <input {...formInfo.fields.title.as("text")} />
  </label>

  <label class="textInput">
    <span class="label">Username</span>
    <input {...formInfo.fields.username.as("text")} />
  </label>

  <div class="multicheckboxInput">
    <div class="label">Games</div>
    <div class="checkboxes">
      {#each GAMES as game}
        <label class="checkboxInput">
          <input {...formInfo.fields.games.as("checkbox", game)} />
          <span>{game}</span>
        </label>
      {/each}
    </div>
  </div>

  <button type="submit">SAVE</button>
</form>

<style>
  form {
    display: flex;
    flex-direction: column;
    gap: 16px;
  }

  .textInput {
    display: flex;
    flex-direction: column;
    gap: 4px;
  }

  .checkboxInput {
    display: flex;
    align-items: center;
  }

  .multicheckboxInput .label {
    padding-bottom: 4px;
  }

  .multicheckboxInput .checkboxes {
    display: flex;
    flex-direction: column;
    gap: 2px;
  }

  button {
    border: 2px solid #77d;
    background: transparent;
    color: #22a;
    cursor: pointer;
    border-radius: 4px;
  }

  button:hover {
    background: #77d2;
  }

  .label {
    font-weight: bold;
  }
</style>
