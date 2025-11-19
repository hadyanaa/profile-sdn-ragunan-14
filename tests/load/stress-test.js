import http from 'k6/http';
import { sleep } from 'k6';

export const options = {
  stages: [
    { duration: '30s', target: 20 },  // mulai dengan 20 user
    { duration: '30s', target: 50 },  // naik jadi 50 user
    { duration: '30s', target: 100 }, // naik jadi 100 user
    { duration: '30s', target: 200 }, // uji batas di 200 user
    { duration: '30s', target: 0 },   // turun ke 0, simulasi user selesai
  ],
};

export default function () {
  http.get('http://localhost:5173/');

  sleep(1);
}