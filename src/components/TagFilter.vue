<template>
  <b-container fluid="true">
    <b-form-group v-for="family in tags" :label="family.text" :key="family.id">
      <b-form-checkbox-group
          :id="family.id"
          stacked
          :name="family.label">
        <b-form-checkbox v-for="tag in family.options"
                         v-model="selected[family.id]"
                         :key="tag.id"
                         :value="tag.value">
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
