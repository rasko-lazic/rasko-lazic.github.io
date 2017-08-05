<template>
    <div>
        <div class="container search-input-container">
            <div class="row">
                <div class="col-md-6 col-md-offset-3">
                    <form @submit.prevent="startSearch">
                        <div class="input-group">
                            <input type="text" class="form-control" placeholder="Search..." v-model="searchQuery">
                        <span class="input-group-btn">
                            <button class="btn btn-secondary btn-search" type="submit">
                                Start
                            </button>
                        </span>
                        </div>
                    </form>
                </div>
            </div>
        </div>

        <div class="container saved-results-container" v-show="savedRepos.length > 0">
            <div class="col-md-10 col-md-offset-1">
                <repo-table :repos="savedRepos"></repo-table>
            </div>
        </div>
    </div>
</template>

<script>
    import repoTable from '../components/repoTable.vue'

    export default {
        name: 'home',

        components: {
            repoTable
        },

        data () {
            return {
                searchQuery: '',
                savedRepos: []
            }
        },

        methods: {
            startSearch() {
                if(this.searchQuery.length > 0) {
                    this.$router.push('search/' + this.searchQuery + '/1');
                } else {
                    alert("Please don't leave the search filed empty");
                }
            }
        },

        created() {
            //Checking for repos in local storage
            let savedRepos = JSON.parse(localStorage.getItem("savedRepos"))
            if(savedRepos != null && savedRepos.length > 0) {
                this.savedRepos = savedRepos;
            }
        }
    }
</script>

<style scoped>
    .search-input-container {
        margin-top: 150px;
    }

    .saved-results-container {
        margin-top: 100px;
    }

    .btn-search {
        min-width: 75px;
    }

    .glyphicon-refresh-animate {
        -animation: spin .7s infinite linear;
        -webkit-animation: spin2 .7s infinite linear;
    }

    @-webkit-keyframes spin2 {
        from { -webkit-transform: rotate(0deg);}
        to { -webkit-transform: rotate(360deg);}
    }

    @keyframes spin {
        from { transform: scale(1) rotate(0deg);}
        to { transform: scale(1) rotate(360deg);}
    }
</style>