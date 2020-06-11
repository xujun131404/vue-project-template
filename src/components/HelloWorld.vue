<template>
  <div class="hello">
    <h1>{{ msg }}</h1>
    <Input placeholder="Enter something..." style="width: 300px" v-model="value" />
  </div>
</template>

<script>
export default {
  name: 'HelloWorld',
  data() {
    return {
      msg: 'Welcome to Your Vue.js App',
      value: 'name'
    }
  },
  created() {
    let dealerRes = this.$api.get('ieforex/home/dealer')
    console.log(dealerRes)
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h1,
h2 {
  font-weight: normal;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>
