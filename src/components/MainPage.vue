<template>
  <b-container fluid="true">
    <b-nav>
      <b-nav-item v-for="category in categoryList" :key="category.id"
                  @changed="atTabChange(category.name)"
      >
        {{ category.title }}
      </b-nav-item>
      <b-nav-item-dropdown id="drop-1" :text="editor.title">
        <b-dropdown-item v-for="option in editor.options" :text="option.text" :key="option.value">
          {{ option.text }}
        </b-dropdown-item>
      </b-nav-item-dropdown>
    </b-nav>
    <p>
      <CharacterList disabled="true">'CharacterList'"></CharacterList>
      <DataEditor hidden> 'DataEditor'"></DataEditor>
    </p>
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

      ],
      editor: {
        title: 'Редактор',
        name: 'DataEditor',
        id: '4',
        options: [
          {
            text: 'Персонажи',
            value: 'Ninjas'
          },
          {
            text: 'Экипировка',
            value: 'Equip'
          },
          {
            text: 'Бижутерия',
            value: 'Accessories'
          }
        ]
      },
    }
  },
  methods: {
    atTabChange(event) {
      console.log(event);
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
