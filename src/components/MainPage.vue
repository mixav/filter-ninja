<template>
  <b-container fluid="true">
    <b-tabs>
        <b-tab v-for="category in categoryList" :key="category.id" :title="category.title" >
          <p>
            <CharacterList v-if="category.name === 'CharacterList'"></CharacterList>
            <DataEditor v-if="category.name === 'DataEditor'"></DataEditor>
          </p>
        </b-tab>
    </b-tabs>
  </b-container>
</template>

<script>
import CharacterList from "@/components/CharacterList";
import DataEditor from "@/components/DataEditor";

export default {
  name: 'MainPage',
  components: {DataEditor, CharacterList},
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
        },
        {
          title: 'Редактор',
          name: 'DataEditor',
          id: '4'
        }
      ]
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
