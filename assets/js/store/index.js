import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex);

export default new Vuex.Store({
    state: {
        repositories: [],
        repo: {},
        repoTopics: [],
        repoBranches: [],
        repoIssues: [],
        repoCommits: []
    },

    mutations: {
        setRepositories (state, data) {
            state.repositories = data
        },

        setRepo (state, data) {
            state.repo = data
        },

        setRepoTopics (state, data) {
            state.repoTopics = data
        },

        setRepoBranches (state, data) {
            state.repoBranches = data
        },

        setRepoIssues (state, data) {
            state.repoIssues = data
        },

        setRepoCommits (state, data) {
            state.repoCommits = data
        }
    },

    actions: {
        search ({commit}, payload) {
            return new Promise((resolve, reject) => {
                Vue.http.get('https://api.github.com/search/repositories?q=' + payload.query + '&page=' + payload.page).then(
                    (response) => {
                        commit('setRepositories', response.body.items)
                        resolve()
                    }, (response) => {
                        reject(response.body)
                    }
                )
            })
        },

        fetchRepo ({commit}, payload) {
            return new Promise((resolve, reject) => {
                Vue.http.get('https://api.github.com/repos/' + payload.owner + '/' + payload.name).then(
                    (response) => {
                        commit('setRepo', response.body)
                        resolve()
                    }, (response) => {
                        reject(response.body)
                    }
                )
            })
        },

        fetchTopics ({commit}, payload) {
            return new Promise((resolve, reject) => {
                Vue.http.get('https://api.github.com/repos/' + payload.owner + '/' + payload.name + '/topics', {
                    headers: {
                        Accept: 'application/vnd.github.mercy-preview+json'
                    }

                }).then(
                    (response) => {
                        commit('setRepoTopics', response.body)
                        resolve()
                    }, (response) => {
                        reject(response.body)
                    }
                )
            })
        },

        fetchBranches ({commit}, payload) {
            return new Promise((resolve, reject) => {
                Vue.http.get('https://api.github.com/repos/' + payload.owner + '/' + payload.name + '/branches').then(
                    (response) => {
                        commit('setRepoBranches', response.body)
                        resolve()
                    }, (response) => {
                        reject(response.body)
                    }
                )
            })
        },

        fetchIssues ({commit}, payload) {
            return new Promise((resolve, reject) => {
                Vue.http.get('https://api.github.com/repos/' + payload.owner + '/' + payload.name + '/issues').then(
                    (response) => {
                        commit('setRepoIssues', response.body)
                        resolve()
                    }, (response) => {
                        reject(response.body)
                    }
                )
            })
        },

        fetchCommits ({commit}, payload) {
            return new Promise((resolve, reject) => {
                Vue.http.get('https://api.github.com/repos/' + payload.owner + '/' + payload.name + '/commits').then(
                    (response) => {
                        commit('setRepoCommits', response.body)
                        resolve()
                    }, (response) => {
                        reject(response.body)
                    }
                )
            })
        }
    }
})