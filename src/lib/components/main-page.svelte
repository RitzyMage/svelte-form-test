<script lang="ts">
  import type { userForm } from "../../routes/data.remote";
  import MainForm from "./main-form.svelte";

  let props = $props<{ formInfo: userForm }>();
</script>

<div>
  <h1>Please Enter Your Info:</h1>
  <MainForm formInfo={props.formInfo} />
</div>
