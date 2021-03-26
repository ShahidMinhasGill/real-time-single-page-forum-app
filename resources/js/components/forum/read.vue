<template>
    <div v-if="question">
        <edit-question
                v-if="editing"
                :data=question
        ></edit-question>

        <show-question
                v-else
                :data=question
        ></show-question>
    </div>
</template>
<script>
    import ShowQuestion from './ShowQuestion'
    import EditQuestion from './EditQuestion'
    export default {

        components:{ShowQuestion,EditQuestion},
        data() {
            return {
                question: null,
                editing: false
            }
        },
        created() {
            this.getQuestion()
            this.listen()
        },
        methods: {
            getQuestion() {
                axios.get(`/api/question/${this.$route.params.slug}`)
                    .then(res => this.question = res.data.data)
            },

            listen() {
                EventBus.$on('startEditing',()=>{
                    this.editing = true
                })
                EventBus.$on('cancelingEditin',()=>{
                    this.editing = false
                })
            }
        }
    }
</script>