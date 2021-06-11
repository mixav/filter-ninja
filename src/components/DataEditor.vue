<template>
  <b-card no-body>
    <b-tabs pills vertical>
      <b-tab v-for="option in options" :key=option.value :title="option.text">
        <div v-if="(option.value==='add')&&(type==='Ninjas')">
          <b-form>
            <b v-if="option.value==='add'">Добавление нового персонажа</b>
            <b-form-input class="mb-2" placeholder="Name"/>
            <b-form-input class="mb-2" placeholder="Icon"/>

            <div class="form-group row">
              <div class="col-xs-6 col-md-6">
                <b-form-textarea placeholder="Talent"/>
              </div>
              <tag-manipulator class="col-xs-6 col-md-6" :type="TAG.TALENT"
                               :selected="selectedTags[TAG.TALENT]"
                               :available="availableOptions(TAG.TALENT,selectedTags[TAG.TALENT])"
                               v-on:addTagToDescription="addTagToDescription"
                               v-on:removeSelectedOption="removeSelectedOption"/>
            </div>

            <div class="form-group row">
              <div class="col-xs-6 col-md-6">
                <b-form-textarea placeholder="Skill"/>
              </div>
              <tag-manipulator class="col-xs-6 col-md-6" :type="TAG.SKILL"
                               :selected="selectedTags[TAG.SKILL]"
                               :available="availableOptions(TAG.SKILL,selectedTags[TAG.SKILL])"
                               v-on:addTagToDescription="addTagToDescription"
                               v-on:removeSelectedOption="removeSelectedOption"/>
            </div>
            <tag-manipulator :type="TAG.CROWD_CONTROL"
                             :selected="selectedTags[TAG.CROWD_CONTROL]"
                             :available="availableOptions(TAG.CROWD_CONTROL,selectedTags[TAG.CROWD_CONTROL])"
                             v-on:addTagToDescription="addTagToDescription"
                             v-on:removeSelectedOption="removeSelectedOption"/>
            <tag-manipulator class="mt-2" :type="TAG.IMMUNITY"
                             :selected="selectedTags[TAG.IMMUNITY]"
                             :available="availableOptions(TAG.IMMUNITY,selectedTags[TAG.IMMUNITY])"
                             v-on:addTagToDescription="addTagToDescription"
                             v-on:removeSelectedOption="removeSelectedOption"/>
            <b-radio-group :options="ninjaType"
                           v-model="selectedNinjaType"
                           value-field="value"
                           text-field="text"
                           class="my-3"/>
            <b-button type="submit" variant="primary">Submit</b-button>
            <b-button type="reset" variant="danger">Reset</b-button>
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
      selectedTags: {
        'talent': [],
        'skill': [],
        'crowd-control': [],
        'immunity': []
      },
      ninjaType: [
        {text: 'Авангард', value: 'vanguard'},
        {text: 'Штурмовик', value: 'assaulter'},
        {text: 'Помощник', value: 'support'}
      ],
      selectedNinjaType: 'vanguard'
    }
  },
  props: {
    type: String
  },
  methods: {
    addTagToDescription: function (type, value) {
      this.selectedTags[type].push(value);
    },
    removeSelectedOption: function (type, value) {
      this.selectedTags[type] = this.selectedTags[type].filter((tag) => tag !== value)
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