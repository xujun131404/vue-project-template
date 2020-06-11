//routes.js
//递归获取 views 文件夹下的所有.vue文件
const files = require.context("@/views", true, /\.vue$/);

let pages = {};
files.keys().forEach(key => {
  let pageKey = key.replace(/(\.\/|\.vue)/g, "");
  // console.log(key)
  pages[pageKey] = files(key).default;
});

//生成路由规则
let generator = [];
Object.keys(pages).forEach(item => {
  console.log(item);
  let path = "/";
  if (item.match(/\/\index$/)) {
    path = `/${item.replace(/\/\index/, "")}`;
  } else if (item.match(/\/\_/)) {
    path = `/${item.replace(/\/\_/, "/:")}`;
  } else {
    path = `/${item}`;
  }
  generator.push({
    path,
    name: pages[item].name,
    component: pages[item]
  });
});
console.log(generator);
//合并公共路由以及重定向规则
const routes = [
  {
    path: "/",
    redirect: "/index"
  },

  ...generator,
  {
    path: "*",
    redirect: "/404"
  }
];

export default routes;
