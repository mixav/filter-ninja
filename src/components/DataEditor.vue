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
              <div class="col-xs-6 col-md-6">
                <b-form-tags placeholder="Talent tags"/>
              </div>
            </div>

            <div class="form-group row">
              <div class="col-xs-6 col-md-6">
                <b-form-textarea placeholder="Passive"/>
              </div>
              <div class="col-xs-6 col-md-6">
                <b-form-tags list="my-list" placeholder="Passive tags"/>
              </div>
            </div>

            <b-form-tags class="col-xs-6 col-md-6 mb-2" placeholder="Crowd Control tags"/>
            <b-form-tags class="col-xs-6 col-md-6 mb-2" placeholder="Immunities tags"/>


            <b-radio-group>
              <b-radio>Vang</b-radio>
              <b-radio>Assa</b-radio>
              <b-radio>Supp</b-radio>
            </b-radio-group>
            <b-button type="submit" variant="primary">Submit</b-button>
            <b-button type="reset" variant="danger">Reset</b-button>
          </b-form>
        </div>
      </b-tab>
    </b-tabs>
  </b-card>
</template>

<script>
export default {
  name: "DataEditor",
  data() {
    return {
      options: [
        {value: 'add', text: 'Добавить'},
        {value: 'remove', text: 'Удалить'},
        {value: 'edit', text: 'Редактировать'},
      ],
      tagDictionary: ['+dot', '+air', '+dr', '+hp'],
      search: '',
      value: []
    }
  },
  props: {
    type: String
  },
  methods: {},
  computed: {}
}
</script>

<style scoped>

</style>