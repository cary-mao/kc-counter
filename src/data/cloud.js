/**
 * exchange data with remote server
 */
import axios from "axios";

const http = axios.create({
  timeout: 1000,
});

const queue = [];

export function request(config) {}
