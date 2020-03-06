<template>
  <base-material-card  v-if="currentUser.length > 0" color="success" icon="mdi-clipboard-text" inline title="Пользователи" class="px-5 py-3">
    <!--  Текущии пользователь  -->
    <div class="mt-6">
      <h3>Ваши данные</h3>
      <v-row>
        <v-col cols="12" sm="4" md="2">
          <v-text-field
            label="Имя"
            v-model="currentUser[0].name"
          ></v-text-field>
        </v-col>
        <v-col cols="12" sm="4" md="2">
          <v-text-field
            label="Email"
            v-model="currentUser[0].email"
          ></v-text-field>
        </v-col>
        <v-col cols="12" sm="4" md="2">
          <v-text-field
            type="password"
            label="Пароль"
            v-model="currentUser[0].password"
          ></v-text-field>
        </v-col>
        <v-col cols="12" sm="4" md="2">
          <v-text-field
            type="password"
            label="Повторите пароль"
            v-model="currentUser[0].confirmPassword"
          ></v-text-field>
        </v-col>
        <v-col class="text-center" cols="12" sm="4" md="4">
          <v-btn class="mt-5" tile small outlined color="success" @click="changeCurrentUserData()">
            Сохранить изменения
          </v-btn>
        </v-col>
      </v-row>
    </div>
    <!--  Конец текущии пользователь  -->

    <!--  Все пользователи  -->
    <div class="mt-6" v-if="usersData.length > 0">
      <h3>Список пользователей</h3>
      <div>
        <v-row>
          <v-col cols="12" sm="4" md="2">
            <v-text-field
              label="Имя"
              v-model="userData.name"
            ></v-text-field>
          </v-col>
          <v-col cols="12" sm="4" md="2">
            <v-text-field
              label="Email"
              v-model="userData.email"
            ></v-text-field>
          </v-col>
          <v-col cols="12" sm="4" md="2">
            <v-text-field
              type="password"
              label="Пароль"
              v-model="userData.password"
            ></v-text-field>
          </v-col>
          <v-col cols="12" sm="4" md="2">
            <v-text-field
              type="password"
              label="Повторите пароль"
              v-model="userData.confirmPassword"
            ></v-text-field>
          </v-col>
          <v-col class="text-center" cols="12" sm="4" md="4">
            <v-btn class="mt-5" tile small outlined color="success" @click="addUser()">
              Добавить пользователя
            </v-btn>
          </v-col>
        </v-row>

        <v-simple-table>
          <template v-slot:default>
            <thead>
            <tr>
              <th class="text-left">№</th>
              <th class="text-left">Имя</th>
              <th class="text-left">Email</th>
              <th class="text-left">Статус</th>
              <th class="text-center">Действие</th>
              <th class="text-center">Удаление</th>
            </tr>
            </thead>
            <tbody>
            <tr v-for="u,key in usersData">
              <td>{{ key+1 }}</td>
              <td>{{ u.name }}</td>
              <td>{{ u.email }}</td>
              <td>
                <span v-if="u.status == 1">Админ</span>
                <span v-else>Пользователь</span>
              </td>
              <td class="text-center">
                <v-btn tile small outlined color="success active" v-if="u.status == 1" @click="changeUserStatus(u.id)">
                  Сделать пользователем
                </v-btn>
                <v-btn tile small outlined color="success active" v-else @click="changeUserStatus(u.id)">
                  Сделать админом
                </v-btn>
              </td>
              <td class="text-center">
                <v-btn tile small outlined color="error active" @click="deleteUser(u.id)">
                  Удалить
                </v-btn>
              </td>
            </tr>
            </tbody>
          </template>
        </v-simple-table>
      </div>
    </div>
    <!--  Конец все пользователи  -->
  </base-material-card>
</template>

<script>
  import {axiosInstance as axios} from "../../../../plugins/axios";

  export default {
    name: 'UsersData',

    props: {
      usersData: Array,
      currentUser: Array,
      userData: Object,
      addUser: Function,
      changeCurrentUserData: Function,
      changeUserStatus: Function,
      deleteUser: Function,
    },

    data: () => ({
      //...
    }),

    methods: {
      //...
    },
  }
</script>
