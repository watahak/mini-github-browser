<template>
  <div>
    <b-container fluid id="search" v-bind:class="{ active: isActiveSearch}">
      <b-row class="my-1 justify-content-center">
        <b-form-input
          id="input-large"
          class="w-50"
          :size="isActiveSearch ? 'sm' : 'lg'"
          v-model="username"
          :state="inputState"
          placeholder="Enter Username"
          @focus="inputActive = true"
          @blur="inputActive = false"
          @keyup.enter.native="getUser"
          autocomplete="off"
        ></b-form-input>

        <b-button
          id="button-large"
          class="ml-2"
          :size="isActiveSearch ? 'sm' : 'lg'"
          @click.prevent="getUser"
          variant="primary"
        >Search</b-button>
      </b-row>
    </b-container>

    <h5 class="mb-2">{{getMessage}}</h5>

    <b-card-group columns id="projectHolder">
      <project v-for="project in userProjects" :key="project.id" v-bind:project="project"/>
    </b-card-group>
  </div>
</template>

<script>
import Project from "@/components/Project.vue";

export default {
  name: "user-browser",
  data() {
    return {
      username: "",
      currentUsername: "",
      userProjects: [],
      searchInitialized: false,
      inputState: null,
      inputActive: false
    };
  },
  created() {},
  mounted() {},
  computed: {
    isActiveSearch() {
      return this.searchInitialized && !this.inputActive;
    },
    getMessage() {
      if (!this.searchInitialized && this.inputState == null)
        return "Type in GitHub Username To Begin";
      if (!this.searchInitialized && this.inputState == false)
        return "Username not found!";
      if (
        this.searchInitialized &&
        this.inputState == null &&
        this.userProjects == []
      )
        return "No Projects Found!";

      if (
        this.searchInitialized &&
        this.inputState == null &&
        this.userProjects.length > 0
      )
        return `Found ${this.userProjects.length} projects by ${
          this.currentUsername
        }`;

      return "";
    }
  },
  methods: {
    async getUser() {
      this.userProjects = [];
      this.searchInitialized = false;
      this.currentUsername = "";

      if (!this.username) {
        console.error("no username!");
        return;
      }

      // check if user exists
      let getGitUserResponse = await this.$RestResource
        .getGitUser(this.username)
        .catch(error => {
          switch (error.response.status) {
            case 404:
              console.error("User does not exist!");
              this.inputState = false;
              this.searchInitialized = false;
              return;
            default:
              console.error(error);
          }
        });

      if (!getGitUserResponse) return;
      else {
        this.inputState = null;
        this.currentUsername = this.username.toString();
      }

      // now get users repos
      const response = await this.$RestResource
        .getGitUserRepos(this.username)
        .catch(error => {
          console.error(error);
        });
      const repos = response.data;
      console.log("received user data!", repos);
      this.searchInitialized = true;
      this.userProjects = repos;
    }
  },
  components: {
    Project
  }
};
</script>

<style>
#search {
  margin-top: 1em;
  margin-bottom: 1em;
}
#projectHolder {
  padding: 0 1em;
}
#input-large,
#button-large {
  transition: width, height 0.3s;
}
</style>