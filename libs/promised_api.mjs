import { execFile } from "child_process";
import fs from "fs";

export function promisedExecFile(command, option_list) {
  return new Promise((resolve) => {
    execFile(command, option_list, (err, stdout, stderr) => {
      if (err) {
        console.log(stderr);
        resolve(false);
      } else {
        console.log(stdout);
        resolve(true);
      }
    });
  });
}

export function readFile(path) {
  return new Promise((resolve) => {
    fs.readFile(path, (err, data) => {
      if (err) {
        console.log(err);
        resolve(false);
      } else {
        resolve(data.toString());
      }
    });
  });
}

export function writeFile(path, data) {
  return new Promise((resolve) => {
    fs.writeFile(path, data, (err) => {
      if (err) {
        console.log(err);
        resolve(false);
      } else {
        resolve(true);
      }
    });
  });
}

export function rm(path) {
  return new Promise((resolve) => {
    fs.rm(path, { recursive: true }, (err) => {
      if (err) {
        console.log(err);
        resolve(false);
      } else {
        resolve(true);
      }
    });
  });
}
