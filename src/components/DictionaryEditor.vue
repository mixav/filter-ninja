<template>
  <div>
    <div v-for="dictionary in tagsDictionaries" :key="dictionary.label">
      <div class="row">
        <b class="ml-2 col-sm-2">{{ dictionary.text }}:</b>
        <b-form-tags class="col-sm-9" :value="dictionary.value" :placeholder="dictionary.text"/>
      </div>
      <br>
    </div>
  </div>
</template>

<script>
export default {
  name: "DictionaryEditor",
  data() {
    return {
      tagsDictionaries: [
        {
          text: 'Талант',
          label: 'talent',
          value: ['increaseHP', 'reduceAIR', 'increaseATK', 'increaseAR', 'increaseHIT', 'ignoreATK', 'ignoreReflect']
        },
        {
          text: 'Навык',
          label: 'skill',
          value: ['dot', 'increaseATK', 'increasePunch', 'increaseDEF', 'reduceHeal']
        },
        {
          text: 'Иммунитет',
          label: 'immunity',
          value: ['windBound', 'deathSeed']
        },
        {
          text: 'Контроль',
          label: 'crowd-control',
          value: ['windBound']
        }
      ]
    }
  }
}
</script>

<style scoped>

</style>