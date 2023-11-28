<script>
import axios from "axios";
import { useRouter } from 'vue-router';

export default {
  name: "UsersEdit",
  data() {
    return {
      rules: {
        required: value => !!value || 'Field is required',
      },
      userId:'',
      model: {
        
        user: {
          
          username: '',
          email: '',
          
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
  

    getUserById(userId) {
       
      axios.get(`http://localhost:8080/v1/users/${userId}`).then(res => {
        this.model.user = res.data;
        
        this.model.user.userDetail.birthDay=this.formatDate(res.data.userDetail.birthDay);
        
      }).catch(function (error) {
        console.log(error);
      })
    },

    


    formatDate(birthDay){
      const date = new Date(birthDay);
      const onlyDate = date.toISOString().split('T')[0];
      return onlyDate;
    },

    editUser() {
        
      axios.put(`http://localhost:8080/v1/users/${this.userId}`, this.model.user)
          .then(res => {
            alert('User was edited successful');
        
          }).catch(function (error) {
           console.log(error);
      })
    },

   
  },
  mounted() {
       
        this.userId = this.$route.params.id;
        this.getUserById(this.userId);
    }
}
</script>
<template>
    <v-row align-content="center" justify="center">
    <v-card title="Edit user"  :min-height="600" :width="600" class="pa-10 ma-10 text-center align-center"  text-center>
    
    <v-form >
      <v-text-field
        v-model="model.user.username"
        :rules="[rules.required]"
        clearable
        label="Username"
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
            
            <v-btn type="submit"  class=" mr-10" :width="150"  @click="editUser">Submit</v-btn>
            <v-btn type="button"  :width="150" :to="{ path: '/'}">Cancel</v-btn>
            
        </v-row>
    </v-form>
    </v-card>
    </v-row>
</template>