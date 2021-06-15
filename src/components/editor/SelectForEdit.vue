<template>
  <div>
    <b-form-select v-model="selected"
                   :options="characterList"/>
    <character-editor :selectedForEdit="selected"
                      :actionType="actionType"
                      :type="type"
                      v-on:saveInputForm="passEventToParent"/>
  </div>
</template>

<script>
import CharacterEditor from "@/components/editor/CharacterEditor"

export default {
  name: "SelectForEdit",
  components: {CharacterEditor},
  props: {
    actionType: {
      type: String,
      required: true
    },
    type: {
      type: String,
      required: true
    }
  },
  data() {
    return {
      selected: {}
    }
  },
  computed: {
    characterList() {
      return this.$store.state.characterList.map((character) => {
        return {
          value: character,
          text: character.name
        }
      });
    }
  },
  methods: {
    passEventToParent: function (value) {
      this.$emit('saveInputForm', value)
    }
  }
}

</script>

<style scoped>

</style>