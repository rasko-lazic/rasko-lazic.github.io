<template>
    <div class="container">
        <div class="row">
            <div>
                <router-link to="/home">Go back home</router-link>
            </div>
            <div class="col-md-10 col-md-offset-1">
                <repo-table :repos="repositories"></repo-table>
            </div>
            <div>
                <router-link class="pull-left" :to="previousPage">previous</router-link>
                <router-link class="pull-right" :to="nextPage">next</router-link>
            </div>
        </div>
    </div>
</template>

<script>
    import repoTable from '../components/repoTable.vue'

    export default {
        components: {
            repoTable
        },

        data() {
            return {
                repositories: [],
                nextPage: -1,
                previousPage: -1
            }
        },

        methods: {
            fetchData(params) {
                let query = params.query
                let page = params.pageCount

                this.updatePages(page)

                this.$store.dispatch({
                    type: 'search',
                    query: query,
                    page: page
                }).then(() => {
                    this.repositories = this.$store.state.repositories
                }, (response) => {
                    console.log(response)
                });
            },

            updatePages(page) {
                //TODO find a more stable way to get prev/next page integer
                let pageNum = parseInt(page)
                let nextPageNum = pageNum + 1;
                let prevPageNum = pageNum - 1;

                this.nextPage = nextPageNum.toString();
                this.previousPage = pageNum > 1 ? prevPageNum.toString() : '1';
            }
        },

        created() {
            this.fetchData(this.$route.params)
        },

        // Catching has change
        beforeRouteUpdate(to, from, next) {
            this.fetchData(to.params)
            next();
        }
    }
</script>