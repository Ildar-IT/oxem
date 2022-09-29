<template>
  <div class="data-block">
    <v-row class="d-flex align-center mt-10">
      <v-col cols="12" sm="7">
        <v-text-field
            v-model="findText"
            label="Найти"
        ></v-text-field>
      </v-col>
      <v-col cols="12" sm="5">
        <v-btn :disabled="!findText" @click="find()">
          Поиск
        </v-btn>
      </v-col>
    </v-row>

    <div class="data-block__table">
      <table class="mt-6">
        <tr>
          <td class="i">
            <div class="d-flex justify-space-between align-center">
              id
              <Arrow :class="[arrowDir === 'idasc' ? 'top': 'bottom']"
                     @click.native="sortDef('id')"/>
            </div>
          </td>
          <td>
            <div class="d-flex justify-space-between align-center">
              Имя
              <Arrow :class="[arrowDir === 'firstNameasc' ? 'top': 'bottom']"
                     @click.native="sortDef('firstName')"/>
            </div>
          </td>
          <td>
            <div class="d-flex justify-space-between align-center">
              Фамилия
              <Arrow :class="[arrowDir === 'lastNameasc' ? 'top': 'bottom']"
                     @click.native="sortDef('lastName')"/>
            </div>
          </td>
          <td>
            <div class="d-flex justify-space-between align-center">
              Email
              <Arrow :class="[arrowDir === 'emailasc' ? 'top': 'bottom']"
                     @click.native="sortDef('email')"/>
            </div>
          </td>
          <td>
            <div class="d-flex justify-space-between align-center">
              Телефон
              <Arrow :class="[arrowDir === 'phoneasc' ? 'top': 'bottom']"
                     @click.native="sortDef('phone')"/>
            </div>
          </td>
        </tr>
        <tr v-for="(item, index) in pageList" :key="index"
            :class="{'active': item.phone === selectUser?.phone}"
            @click="select(item.phone)">

          <td class="i">{{ item.id }}</td>
          <td>{{ item.firstName }}</td>
          <td>{{ item.lastName }}</td>
          <td>{{ item.email }}</td>
          <td>{{ item.phone }}</td>

        </tr>
      </table>
    </div>
    <v-row>
      <v-col cols="12">
        <div v-if="pagesNum > 1" class="data-block__pagination mt-3 d-flex align-center justify-end ">
          {{ page }} / {{ pagesNum }}
          <v-btn class="small  ml-6 mr-5" :disabled="page === 1"
                 @click="page--">
            <Arrow class="left"/>
          </v-btn>
          <v-btn class="small" :disabled="page === pagesNum"
                 @click="page++">
            <Arrow class="right"/>
          </v-btn>
        </div>
      </v-col>
      <v-col cols="12" v-if="selectUser">
        <p>
          Выбран пользователь: <b>{{selectUser.firstName}} {{selectUser.lastName}}</b>
        </p>
        Описание:
        <p>{{selectUser.description}}</p>
        <p>Адрес проживания: <b>{{selectUser.address?.streetAddress}}</b></p>
        <p> Город: <b>{{selectUser.address?.city}}</b></p>
        <p>Провинция/штат: <b>{{selectUser.address?.state}}</b></p>
        <p>Индекс: <b>{{selectUser.address?.zip}}</b></p>
      </v-col>
    </v-row>
  </div>
</template>

<script>
import Arrow from "@/components/arrow"

export default {
  name: "data-block",
  components: {
    Arrow
  },
  props: ['data'],
  data() {
    return {
      page: 1,
      pageSize: 50,
      pagesNum: null,
      sortName: null,
      sortDir: 'asc',
      arrowDir: null,
      findText: null,
      foundList: null,
      selectUser: null,
    }
  },
  watch: {
    data: function () {
      this.sortName = null;
      this.sortDir = 'asc';
      this.arrowDir = null;
      this.findText = null;
    }
  },
  computed: {
    pageList: function () {
      let start = (this.page - 1) * this.pageSize;
      let end = this.page * this.pageSize;

      if (!this.findText) {
        this.foundList = [...this.data];
      }

      if (this.sortName) {
        return this.foundList.sort((a, b) => {
          let modifier = 1;
          if (this.sortDir === 'desc') modifier = -1;
          if (a[this.sortName] < b[this.sortName]) return -1 * modifier;
          if (a[this.sortName] > b[this.sortName]) return 1 * modifier;
          return 0;
        }).slice(start, end)
      }

      this.pagesNum = Math.ceil(this.foundList.length / this.pageSize) || 1
      return this.foundList.slice(start, end)
    },


  },
  methods: {
    sortDef(s) {
      if (s === this.sortName) {
        this.sortDir = this.sortDir === 'asc' ? 'desc' : 'asc';
      } else {
        this.sortDir = 'asc'
      }
      this.sortName = s;

      switch (this.sortName) {
        case 'id':
          this.arrowDir = `id${this.sortDir}`;
          break;
        case 'firstName':
          this.arrowDir = `firstName${this.sortDir}`;
          break;
        case 'lastName':
          this.arrowDir = `lastName${this.sortDir}`;
          break;
        case 'email':
          this.arrowDir = `email${this.sortDir}`;
          break;
        case 'phone':
          this.arrowDir = `phone${this.sortDir}`;
          break;
      }
    },

    find() {
      this.foundList = this.data.map(el => ({
        id: el.id,
        firstName: el.firstName,
        lastName: el.lastName,
        email: el.email,
        phone: el.phone,
      })).filter(el => {
        return Object.values(el).some(val =>
            String(val).toLowerCase().includes(this.findText.toLowerCase()))
      });
    },
    select(phone) {
      let index = this.data.findIndex(x => x.phone === phone)
      this.selectUser = this.data[index]

    }
  }
}
</script>

<style lang="scss">
.data-block {

  &__table {
    overflow-y: hidden;
    overflow-x: auto;
    table {
      width: 100%;
      min-width: 700px;
      border-collapse: collapse;
      table-layout: fixed;

      :first-child {
        td {
          background: #e9ecef;
        }
      }

      tr {
        &:not(:first-child) {
          cursor: pointer;
          &:hover {
            td {
              background: #f2f7f7;
            }
          }
        }
        td {
          @include transition();

          border: 1px solid #000;
          padding: 6px;
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
          &:first-child {
            width: 7%;
          }
          &:nth-child(4) {
            width: 30%;
          }
        }
      }

      .active {
        td {
          background: #cfd1d1;
        }
      }


    }
  }

  &__pagination {
    height: 20px;
  }

}

</style>
