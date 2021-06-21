<template>
  <b-form @submit.prevent="validateInputForm">
    <strong v-if="actionType === 'add'">Добавление</strong>
    <div class="form-group row">
      <div class="col-xs-6 col-md-6">
        <b-form-input
          class="mb-2"
          placeholder="Name"
          v-model.trim="ninjaFormInput.name"
          required
        />
        <b-form-input placeholder="Icon" v-model.trim="ninjaFormInput.image" />
      </div>
    </div>

    <div class="form-group row">
      <div class="col-xs-6 col-md-6">
        <b-form-textarea
          placeholder="Talent"
          v-model.trim="ninjaFormInput.talent"
          required
        />
      </div>
      <tag-manipulator
        class="col-xs-6 col-md-6"
        :type="TAG.TALENT"
        :selected="ninjaFormInput.tags[TAG.TALENT]"
        :available="
          availableOptions(TAG.TALENT, ninjaFormInput.tags[TAG.TALENT])
        "
        v-on:addTagToDescription="addTagToDescription"
        v-on:removeSelectedOption="removeSelectedOption"
      />
    </div>

    <div class="form-group row">
      <div class="col-xs-6 col-md-6">
        <b-form-textarea
          placeholder="Skill"
          v-model.trim="ninjaFormInput.skill"
          required
        />
      </div>
      <tag-manipulator
        class="col-xs-6 col-md-6"
        :type="TAG.SKILL"
        :selected="ninjaFormInput.tags[TAG.SKILL]"
        :available="availableOptions(TAG.SKILL, ninjaFormInput.tags[TAG.SKILL])"
        v-on:addTagToDescription="addTagToDescription"
        v-on:removeSelectedOption="removeSelectedOption"
      />
    </div>
    <tag-manipulator
      :type="TAG.CROWD_CONTROL"
      :selected="ninjaFormInput.tags[TAG.CROWD_CONTROL]"
      :available="
        availableOptions(
          TAG.CROWD_CONTROL,
          ninjaFormInput.tags[TAG.CROWD_CONTROL]
        )
      "
      v-on:addTagToDescription="addTagToDescription"
      v-on:removeSelectedOption="removeSelectedOption"
    />
    <tag-manipulator
      class="mt-2"
      :type="TAG.IMMUNITY"
      :selected="ninjaFormInput.tags[TAG.IMMUNITY]"
      :available="
        availableOptions(TAG.IMMUNITY, ninjaFormInput.tags[TAG.IMMUNITY])
      "
      v-on:addTagToDescription="addTagToDescription"
      v-on:removeSelectedOption="removeSelectedOption"
    />
    <b-radio-group
      :options="ninjaType"
      v-model="ninjaFormInput.type"
      value-field="value"
      text-field="text"
      class="my-3"
    />
    <b-button type="submit" variant="primary">Submit</b-button>
    <b-button @click="resetInputForm" variant="danger">Reset</b-button>
  </b-form>
</template>
<script>
import TagManipulator from "@/components/editor/TagManipulator";
import { mapGetters } from "vuex";
import { TAG } from "@/constantHelper";

export default {
  name: "CharacterForm",
  components: { TagManipulator },
  data() {
    return {
      ninjaFormInput: {
        name: "",
        image: "",
        talent: "",
        skill: "",
        tags: {
          talent: [],
          skill: [],
          "crowd-control": [],
          immunity: []
        },
        type: "Авангард"
      },
      ninjaType: [
        { text: "Авангард", value: "Авангард" },
        { text: "Штурмовик", value: "Штурмовик" },
        { text: "Помощник", value: "Помощник" }
      ]
    };
  },
  props: {
    actionType: {
      type: String,
      required: true
    },
    selectedForEdit: {
      required: false,
      type: Object
    }
  },
  computed: {
    ...mapGetters(["getOptionsByName", "availableOptions"])
  },
  created() {
    this.TAG = TAG;
  },
  methods: {
    validateInputForm: function() {
      this.$emit("saveInputForm", {
        actionType: this.actionType,
        data: this.ninjaFormInput
      });
      if (this.actionType !== "edit") this.resetInputForm();
    },
    resetInputForm() {
      this.ninjaFormInput = {
        name: "",
        image: "",
        talent: "",
        skill: "",
        tags: {
          talent: [],
          skill: [],
          "crowd-control": [],
          immunity: []
        },
        type: "Авангард"
      };
    },
    addTagToDescription: function(type, value) {
      this.ninjaFormInput.tags[type].push(value);
    },
    removeSelectedOption: function(type, value) {
      this.ninjaFormInput.tags[type] = this.ninjaFormInput.tags[type].filter(
        tag => tag !== value
      );
    }
  },
  watch: {
    selectedForEdit: function() {
      if (Object.keys(this.selectedForEdit).length === 0) this.resetInputForm();
      else this.ninjaFormInput = this.selectedForEdit;
    }
  }
};
</script>
