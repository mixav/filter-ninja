<template>
  <div>
    <b-tag v-for="tag in selected"
           :key="tag"
           @remove="$emit('removeSelectedOption',type,tag)">
      {{ tag }}
    </b-tag>
    <b-dropdown :text="'Choose tags for '+type">
      <b-dropdown-item v-for="option in available"
                       :key="option.id"
                       @click="$emit('addTagToDescription',type, option.value)">
        {{ option.value }}
      </b-dropdown-item>
      <b-dropdown-item v-if="available.length===0" disabled>
        No options available
      </b-dropdown-item>
    </b-dropdown>
  </div>
</template>

<script>
export default {
  name: "TagManipulator",
  props: {
    selected: Array,
    available: Array,
    type: String
  }
}
</script>

<style scoped>

</style>