import axios from "axios";

export async function axios_post(url, data) {
  const options = {
    headers: { "content-type": "application/json" }
  };
  const res = await axios.post(url, data, options);
  return res;
}
