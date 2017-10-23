Vue.component('search', {
  template: "<div>\
    <div id='searchbox' class='flex'>\
      <div class='filter' v-for='(item, index) of filters'\
        <span>{{ item.pretty_name }}</span>\
        <span class='close' @click='remove(index)'>x</span>\
      </div>\
      <input id='search'\
        autocomplete='off'\
        v-model.trim='query'\
        @keyup.enter='(query === emptyString) ? search() : addFilter()'\
        @keydown.down='changeCurrentSuggestion(1)'\
        @keydown.up='changeCurrentSuggestion(-1)'\
        v-on:keydown.delete='deleteFilter'\
        v-bind:placeholder='searchPlaceholder' />\
    </div>\
    </div>",
  data: function () {
    return {
      query: '',
      filters: [],
      currentSuggestion: null,
      emptyString: "",
      undefinedString: "undefined"
    }
  }
});
