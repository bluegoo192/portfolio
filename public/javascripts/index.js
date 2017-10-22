// sometimes, axios will finish loading the tech list before Vue mounts
// so we cache that data here, and load it into vue on mount
let techs = null;

var app = new Vue({
  el: '#app',
  data: {
    query: '',
    filters: []
  },
  methods: {
    loadTechs: function () {
      axios.get('/api/techs')
        .then(function (response) { techs = response.data; })
        .catch(function (error) { console.log(error); });
    },
    addFilter: function () {
      if (this.suggestions.length > 0) {
        this.filters.push(this.suggestions.shift());
        this.query = ''
      }
    },
    deleteFilter: function () {
      if (this.filters.length > 0 && this.query.length === 0) this.filters.pop();
    },
    remove: function (index) {
      this.filters.splice(index, 1);
    }
  },
  computed: {
    suggestions: function () {
      if (techs === null) { return []; }
      let query = this.query.toLowerCase();
      let self = this;
      return Object.keys(techs).filter(function (techKey) {
        if (self.filters.includes(techs[techKey])) return false;
        if (techs[techKey].pretty_name.toLowerCase().startsWith(query)) return true;
        if (techKey.startsWith(query)) return true;
        for (alias of techs[techKey].aliases) {
          if (alias.toLowerCase().startsWith(query)) return true;
        }
        return false;
      }).map(function(key) { return techs[key]; });
    },
    searchPlaceholder: function () {
      return (this.filters.length > 0) ? '' : "Search skills and languages";
    }
  }
})
