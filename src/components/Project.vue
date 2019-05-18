<template>
  <div id="card-content">
    <b-card :title="project.name" :sub-title="project.language">
      <b-card-text>{{project.description}}</b-card-text>
      <b-card-text>
        <b-link :href="project.html_url" target="_blank" class="card-link">{{project.html_url}}</b-link>
      </b-card-text>

      <div slot="footer">
        <b-button @click.prevent="launchReadme" variant="light">View Readme</b-button>
      </div>
    </b-card>

    <readme-modal ref="readme-modal" v-bind:contentsUrl="contentsUrl"></readme-modal>
  </div>
</template>

<script>
import ReadmeModal from "./modals/ReadmeModal.vue";
export default {
  name: "project",
  components: { ReadmeModal },
  data() {
    return {
      contentsUrl: ""
    };
  },
  props: {
    project: {
      name: String,
      full_name: String,
      language: String,
      description: String,
      html_url: String
    }
  },
  methods: {
    async launchReadme() {
      this.contentsUrl = this.$RestResource.getContentsUrl(this.project);
      this.$refs["readme-modal"].openModal();
    }
  }
};
</script>

<style>
.card-link {
  font-size: smaller;
}
div.card-footer {
  padding: unset;
}
div.card-footer button {
  width: 100%;
  border-radius: unset;
}
</style>
