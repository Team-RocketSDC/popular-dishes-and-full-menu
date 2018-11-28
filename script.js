import http from "k6/http";
import { sleep } from "k6";

export let options = {
  vus: 1000,
  duration: "30s"
};

export default function() {
  http.get("http://localhost:2000/restaurants/:66");
  sleep(1);
};