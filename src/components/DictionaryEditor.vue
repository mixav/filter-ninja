<template>
  <b-tabs>
    <b-tab v-for="tagType in allTags"
           :key="tagType.label"
           :title="tagType.text">
      <b-form class="col-md-4">
        <b-tag v-for="tagValue in tagType.options"
               :title="tagValue.value"
               :key="tagValue.id"
               @remove="removeTag(tagType.id,tagValue.id)"/>
        <b-input-group class="mt-4">
          <b-input-group-prepend>
            <b-button variant="outline-secondary" @click="addNewTag(tagType.id)">Add</b-button>
          </b-input-group-prepend>
          <b-form-input v-model="newTag"
                        placeholder="Type new tag here"/>
        </b-input-group>
      </b-form>
    </b-tab>
  </b-tabs>
</template>

<script>
import {mapState} from 'vuex'

export default {
  name: "DictionaryEditor",
  data() {
    return {
      newTag: ''
    }
  },
  computed: mapState({allTags: state => state.tagList}),
  methods: {
    removeTag(type, value) {
      this.$store.dispatch('removeTag', {familyId: type, docId: value})
    },
    addNewTag(familyId) {
      this.$store.dispatch('addTag', {familyId, value: this.newTag})
      this.newTag = '';
    }
  }
}
</script>

<style scoped>

</style>