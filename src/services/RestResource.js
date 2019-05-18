import axios from "axios";

export default class RestResource {
  async getGitUser(username) {
    const data = await axios
      .get("https://api.github.com/users/" + username)
      .catch(function(error) {
        throw error;
      });
    return data;
  }

  async getGitUserRepos(username) {
    const data = await axios
      .get("https://api.github.com/users/" + username + "/repos")
      .catch(function(error) {
        throw error;
      });
    return data;
  }

  async getMarkdownContents(repoContentsUrl) {
    // demo url "https://api.github.com/repos/octocat/boysenberry-repo-1/contents/{+path}"
    const mdUrl = repoContentsUrl.split("{")[0] + "README.md";
    const data = await axios.get(mdUrl).catch(function(error) {
      throw error;
    });
    return data;
  }

  async getUrl(url) {
    const data = await axios.get(url).catch(function(error) {
      throw error;
    });
    return data;
  }

  async postMarkdown(rawMd) {
    const config = {
      headers: { "Content-Type": "text/plain" }
    };

    const data = await axios
      .post(
        "https://api.github.com/markdown",
        {
          text: rawMd,
          mode: "gfm",
          context: "github/user"
        },
        config
      )
      .catch(function(error) {
        throw error;
      });
    return data;
  }

  async getMarkdownFormatted(contentsUrl) {
    const getMarkdownContentsResponse = await this.getMarkdownContents(
      contentsUrl
    ).catch(function(error) {
      throw error;
    });
    const markdownContents = getMarkdownContentsResponse.data;
    const markdownURL = this.getMdUrl(markdownContents); // now get raw md by calling api
    //console.log("received MarkdownContents data!", markdownContents);

    const getUrlResponse = await this.getUrl(markdownURL).catch(function(
      error
    ) {
      throw error;
    });
    const rawMd = getUrlResponse.data; // now get formatted md by calling api
    //console.log("received raw markdown data!", rawMd);

    const postMarkdownResponse = await this.postMarkdown(rawMd).catch(function(
      error
    ) {
      throw error;
    });
    const formattedMd = postMarkdownResponse.data;
    //console.log("received formatted markdown data!", formattedMd);
    return formattedMd;
  }

  getContentsUrl(projObj) {
    return projObj["contents_url"];
  }
  getMdUrl(contentObj) {
    return contentObj["download_url"];
  }
}
