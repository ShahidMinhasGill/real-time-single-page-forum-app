<template>
    <v-container>

        <vue-simplemde v-model="body" ref="markdownEditor"/>
        <v-btn  @click="submit">
            Reply
        </v-btn>
    </v-container>
</template>
<script>
    export default {
        props:['questionSlug'],
        data(){
            return {
                body:null
            }
        },
        methods:{
            submit() {
                axios.post(`/api/question/${this.questionSlug}/reply`, {body: this.body})
                    .then(res => {
                        this.body = ''
                        EventBus.$emit('newReply', res.data.reply)
                        window.scrollTo(0,0)
                    })
            }
        }
    }
</script>