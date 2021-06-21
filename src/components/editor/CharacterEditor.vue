<template>
  <div>
    <b-form-select
      v-if="actionType !== 'add'"
      v-model="selectedOption"
      :options="namedCharacterList"
    />
    <CharacterForm
      v-if="actionType !== 'remove'"
      :action-type="actionType"
      :selectedForEdit="selectedOption"
      v-on:saveInputForm="saveInputForm"
    />
  </div>
</template>
<script>
import { mapState } from "vuex";
import CharacterForm from "@/components/form/CharacterForm";

export default {
  name: "character-editor",
  components: { CharacterForm },
  data() {
    return {
      selectedOption: {},
      emitActionByType: {
        edit: "updateCharacter",
        add: "addNewCharacter"
      }
    };
  },
  props: {
    actionType: {
      type: String,
      required: true
    }
  },
  methods: {
    saveInputForm({ actionType, ...characterData }) {
      this.$store.dispatch(
        this.emitActionByType[actionType],
        characterData.data
      );
    }
  },
  computed: {
    namedCharacterList() {
      return this.characterList.map(character => {
        return {
          value: character,
          text: character.name
        };
      });
    },
    ...mapState(["characterList"])
  }
};
</script>
