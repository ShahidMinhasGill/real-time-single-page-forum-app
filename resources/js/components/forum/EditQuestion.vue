<template>
    <v-container>
        <v-app>
            <v-form @submit.prevent="update">
                <v-text-field
                        v-model="form.title"
                        label="Title"
                ></v-text-field>
                <vue-simplemde v-model="form.body" ref="markdownEditor"/>
                <v-card-actions>
                    <v-btn icon small
                           type="submit"
                    >
                        <v-icon>save</v-icon>
                    </v-btn>

                    <v-btn icon small @click="cancel">
                        <v-icon>cancel</v-icon>
                    </v-btn>
                </v-card-actions>

            </v-form>

        </v-app>

    </v-container>
</template>
<script>
    export default {
        props: ['data'],
        data() {
            return {
                form: {
                    title: null,
                    body: null
                }

            }
        },

        created() {
            this.form = this.data
        },
        methods: {
            cancel() {
                return EventBus.$emit('cancelingEditin')
            },
            update() {
                axios.patch(`/api/question/${this.form.slug}`, this.form)
                    .then(res => this.cancel())
            }
        }
    }
</script>