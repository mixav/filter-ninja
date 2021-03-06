import Vue from "vue";
import VueRouter from "vue-router";
import CharacterList from "@/components/view/CharacterList";
import DataEditor from "@/components/editor/DataEditor";
import DictionaryEditor from "@/components/editor/DictionaryEditor";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    alias: "/CharacterList",
    name: "CharacterList",
    component: CharacterList
  },
  {
    path: "/DataEditor/Dictionaries",
    name: "DictionaryEditor",
    component: DictionaryEditor
  },
  {
    path: "/DataEditor/:type",
    name: "DataEditor",
    component: DataEditor,
    props: true
  }
];

const router = new VueRouter({
  routes
});

export default router;
