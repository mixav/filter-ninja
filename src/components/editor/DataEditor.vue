<template>
  <b-card no-body>
    <b-tabs pills vertical v-on:activate-tab="onTabChange">
      <b-tab v-for="option in options"
             :key=option.value
             :title="option.text">
        <b-form-select v-if="option.value!=='add'" v-model="selectedOption"
                       :options="namedCharacterList"/>
        <character-editor v-if="option.value!=='remove'" actionType="option.value"
                          v-on:saveInputForm="saveInputForm"
                          :selectedForEdit="selectedOption"/>
      </b-tab>
    </b-tabs>
  </b-card>
</template>

<script>
import CharacterEditor from "@/components/editor/CharacterEditor";
import {mapState} from "vuex";

export default {
  name: "DataEditor",
  components: {CharacterEditor},
  data() {
    return {
      options: [
        {value: 'add', text: 'Добавить'},
        {value: 'remove', text: 'Удалить'},
        {value: 'edit', text: 'Редактировать'},
      ],
      emitActionByType: {
        'edit': 'updateCharacter',
        'add': 'addNewCharacter'
      },
      selectedOption: {}
    }
  },
  computed: {
    namedCharacterList() {
      return this.characterList.map((character) => {
        return {
          value: character,
          text: character.name
        }
      });
    },
    ...mapState([
      'characterList'
    ])
  },
  props: {
    type: {
      type: String,
      required: true,
      default: "ninja"
    }
  },
  methods: {
    saveInputForm({actionType, ...characterData}) {
      this.$store.dispatch(this.emitActionByType[actionType], characterData.data)
    },
    onTabChange() {
      this.selectedOption = {}
    }
  }
}
</script>

