import axios from "axios";

export const login = (cb) => {
  axios.post("/login", { pass: true }).then(data => {
    cb(data);
  })
}
