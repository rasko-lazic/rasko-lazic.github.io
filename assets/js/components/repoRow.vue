<template>
    <tr>
        <th class="repo-name" v-text="repoData.name" @click="showDetails"></th>
        <td v-text="repoData.owner.login"></td>
        <td v-text="dateCreated"></td>
        <td v-text="repoData.stargazers_count"></td>
    </tr>
</template>

<script>
    export default {
        props: ['repoData'],

        methods: {
            showDetails() {
                this.$router.push('/repo/' + this.repoData.owner.login + '/' + this.repoData.name)
            }
        },

        computed: {
            dateCreated() {
                return this.repoData.created_at.substr(0, 10);
            }
        }
    }
</script>

<style scoped>
    .repo-name {
        cursor: pointer;
    }
</style>