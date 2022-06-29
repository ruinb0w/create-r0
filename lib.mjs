import chalk from "chalk";
import { promisedExecFile } from "./promised_api.mjs";
import { readFile, writeFile } from "./promised_api.mjs";

export async function check_dependencies(command, option_list) {
  const result = await promisedExecFile(command, option_list);
  if (!result) {
    console.log(chalk.red("Error"), `${command} is not installed.`);
    return false;
  } else {
    console.log(chalk.green("OK"), `${command} installed.`);
    return true;
  }
}

export function useJSONManager() {
  const state = {
    data: "",
    path: "",
  };

  async function read(path) {
    let result = await readFile(path);
    if (!result) {
      console.log(chalk.red("Error"), "read config file error");
      return false;
    }
    result = result.replace(/\/\*[^\*]+\*\//g, "");
    state.path = path;
    state.data = JSON.parse(result);
  }

  async function update() {
    const result = await writeFile(state.path, JSON.stringify(state.data));
    if (!result) {
      console.log(chalk.red("Error"), "update config error");
      return false;
    }
  }

  return {
    state,
    read,
    update,
  };
}
