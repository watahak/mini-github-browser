<template>
  <b-modal scrollable size="xl" id="readme-modal" ref="readme-modal" title="README.md">
    <b-container id="mdHolder">
      <markdown v-bind:contentsUrl="contentsUrl"/>
    </b-container>

    <div slot="modal-footer"></div>
  </b-modal>
</template>

<script>
import Markdown from "../Markdown.vue";
export default {
  props: {
    contentsUrl: String
  },
  name: "readme-modal",
  components: { Markdown },
  methods: {
    openModal() {
      this.$refs["readme-modal"].show();
    }
  }
};
</script>

<style>
.modal-body {
  /* ah this does not work...*/
  transition: flex 0.3s ease-out;
}
</style>
