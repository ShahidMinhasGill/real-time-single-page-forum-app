<template>

    <v-card>
        <v-container>
            <v-card-title>
                <div>
                    <div class="headline">
                        {{data.title}}
                    </div>
                    <span>{{data.user}} Said {{data.created_at}}</span>
                </div>
                <v-spacer></v-spacer>
                <v-btn>{{data.reply_count}} replies</v-btn>
            </v-card-title>
            <v-card-text v-html="body"></v-card-text>
            <v-card-actions v-if="own">
                <v-btn icon small @click="edit">
                    <v-icon color="orange">edit</v-icon>
                </v-btn>
                <v-btn icon small @click="destroy">
                    <v-icon color="red">delete</v-icon>
                </v-btn>
            </v-card-actions>
        </v-container>
    </v-card>


</template>
<script>
    import md from 'marked'
    import User from "../../Helpers/User";

    export default {
        data() {
            return {
                own: User.own(this.data.user_id)
            }
        },
        props: ['data'],
        computed: {
            body() {
                return md.parse(this.data.body)
            }
        },
        methods: {
            destroy() {
                axios.delete(`/api/question/${this.data.slug}`)
                    .then(res => this.$router.push('/forum'))
                    .catch(err => console.log(err.response.data.error))
            },
            edit() {
                return EventBus.$emit('startEditing')
            }
        }
    }
</script>