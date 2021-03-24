<template>
    <v-container>
        <v-form @submit.prevent="signup">
            <v-text-field
                    v-model="form.name"
                    label="Name"
            ></v-text-field>
            <span class="red--text" v-if="errors.name">{{errors.name[0]}}</span>
            <v-text-field
                    v-model="form.email"
                    label="E-mail"
            ></v-text-field>
            <span class="red--text" v-if="errors.email">{{errors.email[0]}}</span>
            <v-text-field
                    v-model="form.password"
                    label="Password"
            ></v-text-field>
            <span class="red--text" v-if="errors.password">{{errors.password[0]}}</span>
            <v-text-field
                    v-model="form.password_confirmation"
                    label="Confirm Password"
            ></v-text-field>

                <v-btn
                        color="green"
                        type="submit"
                >SignUp</v-btn>

            <router-link to="/login">
                <v-btn
                        color="green"
                        type="submit"
                >Login</v-btn>
            </router-link>
        </v-form>

    </v-container>
</template>
<script>
    import User from "../../Helpers/User";

    export default {

        data(){
            return {
                form:{
                    name:null,
                    email:null,
                    password:null,
                    password_confirmation:null
                },
                errors:{},
            }

        },
        created(){
            if (User.loggedIn()){
                this.$router.push('forum')
            }
        },
        methods:{
            signup(){
               axios.post('/api/auth/signup',this.form)
                   .then(res => User.responseAfterLogin(res))
                   .catch(error => this.errors = error.response.data.errors)
                this.$router.push('forum')
            }
        }
    }
</script>
<style></style>