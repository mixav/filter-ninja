<template>
  <div id="v-model-select">
    <b-form-select @change="onSelectChange" v-model="selected" :options="options"/>
  </div>
</template>

<script>
export default {
  name: "DataEditor",
  data() {
    return {
      selected: 'Ninjas',
      options: [
        {text: 'Персонажи', value: 'Ninjas'},
        {text: 'Экипировка', value: 'Equip'},
        {text: 'Бижутерия', value: 'Accessories'}
      ]
    }
  },
  methods: {
    onSelectChange(value) {
      console.log(value);
    }
  }
}
</script>

<style scoped>

</style>