// sometimes, axios will finish loading the tech list before Vue mounts
// so we cache that data here, and load it into vue on mount
let techs = null;

var app = new Vue({
  el: '#app',
  data: {
    query: '',
    filters: [],
    currentSuggestion: null
  },
  methods: {
    loadTechs: function () {
      axios.get('/api/techs')
        .then(function (response) { techs = response.data; })
        .catch(function (error) { console.log(error); });
    },
    addFilter: function (suggestion) {
      if (suggestion) this.currentSuggestion = suggestion;
      if (this.currentSuggestion !== null) {
        this.filters.push(this.currentSuggestion);
        this.currentSuggestion = null;
        this.query = '';
      }
    },
    deleteFilter: function () {
      if (this.filters.length > 0 && this.query.length === 0) this.filters.pop();
    },
    remove: function (index) {
      this.filters.splice(index, 1);
    },
    changeCurrentSuggestion: function (change) {
      if (change < 0) change = this.suggestions.length + change;
      this.currentSuggestion = this.suggestions[
        (this.suggestions.indexOf(this.currentSuggestion) + change)
        % this.suggestions.length];
      let self = this;
      axios.get('/api/projects/search', {
        params: { uses: this.currentSuggestion.key }
      }).then(function (response) {
        self.currentSuggestion.projects = response.data;
      }).catch(function (error) { console.log(error); });
    },
    search: function () {
      console.log("search");
    }
  },
  computed: {
    suggestions: function () {
      if (techs === null) { return []; }
      let query = this.query.toLowerCase();
      let self = this;
      let matches = Object.keys(techs).filter(function (techKey) {
        if (self.filters.includes(techs[techKey])) return false;
        if (techs[techKey].pretty_name.toLowerCase().startsWith(query)) return true;
        if (techKey.startsWith(query)) return true;
        for (alias of techs[techKey].aliases) {
          if (alias.toLowerCase().startsWith(query)) return true;
        }
        return false;
      }).map(function(key) {
        techs[key].key = key;
        return techs[key];
      });
      this.currentSuggestion = matches[0];
      return matches;
    },
    searchPlaceholder: function () {
      return (this.filters.length > 0) ? '' : "Search skills and languages";
    }
  }
})
