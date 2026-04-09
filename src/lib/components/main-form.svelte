<script lang="ts">
  import { GAMES, GUILDS, TITLES } from "$lib/data";
  import type { User } from "$lib/server/db/types";
  import type { UserFormAction } from "../../routes/data.remote";
  import IMask from "imask";

  let { formInfo, user }: { formInfo: UserFormAction; user: User } = $props();

  $effect(() => {
    if (user) {
      formInfo.fields.set({
        commanders: user.commanders ?? [],
        favoriteGuild: user.favoriteGuild || "Rakdos",
        games: user.games || [],
        socialSecurity: user.socialSecurity || "",
        title: user.title || "Lord",
        username: user.username,
      });
    }
  });

  function arrayWithoutElementAtIndex<T>(arr: T[], index: number) {
    return arr.filter(function (value, arrIndex) {
      return index !== arrIndex;
    });
  }

  let ssnInput: HTMLElement;
  $effect(() => {
    IMask(ssnInput, {
      mask: "XXX-XX-0000",
      definitions: {
        X: {
          mask: "0",
          displayChar: "•",
          placeholderChar: " ",
        },
        "0": {
          mask: "0",
          placeholderChar: " ",
        },
      },
      lazy: false,
      overwrite: "shift",
    });
  });
</script>

<form {...formInfo} oninput={() => formInfo.validate()}>
  <label class="selectInput">
    <span class="label">Title</span>
    <select {...formInfo.fields.title.as("select")}>
      {#each TITLES as title}
        <option>{title}</option>
      {/each}
    </select>
    {#each formInfo.fields.title.issues() as issue}
      <span class="issue">{issue.message}</span>
    {/each}
  </label>

  <label class="textInput">
    <span class="label">Username</span>
    <input {...formInfo.fields.username.as("text")} />
    {#each formInfo.fields.username.issues() as issue}
      <span class="issue">{issue.message}</span>
    {/each}
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
      {#each formInfo.fields.games.issues() as issue}
        <span class="issue">{issue.message}</span>
      {/each}
    </div>
  </div>

  <div class="multitextInput">
    <div class="label">Commanders</div>
    <div class="multitextItems">
      {#each formInfo.fields.commanders.value() as commander, index}
        <label class="checkboxInput">
          <div>
            <input {...formInfo.fields.commanders[index].as("text")} />
            <button
              onclick={() =>
                formInfo.fields.commanders.set(
                  arrayWithoutElementAtIndex(
                    formInfo.fields.commanders.value().slice(),
                    index,
                  ),
                )}>delete</button
            >
          </div>
          {#each formInfo.fields.commanders[index].issues() as issue}
            <span class="issue">{issue.message}</span>
          {/each}
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
    {#each formInfo.fields.commanders.issues() as issue}
      <span class="issue">{issue.message}</span>
    {/each}
  </div>

  <label class="selectInput">
    <span class="label">Favorite Guild</span>
    <select {...formInfo.fields.favoriteGuild.as("select")}>
      {#each GUILDS as title}
        <option>{title}</option>
      {/each}
    </select>
    {#each formInfo.fields.favoriteGuild.issues() as issue}
      <span class="issue">{issue.message}</span>
    {/each}
  </label>

  <label class="textInput">
    <span class="label">Social Security</span>
    <input
      {...formInfo.fields.socialSecurity.as("text")}
      bind:this={ssnInput}
    />
    {#each formInfo.fields.socialSecurity.issues() as issue}
      <span class="issue">{issue.message}</span>
    {/each}
  </label>

  <button type="submit">SAVE</button>
</form>

<style>
  form {
    display: flex;
    flex-direction: column;
    gap: 16px;
  }

  .selectInput {
    display: flex;
    flex-direction: column;
    gap: 4px;
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

  .multitextInput .multitextItems {
    display: flex;
    flex-direction: column;
    gap: 4px;
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

  .issue {
    color: #922;
  }
</style>
