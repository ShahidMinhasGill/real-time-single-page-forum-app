<template>
    <div class="mt-2">
        <v-card>
            <v-card-title>
                <div class="headline">{{data.user}}</div>
                <div> <span> said </span> {{data.created_at}}</div>
            </v-card-title>
            <v-divider></v-divider>
            <v-card-text v-html="reply"></v-card-text>
             <edit-reply
                     v-if="editing"
                     :reply="data"
             ></edit-reply>
            <div v-else>
                <v-divider></v-divider>
                <v-card-actions v-if="own">
                    <v-btn icon small @click="edit">
                        <v-icon color="orange">edit</v-icon>
                    </v-btn>
                    <v-btn icon small @click="destory">
                        <v-icon color="red">delete</v-icon>
                    </v-btn>
                </v-card-actions>
            </div>

        </v-card>
    </div>
</template>
<script>
    import User from "../../Helpers/User";
    import EditReply from './editReply'
    export default {
        components:{EditReply},
        props: ['data','index'],
        data(){
            return{
             editing:false
            }
        },
        created(){
          this.listen()
        },

        computed: {
            own() {
                return User.own(this.data.user_id)

            },
            reply() {
                return md.parse(this.data.reply)
            }
        },
        methods:{
            destory(){
               EventBus.$emit('deleteReply',this.index);
            },
            edit(){
                this.editing = true
            },
            listen() {
                EventBus.$on('cancelEditing', () => {
                    this.editing = false
                })
            },
        }
    }
</script>