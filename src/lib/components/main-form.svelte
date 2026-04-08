<script lang="ts">
  import type { userForm } from "../../routes/data.remote";

  let { formInfo } = $props<{ formInfo: userForm }>();
</script>

<form {...formInfo}>
  <label>
    <input {...formInfo.fields.title.as("text")} />
  </label>

  <label>
    <h2>Write your post</h2>
    <textarea {...formInfo.fields.content.as("text")}></textarea>
  </label>

  <button type="submit">Submit</button>
</form>
