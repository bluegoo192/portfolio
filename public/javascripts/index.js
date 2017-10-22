// sometimes, axios will finish loading the tech list before Vue mounts
// so we cache that data here, and load it into vue on mount
let techs = null;

var app = new Vue({
  el: '#app',
  data: {
    query: ''
  },
  methods: {
    loadTechs: function () {
      axios.get('/api/techs')
        .then(function (response) { techs = response.data; })
        .catch(function (error) { console.log(error); });
    }
  },
  computed: {
    suggestions: function () {
      if (techs === null) {
        return []; // if techs haven't loaded yet
      }
      let query = this.query.toLowerCase();
      let matches = Object.keys(techs).filter(function (techKey) {
        if (techs[techKey].pretty_name.toLowerCase().startsWith(query)) return true;
        for (alias of techs[techKey].aliases) {
          if (alias.toLowerCase().startsWith(query)) return true;
        }
        return false;
      });
      console.log(matches);
      return matches;
    }
  }
})
