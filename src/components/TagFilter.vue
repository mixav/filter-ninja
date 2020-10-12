<template>
  <b-container fluid="true">
    <b-form-group v-for="(list, kind) in tags" :label="kind" :key="kind">
      <b-form-checkbox-group
          :id="kind + '-group'"
          v-model="selected[kind]"
          :options="list"
          stacked
          :name="kind">
      </b-form-checkbox-group>
    </b-form-group>
  </b-container>
</template>

<script>
export default {
  name: "TagFilter",
  props: {
    tags: Object,
    selected: Object
  }
}
</script>

<style scoped>

</style>
