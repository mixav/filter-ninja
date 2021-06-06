<template>
  <b-card no-body>
    <b-tabs pills card vertical @change="onSelectChange">
      <b-tab v-for="option in options" :key=option.value :title="option.text"/>
    </b-tabs>
  </b-card>
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