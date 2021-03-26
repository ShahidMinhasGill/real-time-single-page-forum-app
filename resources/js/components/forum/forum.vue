<template>
    <v-container fuild grid-list-md>
        <v-layout row wrap>
            <v-flex xs8>
                <question

                        v-for="question in questions"
                        :key="question.id"
                        :data=question
                >
                </question>
            </v-flex>
            sidebar
        </v-layout>
    </v-container>
</template>
<script>

    import question from './question'

    export default {
        components: {question},
        data() {
            return {
                questions: {}
            }
        },
        created() {
            axios.get('/api/question')
                .then(res => this.questions = res.data.data)
                .catch(err => console.log(err.response.data))
        }
    }
</script>