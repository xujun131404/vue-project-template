import axios from "axios";
import ls from "store2";
import { Message } from "view-design";
Message.config({
  top: 300,
  duration: 3
});
let http = axios.create({
  headers: {
    "Content-Type": "application/json"
  }
});

// 头部获取及设置
const getHeader = () => {
  let headers = {};
  headers["Content-Type"] = "application/json";
  headers["Authorization"] = ls.get("token") || "";
  return headers;
};

http.defaults.timeout = 120000;
const location = window.location;
http.defaults.baseURL = `${location.origin}/`;

// 返回状态判断
http.interceptors.response.use(
  res => {
    if (res.status === 200) {
      res.data.success = res.data.code === 0;
      res.data.code = res.data.msg;
      res.data.msg = undefined;

      if (!res.data.success && !theErrCode) {
        Message.error(res.data.tips, {
          background: true
        });
      }
      return res.data;
    } else {
      return Promise.reject(res);
    }
  },
  error => {
    if (error && error.response && error.response.status === 401) {
      window.$nuxt.$store.commit("clearToken");
      window.$nuxt.$router.push("/login");
      Message.error("登录失效, 请重新登录", {
        background: true
      });
    }
    return Promise.reject(error);
  }
);

let methods = {
  put(url, params) {
    return http({
      method: "PUT",
      url,
      data: params,
      headers: getHeader()
    });
  },
  delete(url, params) {
    return http({
      method: "DELETE",
      url,
      data: params,
      headers: getHeader()
    });
  },
  post(url, params) {
    return http({
      method: "POST",
      url,
      data: params,
      headers: getHeader()
    });
  },
  postForm(url, params) {
    let headers = getHeader();
    headers["Content-Type"] = "application/x-www-form-urlencoded charset=UTF-8";
    return http({
      method: "POST",
      url,
      // data: qs.stringify(params),
      headers
    });
  },
  get(url, params) {
    let baseUrl = "";
    if (process.server) {
      baseUrl = `${process.env.baseUrl}/`;
    }

    url = `${url}?t=${new Date().getTime()}`;
    return http({
      method: "GET",
      url,
      params,
      headers: getHeader()
    });
  }
};
export default methods;
