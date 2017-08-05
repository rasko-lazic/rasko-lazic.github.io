<template>
    <div>
        <div class="container" v-if="! loading">
            <div>
                <router-link to="/home">Go back home</router-link>
            </div>
            <button class="btn btn-lg btn-primary pull-right" @click="saveRepo">
                <span class="glyphicon glyphicon-save"></span>
                Save
            </button>
            <h2 class="text-center">
                {{ repo.full_name }}
            </h2>
            <div class="row">
                <div class="col-md-2 col-md-offset-1">
                    <img :src="repo.owner.avatar_url" alt="owner-avatar" width="150" height="auto" class="img-rounded">
                </div>
                <div class="col-md-8">
                    Owner: {{ repo.owner.login }} <br>
                    Created at: {{ repo.created_at.substr(0, 10) }} <br>
                    Description: {{ repo.description }} <br>
                    Language: {{ repo.language }} <br>
                    Stars: {{ repo.stargazers_count }} <br>
                    Watchers: {{ repo.watchers_count }} <br>
                    Forks: {{ repo.forks }} <br>
                    Clone URL: {{ repo.clone_url }}
                </div>
            </div>

            <div class="row panel-row">
                <div class="col-md-5 col-md-offset-1">
                    <div class="panel panel-default">
                        <div class="panel-heading">List of topics</div>
                        <div class="panel-body">
                            <ul class="list-group" v-if="topics.length > 0">
                                <li class="list-group-item" v-for="topic in topics">{{ topic }}</li>
                            </ul>
                            <p v-else>No topics found</p>
                        </div>
                    </div>
                </div>

                <div class="col-md-5">
                    <div class="panel panel-default">
                        <div class="panel-heading">List of branches</div>
                        <div class="panel-body">
                            <ul class="list-group">
                                <li class="list-group-item" v-for="branch in branches">{{ branch.name }}</li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>

            <div class="row panel-row">
                <div class="col-md-5 col-md-offset-1">
                    <div class="panel panel-default">
                        <div class="panel-heading">
                            <a :href="issuesLink" target="_blank">List of issues</a>
                        </div>
                        <div class="panel-body">
                            <ul class="list-group" v-if="issues.length > 0">
                                <li class="list-group-item" v-for="issue in issues">
                                    <a :href="issue.html_url" target="_blank">{{ issue.title }}</a>
                                </li>
                            </ul>
                            <p v-else>No issues found</p>
                        </div>
                    </div>
                </div>

                <div class="col-md-5">
                    <div class="panel panel-default">
                        <div class="panel-heading">
                            <a :href="commitsLink" target="_blank">List of branches</a>
                        </div>
                        <div class="panel-body">
                            <ul class="list-group">
                                <li class="list-group-item" v-for="commit in commits">
                                    <a :href="commit.html_url" target="_blank">{{ commit.commit.message }}</a>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div v-else class="loader-container">
            <div class="loader"></div>
        </div>
    </div>
</template>

<script>
    export default {
        data() {
            return {
                repo: {},
                loading: false,
                topics: [],
                branches: [],
                issues: [],
                commits: []
            }
        },

        methods: {
            fetchRepo(owner, name) {
                this.loading = true;
                this.$store.dispatch({
                    type: 'fetchRepo',
                    owner: owner,
                    name: name
                }).then(() => {
                    this.loading = false;
                    this.repo = this.$store.state.repo
                }, (response) => {
                    this.loading = false;
                    console.log(response)
                });
            },

            fetchTopics(owner, name) {
                this.$store.dispatch({
                    type: 'fetchTopics',
                    owner: owner,
                    name: name
                }).then(() => {
                    this.topics = this.$store.state.repoTopics.names
                }, (response) => {
                    console.log(response)
                });
            },

            fetchBranches(owner, name) {
                this.$store.dispatch({
                    type: 'fetchBranches',
                    owner: owner,
                    name: name
                }).then(() => {
                    this.branches = this.$store.state.repoBranches
                }, (response) => {
                    console.log(response)
                });
            },

            fetchIssues(owner, name) {
                this.$store.dispatch({
                    type: 'fetchIssues',
                    owner: owner,
                    name: name
                }).then(() => {
                    if(this.$store.state.repoIssues.length > 5) {
                        this.issues = this.$store.state.repoIssues.slice(0, 5)
                    } else {
                        this.issues = this.$store.state.repoIssues
                    }
                }, (response) => {
                    console.log(response)
                });
            },

            fetchCommits(owner, name) {
                this.$store.dispatch({
                    type: 'fetchCommits',
                    owner: owner,
                    name: name
                }).then(() => {
                    if(this.$store.state.repoCommits.length > 5) {
                        this.commits = this.$store.state.repoCommits.slice(0, 5)
                    } else {
                        this.commits = this.$store.state.repoCommits
                    }
                }, (response) => {
                    console.log(response)
                });
            },

            saveRepo() {
                let savedRepos = JSON.parse(localStorage.getItem("savedRepos"))
                if(savedRepos == null) {
                    savedRepos = [this.repo]
                } else {
                    savedRepos.unshift(this.repo)
                }
                localStorage.setItem("savedRepos", JSON.stringify(savedRepos))
            }
        },

        computed: {
            issuesLink() {
                return 'https://github.com/' + this.repo.full_name + '/issues'
            },

            commitsLink() {
                return 'https://github.com/' + this.repo.full_name + '/commits'
            }
        },

        created() {
            let owner = this.$route.params.owner
            let name = this.$route.params.name

            this.fetchRepo(owner, name)
            this.fetchTopics(owner, name)
            this.fetchBranches(owner, name)
            this.fetchIssues(owner, name)
            this.fetchCommits(owner, name)
        }
    }
</script>

<style scoped>
    .loader-container {
        width: 100%;
        height: 100%;
    }

    .loader {
        border: 16px solid #f3f3f3; /* Light grey */
        border-top: 16px solid #3498db; /* Blue */
        border-radius: 50%;
        width: 120px;
        height: 120px;
        margin: 0 auto;
        animation: spin 2s linear infinite;
    }

    @keyframes spin {
        0% { transform: rotate(0deg); }
        100% { transform: rotate(360deg); }
    }

    .panel-row {
        margin-top: 50px;
    }
</style>