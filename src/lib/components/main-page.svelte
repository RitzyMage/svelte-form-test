<script lang="ts">
  import type { User } from "$lib/server/db/types";
  import type { RemoteQueryFunction } from "@sveltejs/kit";
  import type { UserFormAction } from "../../routes/data.remote";
  import MainForm from "./main-form.svelte";

  let props: {
    formInfo: UserFormAction;
    getUser: RemoteQueryFunction<void, User>;
  } = $props();
</script>

<div>
  <h1>Please Enter Your Info:</h1>
  {#await props.getUser()}
    <div>Loading...</div>
  {:then user}
    <MainForm formInfo={props.formInfo} {user} />
  {/await}
</div>

<style>
  h1 {
    margin: 0 0 16px 0;
  }
</style>
