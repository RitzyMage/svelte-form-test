<script lang="ts">
  import { GAMES, GUILDS, TITLES } from "$lib/data";
  import type { User } from "$lib/server/db/types";
  import type { UserFormAction } from "../../routes/data.remote";

  let { formInfo, user }: { formInfo: UserFormAction; user: User } = $props();

  formInfo.fields.set(user);
</script>

<form {...formInfo}>
  <label class="selectInput">
    <span class="label">Title</span>
    <select {...formInfo.fields.title.as("select")}>
      {#each TITLES as title}
        <option>{title}</option>
      {/each}
    </select>
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

  <div class="multitextInput">
    <div class="label">Commanders</div>
    <div class="multitextItems">
      {#each formInfo.fields.commanders.value() as commander, index}
        <label class="checkboxInput">
          <input {...formInfo.fields.commanders[index].as("text")} />
        </label>
      {/each}
      <button
        onclick={() => {
          formInfo.fields.commanders.set([
            ...(formInfo.fields.commanders.value() ?? []),
            "",
          ]);
        }}>Add</button
      >
    </div>
  </div>

  <label class="selectInput">
    <span class="label">Favorite Guild</span>
    <select {...formInfo.fields.favoriteGuild.as("select")}>
      {#each GUILDS as title}
        <option>{title}</option>
      {/each}
    </select>
  </label>

  <label class="textInput">
    <span class="label">Social Security</span>
    <input {...formInfo.fields.socialSecurity.as("text")} />
  </label>

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
