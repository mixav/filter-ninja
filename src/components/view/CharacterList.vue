<template>
  <b-row>
    <TagFilter class="col-2" :tags="filterTags" :selected="selected" />
    <b-col cols="8">
      <b-col cols="4" class="ml-auto p-0">
        <b-input-group>
          <b-form-input v-model="filterInput"></b-form-input>
          <b-input-group-append>
            <b-input-group-text>
              <b-icon icon="search" />
            </b-input-group-text>
          </b-input-group-append>
        </b-input-group>
      </b-col>
      <b-list-group>
        <b-list-group-item
          v-for="ninja in filteredByTagAndName"
          :key="ninja.id"
        >
          <div class="row p-1">
            <strong>{{ ninja.name }}</strong>
            <div class="ml-auto">{{ ninja.type }}</div>
          </div>
          <b-row class="p-1">
            <b-img v-bind="imgProps" :src="ninja.image"></b-img>
            <div class="col p-0 ml-2">
              <b-card no-body>
                <b-card-header class="p-0">
                  <b-button
                    class="w-50"
                    v-b-toggle="'talent-' + ninja.id"
                    variant="outline"
                    >Талант</b-button
                  >
                  <b-button
                    class="w-50"
                    v-b-toggle="'skill-' + ninja.id"
                    variant="outline"
                    >Навык</b-button
                  >
                </b-card-header>
              </b-card>
              <b-collapse :id="'talent-' + ninja.id">
                <b-card>
                  <strong>Талант:</strong>
                  {{ ninja.talent }}
                </b-card>
              </b-collapse>
              <b-collapse :id="'skill-' + ninja.id">
                <b-card>
                  <strong>Навык:</strong>
                  {{ ninja.skill }}
                </b-card>
              </b-collapse>
            </div>
          </b-row>
        </b-list-group-item>
      </b-list-group>
    </b-col>
  </b-row>
</template>

<script>
import TagFilter from "@/components/TagFilter";
import { mapState } from "vuex";

export default {
  name: "CharacterList",
  components: { TagFilter },
  data() {
    return {
      filterInput: "",
      imgProps: {
        width: 56,
        height: 56
      },
      selected: {}
    };
  },
  computed: {
    filteredByNameCharacters() {
      return this.ninjaList.filter(character => {
        return character.name
          .toLowerCase()
          .includes(this.filterInput.toLowerCase());
      });
    },
    filteredByTagAndName() {
      if (this.isTagFilterUsed) {
        return this.filteredByNameCharacters.filter(character => {
          for (const [key, value] of Object.entries(this.selected)) {
            for (const tag of value) {
              if (
                !character.tags ||
                !character.tags[key] ||
                character.tags[key].indexOf(tag) === -1
              )
                return false;
            }
          }
          return true;
        });
      }
      return this.filteredByNameCharacters;
    },
    isTagFilterUsed() {
      for (const [, value] of Object.entries(this.selected)) {
        if (value?.length > 0) return true;
      }
      return false;
    },
    ...mapState({
      filterTags: "tagList",
      ninjaList: "characterList"
    })
  }
};
</script>

<style scoped></style>
