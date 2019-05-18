<template>
  <div>
    <div class="text-center" v-if="showSpinner">
      <b-spinner variant="primary" label="Spinning"></b-spinner>
    </div>
    <div class="text-center" v-if="mdHtmlAbsent">No Readme found!</div>
    <div v-html="mdHtml"></div>
  </div>
</template>

<script>
export default {
  name: "markdown",
  props: {
    contentsUrl: String
  },
  data() {
    return {
      mdHtml: null,
      mdHtmlAbsent: false
    };
  },
  computed: {
    showSpinner() {
      if (!this.mdHtml && !this.mdHtmlAbsent) {
        return true;
      }
      return false;
    }
  },
  mounted() {
    this.getFormattedMd();
  },
  methods: {
    async getFormattedMd() {
      try {
        const response = await this.$RestResource.getMarkdownFormatted(
          this.contentsUrl
        );
        console.log("readme successfully formatted");
        this.mdHtml = response;
      } catch (error) {
        console.error(error);
        this.mdHtmlAbsent = true;
      }
    }
  }
};
</script>

<style>
</style>
