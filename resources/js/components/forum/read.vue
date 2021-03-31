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
        <replies :question="question"> </replies>
        <new-reply :questionSlug="question.slug"></new-reply>
    </div>
</template>
<script>
    import ShowQuestion from './ShowQuestion'
    import EditQuestion from './EditQuestion'
    import Replies from '../reply/replies'
    import NewReply from '../reply/NewReply'

    export default {

        components: {ShowQuestion, EditQuestion,Replies,NewReply},
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
                EventBus.$on('startEditing', () => {
                    this.editing = true
                })
                EventBus.$on('cancelingEditin', () => {
                    this.editing = false
                })
            }
        }
    }
</script>