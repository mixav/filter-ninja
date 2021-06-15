<template>
  <b-card no-body>
    <b-tabs pills vertical>
      <b-tab v-for="option in options" :key=option.value :title="option.text">
        <div v-if="(option.value==='add')&&(type==='Ninjas')">
          <character-editor actionType="option.value"
                            v-on:saveInputForm="saveInputForm"/>
        </div>
        <div v-if="(option.value==='edit')&&(type==='Ninjas')">
          <select-for-edit v-on:saveInputForm="saveInputForm"
                           :type="type"
                           :actionType="option.value"/>
        </div>
      </b-tab>
    </b-tabs>
  </b-card>
</template>

<script>
import CharacterEditor from "@/components/editor/CharacterEditor";
import SelectForEdit from "@/components/editor/SelectForEdit"

export default {
  name: "DataEditor",
  components: {CharacterEditor, SelectForEdit},
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
      }
    }
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
    }
  }
}
</script>

