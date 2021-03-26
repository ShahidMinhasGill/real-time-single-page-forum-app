<template>
    <v-container>
        <v-app>
            <v-form @submit.prevent="create">
                <v-text-field
                        v-model="form.title"
                        label="Title"
                ></v-text-field>
                <v-select
                        :items="categories"
                        item-text="name"
                        item-value="id"
                        v-model="form.category_id"
                        label="Category"
                        hint="Select Category"
                        persistent-hint
                        autocomplete
                ></v-select>
                <vue-simplemde v-model="form.body" ref="markdownEditor"/>
                <v-btn
                        color="green"
                        type="submit"
                >Create
                </v-btn>

            </v-form>

        </v-app>

    </v-container>

</template>

<script>
    export default {

      data(){
          return {
              form:{
                  title:null,
                  category_id:null,
                  body:null,

              },
              categories:{},
              errors:{}
          }
      },
        created(){
            axios.get('/api/category')
                .then(response => this.categories = response.data.data)
        },
        methods:{
        create(){
              axios.post('/api/question',this.form)
                  .then(res => this.$router.push(res.data.path))
                  .catch(error => this.errors =  error.response.data.error)
        }
        }
    }
</script>

<style>

</style>