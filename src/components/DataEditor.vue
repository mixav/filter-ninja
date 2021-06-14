<template>
  <b-card no-body>
    <b-tabs pills vertical>
      <b-tab v-for="option in options" :key=option.value :title="option.text">
        <div v-if="(option.value==='add')&&(type==='Ninjas')">
          <b-form>
            <strong v-if="option.value==='add'">Добавление</strong>
            <div class="form-group row">
              <div class="col-xs-6 col-md-6">
                <b-form-input class="mb-2"
                              placeholder="Name"
                              v-model="ninjaFormInput.name"/>
                <b-form-input placeholder="Icon"
                              v-model="ninjaFormInput.icon"/>
              </div>
            </div>

            <div class="form-group row">
              <div class="col-xs-6 col-md-6">
                <b-form-textarea placeholder="Talent"
                                 v-model="ninjaFormInput.talent"/>
              </div>
              <tag-manipulator class="col-xs-6 col-md-6" :type="TAG.TALENT"
                               :selected="ninjaFormInput.selectedTags[TAG.TALENT]"
                               :available="availableOptions(TAG.TALENT,ninjaFormInput.selectedTags[TAG.TALENT])"
                               v-on:addTagToDescription="addTagToDescription"
                               v-on:removeSelectedOption="removeSelectedOption"/>
            </div>

            <div class="form-group row">
              <div class="col-xs-6 col-md-6">
                <b-form-textarea placeholder="Skill"
                                 v-model="ninjaFormInput.skill"/>
              </div>
              <tag-manipulator class="col-xs-6 col-md-6" :type="TAG.SKILL"
                               :selected="ninjaFormInput.selectedTags[TAG.SKILL]"
                               :available="availableOptions(TAG.SKILL,ninjaFormInput.selectedTags[TAG.SKILL])"
                               v-on:addTagToDescription="addTagToDescription"
                               v-on:removeSelectedOption="removeSelectedOption"
                               v-model="ninjaFormInput.skill"/>
            </div>
            <tag-manipulator :type="TAG.CROWD_CONTROL"
                             :selected="ninjaFormInput.selectedTags[TAG.CROWD_CONTROL]"
                             :available="availableOptions(TAG.CROWD_CONTROL,ninjaFormInput.selectedTags[TAG.CROWD_CONTROL])"
                             v-on:addTagToDescription="addTagToDescription"
                             v-on:removeSelectedOption="removeSelectedOption"/>
            <tag-manipulator class="mt-2" :type="TAG.IMMUNITY"
                             :selected="ninjaFormInput.selectedTags[TAG.IMMUNITY]"
                             :available="availableOptions(TAG.IMMUNITY,ninjaFormInput.selectedTags[TAG.IMMUNITY])"
                             v-on:addTagToDescription="addTagToDescription"
                             v-on:removeSelectedOption="removeSelectedOption"/>
            <b-radio-group :options="ninjaType"
                           v-model="ninjaFormInput.currentNinjaType"
                           value-field="value"
                           text-field="text"
                           class="my-3"/>
            <b-button @click="validateInputForm" variant="primary">Submit</b-button>
            <b-button @click="resetInputForm" variant="danger">Reset</b-button>
          </b-form>
        </div>
      </b-tab>
    </b-tabs>
  </b-card>
</template>

<script>
import {mapGetters} from "vuex";
import TagManipulator from "@/components/TagManipulator";
import {TAG} from '@/constantHelper'


export default {
  name: "DataEditor",
  components: {TagManipulator},
  data() {
    return {
      options: [
        {value: 'add', text: 'Добавить'},
        {value: 'remove', text: 'Удалить'},
        {value: 'edit', text: 'Редактировать'},
      ],
      search: '',
      value: [],
      ninjaType: [
        {text: 'Авангард', value: 'vanguard'},
        {text: 'Штурмовик', value: 'assaulter'},
        {text: 'Помощник', value: 'support'}
      ],
      ninjaFormInput: {
        name: '',
        icon: '',
        talent: '',
        skill: '',
        selectedTags: {
          'talent': [],
          'skill': [],
          'crowd-control': [],
          'immunity': []
        },
        currentNinjaType: ''
      }
    }
  },
  props: {
    type: String
  },
  methods: {
    addTagToDescription: function (type, value) {
      this.ninjaFormInput.selectedTags[type].push(value);
    },
    removeSelectedOption: function (type, value) {
      this.ninjaFormInput.selectedTags[type] = this.ninjaFormInput.selectedTags[type].filter((tag) => tag !== value)
    },
    validateInputForm() {
      console.log(this.ninjaFormInput)
    },
    resetInputForm() {
      this.ninjaFormInput = {
        name: '',
        icon: '',
        talent: '',
        skill: '',
        selectedTags: {
          'talent': [],
          'skill': [],
          'crowd-control': [],
          'immunity': []
        }
      }
    }
  },
  computed: {
    ...mapGetters([
      'getOptionsByName',
      'availableOptions'
    ])
  },
  created() {
    this.TAG = TAG;
  }
}
</script>

<style scoped>

</style>