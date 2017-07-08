import Vue from 'vue'
import marked from 'marked'

Vue.filter('markedContent', function (value) {
  console.log(value)
  return marked(value)
})
