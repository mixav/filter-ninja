<template>
  <b-container fluid="true">
    <b-tabs>
        <b-tab v-for="category in categoryList" :key="category.id" :title="category.title" >
          <p>
            <CharacterList v-if="category.name === 'CharacterList'"></CharacterList>
          </p>
        </b-tab>
    </b-tabs>
  </b-container>
</template>

<script>
import CharacterList from "@/components/CharacterList";

export default {
  name: 'MainPage',
  components: {CharacterList},
  data() {
    return {
      categoryList: [
        {
          title: 'Персонажи',
          name: 'CharacterList',
          id: '1'
        },
        {
          title: 'Экипировка',
          name: 'GearList',
          id: '2'
        },
        {
          title: 'Бижутерия',
          name: 'AccessoriesList',
          id: '3'
        }
      ]
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
