<script>
import axios from "axios";

export default {
  name: "UsersCreate",
  data() {
    return {
      rules: {
        required: value => !!value || 'Field is required',
      },
      model: {
        user: {
          username: '',
          email: '',
          password:'',
          userDetail:{
            firstName: '',
            lastName: '',
            age: '',
            birthDay:null
          }
        }
      },
      
    }
  },
  methods: {
    //@submit.prevent="handleSubmit"
    handleSubmit() {
   
      console.log('Formulario enviado:', this.model.user);
    },

    saveUser() {
      axios.post('http://localhost:8080/v1/users', this.model.user)
          .then(res => {
            alert('User was saved successful');
            this.model.user = {
                username: '',
                email: '',
                password:'',
                userDetail:{
                    firstName: '',
                    lastName: '',
                    age: '',
                    birthDay:null
                }
                }
          }).catch(function (error) {
            // hangle error on UI site
      })
    }
  }
}
</script>
<template>
    <v-row align-content="center" justify="center">
    <v-card title="Add user"  :min-height="600" :width="600" class="pa-10 ma-10 text-center align-center"  text-center>
    
    <v-form >
      <v-text-field
        v-model="model.user.username"
        :rules="[rules.required]"
        clearable
        label="Username"
      ></v-text-field>

      <v-text-field
        v-model="model.user.password"
        :rules="[rules.required]"
        clearable
        label="Password"
      ></v-text-field>

      <v-text-field
        v-model="model.user.email"
        :rules="[rules.required]"
        clearable
        label="Email"
      ></v-text-field>

      <v-text-field
        v-model="model.user.userDetail.firstName"
        :rules="[rules.required]"
        clearable
        label="First name"
      ></v-text-field>

      <v-text-field
        v-model="model.user.userDetail.lastName"
        :rules="[rules.required]"
        clearable
        label="Last name"
      ></v-text-field>

      <v-text-field
        v-model="model.user.userDetail.age"
        :rules="[rules.required]"
        clearable
        label="Age"
      ></v-text-field>

      <v-text-field 
        v-model="model.user.userDetail.birthDay" 
        label="Selecciona una fecha" 
        :rules="[rules.required]"
        clearable
        type="date"
       ></v-text-field>

        <v-row justify="center" class="mt-10">
            
            <v-btn type="submit"  class=" mr-10" :width="150"  @click="saveUser">Submit</v-btn>
            <v-btn type="button"  :width="150" :to="{ path: '/'}">Cancel</v-btn>
            
        </v-row>
    </v-form>
    </v-card>
    </v-row>
</template>