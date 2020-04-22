<template>
  <a-layout class="search">
    <a-row>
      <a-col :span="24">
        <h3 class="title">Search</h3>
      </a-col>

      <a-col :span="24">
        <a-form :form="form" @submit.prevent="handleSubmit">
          <a-row>
            <a-checkbox-group class="form-item" @change="onCategoriesChange">
              <a-col :span="4" v-for="tag in allCategories" :key="tag.id">
                <a-checkbox :value="tag.id">{{tag.title}}</a-checkbox>
              </a-col>
            </a-checkbox-group>

            <a-checkbox-group class="form-item" @change="onSitesChange">
              <a-col :span="2" v-for="site in allSites" :key="site.id">
                <a-checkbox :value="site.id">
                  <img :src="require('../assets/images/'+site.site+'.png')" width="16" />
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
                      v-model="queries['minPrice']"
                    />
                  </a-col>
                  <a-col :span="12">
                    $ max:
                    <a-input-number
                      class="max-price"
                      :formatter="value => `$ ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')"
                      :parser="value => value.replace(/\$\s?|(,*)/g, '')"
                      v-model="queries['maxPrice']"
                    />
                  </a-col>
                </a-row>
              </a-col>
            </a-form-item>

            <a-form-item class="form-item">
              <a-col :span="24">
                <a-input placeholder="Search Keyword" v-model="queries['keyword']" />
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
import { mapState, mapActions } from "vuex";

export default {
  beforeMount() {
    this.form = this.$form.createForm(this, { name: "search" });
    this.getAllSites();
  },
  data() {
    return {
      queries: {
        categories: {},
        sites: {},
        keyword: ""
      }
    };
  },
  computed: {
    ...mapState({
      allCategories: state => state.sites.allCategories,
      allSites: state => state.sites.allSites
    })
  },
  methods: {
    ...mapActions("sites", ["getAllSites"]),
    ...mapActions("searchResults", ["searchItems"]),
    onCategoriesChange(categories) {
      this.queries["categories"] = categories;
    },
    onSitesChange(sites) {
      this.queries["sites"] = sites;
    },
    handleSubmit() {
      this.searchItems(this.queries);
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