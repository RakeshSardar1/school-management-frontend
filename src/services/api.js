import axios from "axios";

const Api = () => {
  const instance = axios.create({
    baseURL: "http://localhost:3000/api/",
  });

  return instance;
};

export { Api };
