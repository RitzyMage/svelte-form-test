<script lang="ts">
  import type { UserFormAction } from "../../routes/data.remote";
  import MainForm from "./main-form.svelte";

  let props: { formInfo: UserFormAction } = $props();
</script>

<div>
  <h1>Please Enter Your Info:</h1>
  <MainForm formInfo={props.formInfo} />
</div>
