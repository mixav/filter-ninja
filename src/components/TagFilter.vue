<template>
  <b-container fluid="true">
    <b-form-group v-for="list in tags" :label="list.text" :key="list.label">
      <b-form-checkbox-group
          :id="list.label + '-group'"
          v-model="selected[list.label]"
          stacked
          :name="list.label">
        <b-form-checkbox v-for="tag in list.options" :key="tag.id">
          {{ tag.value }}
        </b-form-checkbox>
      </b-form-checkbox-group>
    </b-form-group>
  </b-container>
</template>

<script>
export default {
  name: "TagFilter",
  props: {
    tags: Array,
    selected: Object
  }
}
</script>

<style scoped>

</style>
