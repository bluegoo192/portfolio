var app = new Vue({
  el: '#app',
  data: {
    query: ''
  },
  computed: {
    suggestions: function () {
      return [
        this.query,
        "test"
      ]
    }
  }
})
