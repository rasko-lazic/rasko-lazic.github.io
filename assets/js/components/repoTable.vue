<template>
    <table class="table table-striped">
        <thead>
            <tr>
                <th>Title</th>
                <th>Owner</th>
                <th>Creation time</th>
                <th>Stars</th>
            </tr>
        </thead>

        <tbody>
            <repo-row v-for="repo in repos" :repo-data="repo"></repo-row>
        </tbody>
    </table>
</template>

<script>
    import repoRow from './repoRow.vue'

    export default {
        props: ['repos'],

        components: {
            repoRow
        }
    }
</script>