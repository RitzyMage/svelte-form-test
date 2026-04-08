<script>
  import MainPage from "$lib/components/main-page.svelte";
  import { updateUser } from "./data.remote";
</script>

<MainPage formInfo={updateUser} />
