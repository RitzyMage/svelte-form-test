<script>
  import MainPage from "$lib/components/main-page.svelte";
  import { updateUser, getUser } from "./data.remote";
</script>

<MainPage formInfo={updateUser} {getUser} />
