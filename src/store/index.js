import Vue from "vue";
import Vuex from "vuex";
import { fb } from "@/firebaseconfig";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    characterList: [],
    tagList: []
  },
  mutations: {
    removeTag(state, { familyId, docId }) {
      const familyTag = state.tagList.find(family => family.id === familyId);
      familyTag.options.splice(
        familyTag.options.findIndex(option => option.id === docId),
        1
      );
    },
    addTag(state, { familyId, ...value }) {
      const optionsTag = state.tagList.find(tag => tag.id === familyId);
      if (
        optionsTag.options.findIndex(option => option.id === value.id) === -1
      ) {
        optionsTag.options = [...optionsTag.options, value];
      }
    },
    tagList(state, tempTagList) {
      state.tagList = tempTagList;
    },
    tagListFamily(state, payload) {
      let index = state.tagList.findIndex(
        tagFamily => tagFamily.id === payload.id
      );
      if (index !== -1) {
        state.tagList[index] = payload;
      } else {
        state.tagList.push(payload);
      }
      Vue.set(state, "tagList", [...state.tagList]);
    },
    characterList(state, docs) {
      state.characterList = docs.map(doc => ({ id: doc.id, ...doc.data() }));
    },
    addNewCharacter(state, newCharacter) {
      const character = state.characterList.find(
        char => char.id === newCharacter.id
      );
      if (!character) {
        state.characterList = [...state.characterList, newCharacter];
      }
    },
    updateCharacter(state, updatedCharacter) {
      let charIndex = state.characterList.findIndex(
        char => char.id === updatedCharacter.id
      );
      state.characterList[charIndex] = updatedCharacter;
    }
  },
  actions: {
    subscribeToTagCollection({ commit }) {
      fb.collection("tagList")
        .orderBy("priority", "asc")
        .get()
        .then(
          allDocs => {
            let tempTagList = {};
            allDocs.docs.map(
              family => (tempTagList[family.id] = { ...family.data() })
            );
            for (const id in tempTagList) {
              fb.collection("tagList")
                .doc(id)
                .collection("options")
                .onSnapshot(
                  tagOptions => {
                    console.log("received snapshot");
                    tempTagList[id].options = tagOptions.docs.map(
                      tagOption => ({
                        id: tagOption.id,
                        ...tagOption.data()
                      })
                    );
                    commit("tagListFamily", { id, ...tempTagList[id] });
                  },
                  error => {
                    console.error(error);
                  }
                );
            }
          },
          error => {
            console.error(error);
          }
        );
    },
    subscribeToCollection({ commit }, collectionName) {
      fb.collection(collectionName).onSnapshot(
        allDocs => {
          commit(collectionName, allDocs.docs);
        },
        error => {
          console.error(error);
        }
      );
    },
    removeTag({ commit }, { familyId, docId }) {
      fb.collection("tagList")
        .doc(familyId)
        .collection("options")
        .doc(docId)
        .delete()
        .then(() => {
          console.log("Deleted");
        })
        .catch(error => {
          console.error(error);
        });
      commit("removeTag", { familyId, docId });
    },
    addTag({ commit }, payload) {
      fb.collection("tagList")
        .doc(payload.familyId)
        .collection("options")
        .add({ value: payload.value })
        .then(docRef => {
          commit("addTag", {
            familyId: payload.familyId,
            id: docRef.id,
            value: payload.value
          });
        })
        .catch(error => {
          console.error(error);
        });
    },
    addNewCharacter({ commit }, newCharacter) {
      fb.collection("characterList")
        .add(newCharacter)
        .then(docRef => {
          commit("addNewCharacter", { id: docRef.id, ...newCharacter });
        })
        .catch(error => {
          console.error(error);
        });
    },
    updateCharacter({ commit }, { id, ...characterData }) {
      fb.collection("characterList")
        .doc(id)
        .update(characterData)
        .then(() => {
          console.log("Document successfully updated!");
        })
        .catch(error => {
          // The document probably doesn't exist.
          console.error("Error updating document: ", error);
        });
      commit("updateCharacter", { id, ...characterData });
    }
  },
  modules: {},
  getters: {
    getOptionsByName: state => familyName => {
      if (state.tagList.find(family => family.label === familyName))
        return state.tagList.find(family => family.label === familyName)
          .options;
      return [];
    },
    availableOptions: (state, getters) => (familyName, selectedOptions) => {
      return getters
        .getOptionsByName(familyName)
        .filter(option => selectedOptions.indexOf(option.value) === -1);
    }
  }
});
