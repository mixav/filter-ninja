<template>
  <b-card no-body>
    <b-tabs pills vertical>
      <b-tab v-for="option in options" :key="option.value" :title="option.text">
        <character-editor v-if="type === 'Ninjas'" :actionType="option.value" />
        <equipment-editor v-if="type === 'Equip'" />
        <accessories-editor v-if="type === 'Accessories'" />
      </b-tab>
    </b-tabs>
  </b-card>
</template>

<script>
import CharacterEditor from "@/components/editor/CharacterEditor";
import EquipmentEditor from "@/components/editor/EquipmentEditor";
import AccessoriesEditor from "@/components/editor/AccessoriesEditor";

export default {
  name: "DataEditor",
  components: { CharacterEditor, EquipmentEditor, AccessoriesEditor },
  data() {
    return {
      options: [
        { value: "add", text: "Добавить" },
        { value: "remove", text: "Удалить" },
        { value: "edit", text: "Редактировать" }
      ]
    };
  },
  props: {
    type: {
      type: String,
      required: true,
      default: "Ninjas"
    }
  }
};
</script>
