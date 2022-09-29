<template>
  <div class="mt-10">
    <v-btn v-if="!isForm" @click="isForm=true"
        class="mr-6"
    >Добавить пользователя
    </v-btn>
    <v-form  v-else v-model="valid" @submit.prevent="submit">
      <v-row class="d-flex align-center">
        <v-col
            cols="12"
            md="4"
        >
          <v-text-field
              v-model="id"
              :rules="idRules"
              label="ID"
              required
          ></v-text-field>
        </v-col>
        <v-col
            cols="12"
            md="4"
        >
          <v-text-field
              v-model="firstName"
              :rules="nameRules"
              label="Имя"
              required
          ></v-text-field>
        </v-col>

        <v-col
            cols="12"
            md="4"
        >
          <v-text-field
              v-model="lastName"
              :rules="nameRules"
              label="Фамилия"
              required
          ></v-text-field>
        </v-col>

        <v-col
            cols="12"
            md="4"
        >
          <v-text-field
              v-model="email"
              :rules="emailRules"
              label="E-mail"
              required
          ></v-text-field>
        </v-col>
        <v-col
            cols="12"
            md="4"
        >
          <v-text-field
              v-model="phone"
              @click="setOnClickPhone"
              placeholder="8 (___) ___-__-__"
              :rules="phoneRules"
              :counter="12"
              required
          ></v-text-field>
        </v-col>
        <v-col cols="12"
               md="4">
          <v-btn class="mr-4"
                 type="submit"
                 :disabled="!valid"
          >
            Добавить пользователя
          </v-btn>
        </v-col>
      </v-row>
    </v-form>
  </div>

</template>

<script>


export default {
  name: "add-user",
  data() {
    return {
      valid: false,
      isForm: false,
      id: '',
      firstName: '',
      lastName: '',
      email: '',
      phone: '',
      idRules: [
        v => !!v || 'Поле не заполнено',
        v => /^\d+$/.test(v) || "Введите только цифры"
      ]
      , nameRules: [
        v => !!v || 'Поле не заполнено',
        v => !/[^a-zA-Zа-яёА-ЯЁ ]/u.test(v) || "Введите только буквы"
      ],

      emailRules: [
        v => !!v || 'Укажите E-mail',
        v => /.+@.+/.test(v) || 'Укажите правильный E-mail',
      ],
      phoneRules: [
        v => !!v || 'Укажите номер телефона',
        v => v.length === 12 || 'Телефон должен содержать 12 символов',
        v => /^\d+$/.test(v) || "Введите только цифры",
      ],

    }
  },
  methods: {
    submit() {
      let form = {
        id: this.id,
        firstName: this.firstName,
        lastName: this.lastName,
        email: this.email,
        phone: this.phone
      };

      this.$emit('addUser', form);

      this.id = '';
      this.firstName = '';
      this.lastName = '';
      this.email = '';
      this.phone = '';
      this.isForm = false;
    },
  }
}
</script>

<style lang="scss">

</style>
