<template>
  <section class="main">
    <v-container>
      <v-row>
        <v-col cols="12">
          <h2 class="mb-4">Загрузка данных:</h2>
        </v-col>
        <v-col cols="12"  md="6">
          <v-btn
              :loading="loading"
              :disabled="loading || loading2"
              @click="loadData(1)"
          >Загрузить большой объем
          </v-btn>
        </v-col>
        <v-col cols="12" md="6">
          <v-btn
              elevation="2"
              :loading="loading2"
              :disabled="loading || loading2"
              @click="loadData(2)"
          >Загрузить маленький объем
          </v-btn>
        </v-col>
      </v-row>
      <AddUser v-if="list" @addUser="addUser"/>
      <DataBlock v-if="list" :data="list"/>
    </v-container>
  </section>
</template>

<script>
import axios from "axios";
import DataBlock from "@/components/data-block"
import AddUser from "@/components/add-user"

export default {
  name: 'Main',
  components: {
    DataBlock,
    AddUser
  },
  data() {
    return {
      loading: false,
      loading2: false,
      list: null,
    }
  },
  methods: {
    loadData(i) {
      this.list = null;
      if (i === 1) {
        this.loading = true;
        axios.get('https://www.filltext.com/?rows=1000&id=%7Bnumber%7C1000%7D&firstName=%7BfirstName%7D&delay=3&lastName=%7BlastName%7D&email=%7Bemail%7D&phone=%7Bphone%7C(xxx)xxx-xx-xx%7D&address=%7BaddressObject%7D&description=%7Blorem%7C32%7D')
            .then(response => this.list = response.data)
            .finally(() => this.loading = false)
      } else {
        this.loading2 = true;
        axios.get('https://www.filltext.com/?rows=32&id=%7Bnumber%7C1000%7D&firstName=%7BfirstName%7D&lastName=%7BlastName%7D&email=%7Bemail%7D&phone=%7Bphone%7C(xxx)xxx-xx-xx%7D&address=%7BaddressObject%7D&description=%7Blorem%7C32%7D')
            .then(response => this.list = response.data)
            .finally(() => this.loading2 = false)
      }
    },
    addUser(user) {
      this.list.unshift(user);
    }
  }
}
</script>

<style lang="">

</style>
