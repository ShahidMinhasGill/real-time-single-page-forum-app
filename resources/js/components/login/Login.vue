<template>
    <v-container>
        <v-form @submit.prevent="login">
            <v-text-field
                    v-model="form.email"
                    label="E-mail"
            ></v-text-field>
            <v-text-field
                    v-model="form.password"
                    label="Password"
            ></v-text-field>
            <v-btn
                    color="green"
                    type="submit"
            >Login
            </v-btn>
            <router-link to="/signup">
                <v-btn
                        color="green"
                        type="submit"
                >SignUp
                </v-btn>
            </router-link>

        </v-form>

    </v-container>
</template>
<script>
    import User from "../../Helpers/User";

    export default {
        data() {
            return {
                form: {
                    email: null,
                    password: null
                }
            }
        },
        created() {
            if (User.loggedIn()) {
                this.$router.push('forum')
            }
        },
        methods: {
            login() {
                User.login(this.form)
            }
        }
    }
</script>
<style></style>