import instance from "./http-common";

const get = (url, params) => {
  return instance({
    method: "get",
    url: url,
    params: params,
  });
};

const post = (url, params) => {
  return instance({
    method: "post",
    url: url,
    data: params,
   });
};

const put = (url, params) => {
  return instance({
    method: "put",
    url: url,
    data: params,
   });
};

export { get, post, put };
