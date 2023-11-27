<script >
import axios from "axios";
  export default {
    data: () => ({
      users: [],
      tab: null,
      
    }),
    methods: {

    formatDate(birthDay){
      const date = new Date(birthDay);
      const onlyDate = date.toISOString().split('T')[0];
      return onlyDate;
    },

    getStudents() {
      axios.get('http://localhost:8080/v1/users?detailed=true').then(res => {
        this.users = res.data;
      }).catch(function (error) {
        // handle error on UI site
      })
    },

    deleteStudentById(studentId) {
        if (confirm('Are you sure, you want to delete this data?')) {
          axios.delete(`http://localhost:8080/v1/students/${studentId}`).then(res => {
            this.getStudents();
          }).catch(function (error) {
            // handle error on UI site
          })
        }
      }
    },

    mounted() {
      this.getStudents();
    }
  }
</script>


<template>
  
   <v-tabs v-model="tab" color="deep-purple-accent-4" align-tabs="center">
    <v-tab :value="1">Home</v-tab>
    <v-tab :value="2">Users</v-tab>
  </v-tabs>
  <v-window v-model="tab">
    <v-window-item v-for="n in 3" :key="n" :value="n">
      <v-container fluid v-if="tab==1"> 
          <v-card class="mx-auto my-8" max-width="344" elevation="16">
            <v-card-item>
              <v-card-title> Home </v-card-title>
              <v-card-subtitle> Módulo 3 </v-card-subtitle>
            </v-card-item>

            <v-card-text> Frontend to display user data with details. </v-card-text>
          </v-card>
      </v-container>

      <v-container fluid v-if="tab==2"> 
        
        <v-row>
          <v-col class="text-right">
            
            <v-btn
              class="ma-2"
              color="primary"
            >
              Add user
              <v-icon
                end
                icon="mdi-plus"
              ></v-icon>
            </v-btn>
            
          </v-col>
        </v-row>

        <v-table
              fixed-header
              height="500px"
            >
          <thead>
            <tr>
              <th class="text-center">
                Nro
              </th>
              <th class="text-center">
                Username
              </th>
              <th class="text-center">
                Email
              </th>
              <th class="text-center">
                First name
              </th>
              <th class="text-center">
                Last name
              </th>
              <th class="text-center">
                Age
              </th>
              <th class="text-center">
                Birth day
              </th>
              <th class="text-center">
                Actions
              </th>
            </tr>
          </thead>
          <tbody>
            <tr
              v-for="item in users"
              :key="item.name"
            >
              <td class="text-center">{{ item.id }}</td>
              <td class="text-center">{{ item.username }}</td>
              <td class="text-center">{{ item.email }}</td>
              <td class="text-center">{{ item.userDetail.firstName }}</td>
              <td class="text-center">{{ item.userDetail.lastName }}</td>
              <td class="text-center">{{ item.userDetail.age }}</td>
              <td class="text-center">{{ formatDate(item.userDetail.birthDay) }}</td>
              <td class="text-center">
                
                <v-btn
                  class="ma-2"
                  variant="text"
                  icon="mdi-account-edit" 
                  elevation="1"     
                  title="Edit"     
                  :to="{ path: '/users/' + item.id + '/edit' }"
                ></v-btn>

                <v-btn
                  class="ma-2"
                  variant="text"
                  icon="mdi-trash-can-outline"
                  elevation="1"
                  title="Delete"                    
                ></v-btn>
              </td>
            </tr>
          </tbody>
        </v-table>
      </v-container>
    </v-window-item>
  </v-window>
</template>

