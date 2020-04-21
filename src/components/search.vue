<template>
  <a-layout class="search">
    <a-row>
      <a-col :span="24">
        <h3 class="title">Search</h3>
      </a-col>

      <a-col :span="24">
        <a-form :form="form" @submit.prevent="handleSubmit">
          <a-row>
            <a-checkbox-group class="form-item" @change="onTagsChange">
              <a-col :span="4" v-for="tag in allTags" :key="tag.id">
                <a-checkbox :value="tag.id">{{tag.title}}</a-checkbox>
              </a-col>
            </a-checkbox-group>

            <a-checkbox-group class="form-item" @change="onSitesChange">
              <a-col :span="2" v-for="siteIdx in 22" :key="siteIdx">
                <a-checkbox :value="siteIdx">
                  <img src="../assets/images/samsung.png" width="30" />
                </a-checkbox>
              </a-col>
            </a-checkbox-group>

            <a-form-item class="form-item">
              <a-col :span="24">
                <a-row>
                  <a-col :span="12">
                    $ min:
                    <a-input-number
                      class="min-price"
                      :formatter="value => `$ ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')"
                      :parser="value => value.replace(/\$\s?|(,*)/g, '')"
                      v-model="search_queries['min_price']"
                    />
                  </a-col>
                  <a-col :span="12">
                    $ max:
                    <a-input-number
                      class="max-price"
                      :formatter="value => `$ ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')"
                      :parser="value => value.replace(/\$\s?|(,*)/g, '')"
                      v-model="search_queries['max_price']"
                    />
                  </a-col>
                </a-row>
              </a-col>
            </a-form-item>

            <a-form-item class="form-item">
              <a-col :span="24">
                <a-input placeholder="Search Keyword" v-model="search_queries['keyword']" />
              </a-col>
            </a-form-item>

            <a-form-item class="form-item">
              <a-col :span="24">
                <a-button type="primary" html-type="submit" icon="search">Search</a-button>
              </a-col>
            </a-form-item>
          </a-row>
        </a-form>
      </a-col>
    </a-row>
  </a-layout>
</template>

<script>
import { mapState } from "vuex";
import axios from "axios";

export default {
  beforeCreate() {
    this.form = this.$form.createForm(this, { name: "search" });
  },
  data() {
    return {
      search_queries: {
        tags: {},
        sites: {},
        keyword: ""
      }
    };
  },
  computed: {
    ...mapState({
      allTags: state => state.sites.allTags
    })
  },
  methods: {
    onTagsChange(tags) {
      this.search_queries["tags"] = tags;
    },
    onSitesChange(sites) {
      this.search_queries["sites"] = sites;
    },
    handleSubmit(e) {
      e.preventDefault();

      axios
        .post(
          process.env.VUE_APP_API_ENDPOINT + "/search-items",
          this.search_queries
        )
        .then(function(res) {
          console.log(res);
        })
        .catch(function(err) {
          console.log(err);
        });
    }
  }
};
</script>

<style scoped>
.search {
  height: 100%;
  border: 1px solid #007bff;
  border-radius: 4px;
}
.title {
  color: #fff;
  border-bottom: 1px solid #007bff;
  background-color: #007bff;
  padding: 10px 15px;
  margin: 0px;
}
.form-item {
  width: 100%;
  padding-left: 15px;
  padding-right: 15px;
  margin-top: 8px;
  margin-bottom: 16px;
}
.min-price,
.max-price {
  min-width: 150px;
}
</style>