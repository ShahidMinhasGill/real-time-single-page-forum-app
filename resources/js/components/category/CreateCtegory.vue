<template>
    <v-container>
        <v-app>
            <v-form @submit.prevent="submit">
                <v-text-field
                        v-model="form.name"
                        label="Category"
                ></v-text-field>

                <v-btn color="teal" type="submit" v-if="editSlug">Update</v-btn>
                <v-btn color="green" type="submit" v-else>Create</v-btn>
                <v-card
                        max-width="475"
                        class="mx-auto"
                >
                    <v-toolbar
                            color="teal"
                            dark
                    >

                        <v-toolbar-title>Category</v-toolbar-title>
                    </v-toolbar>

                    <v-list>
                        <div
                                v-for="category in categories"
                                :key="category.id"
                        >
                            <v-list-item

                            >


                                <v-list-item-action>
                                    <v-btn icon small @click="edit(category.name,category.slug)">
                                        <v-icon color="orange">edit</v-icon>
                                    </v-btn>
                                </v-list-item-action>
                                <v-list-item-content>
                                    <v-list-item-title>{{category.name}}</v-list-item-title>
                                    <v-list-item-subtitle></v-list-item-subtitle>
                                </v-list-item-content>

                                <v-btn icon small @click="destroy(category.slug,index)" >
                                    <v-icon color="red">delete</v-icon>
                                </v-btn>
                            </v-list-item>
                        </div>

                    </v-list>


                </v-card>
            </v-form>

        </v-app>

    </v-container>
</template>
<script>
    import User from "../../Helpers/User";

    export default {

        props: ['index'],
        data() {
            return {
                form: {
                    name: null,

                },
                categories: {},
                editSlug:null
            }
        },
        created() {
            if(!User.admin()){
                this.$router.push('/forum')
            }
            axios.get('/api/category')
                .then(res => this.categories = res.data.data)
        },
        methods: {
            submit() {
           this.editSlug ? this.update() : this.create()
            },
            create(){
                axios.post('/api/category', this.form)
                    .then(res => {
                        this.categories.unshift(res.data)
                        this.form.name = null
                    })
            },
            update(){
                axios.patch(`/api/category/${this.editSlug}`, this.form)
                    .then(res => {
                        this.categories.unshift(res.data)
                        this.form.name = null

                    })
            },
            destroy(slug, index) {
                axios.delete(`/api/category/${slug}`)
                    .then(res => this.categories.splice(index, 1))
            },
            edit(name,slug,index) {
               this.form.name = name
               this.editSlug = slug
               this.categories.splice(index, 1)
            }
        }
    }
</script>