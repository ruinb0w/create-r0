import chalk from "chalk";
import { promisedExecFile, readFile, writeFile } from "./promised_api.mjs";
import { templates } from "./data.mjs";

/*
 * Run a command to make sure the dependencies are installed.
 *
 * @command:String - the file path of command or excutable file.
 * @option_list:Array<String> - options for check dependecies is installed or not.
 * return:Boolean - if dependecies is installed then return true.
 * */
async function check_dependencies(command, option_list) {
  const result = await promisedExecFile(command, option_list);
  if (!result) {
    console.log(chalk.red("Error"), `${command} is not installed.`);
    return false;
  } else {
    console.log(chalk.green("OK"), `${command} installed.`);
    return true;
  }
}

/*
 * loop the dependecies_list to make sure all the dependecies is installed.
 *
 * @dependecies_list:Array<Object> - an object-list includes a command:String and a option_list:Array.
 * return:Boolean - if all of the dependecies is installed, then return true.
 * */
export async function checkDependencies(dependecies_list) {
  for (let i = 0; i < dependecies_list.length; i++) {
    const dependence = dependecies_list[i];
    const result = await check_dependencies(dependence.command, dependence.option_list);
    if (!result) return false;
  }
  return true;
}

export async function downloadTemplate(config) {
  console.log(chalk.blue("downloading template..."));
  const download_status = await promisedExecFile("git", [
    "clone",
    templates[config.template].url,
    config.project_name,
  ]);
  if (download_status) {
    console.log(chalk.green("OK"), "download finished");
  } else {
    console.log(chalk.green("Failed"), "download error");
  }
  return download_status;
}

/*
 * a hook that can read and write JSON file.
 *
 * #read - read a json file and transform to an object.
 * @path:String - the path where is the JSON file.
 * return:Object - the result of tranform.
 *
 * #update - write json string to a file.
 * return:Boolean - if write sucees then return true.
 * */
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

  function update(keys, value) {
    if (typeof keys != "string") return;
    const key_line = keys.split(".");
    let target = state.data;
    if (key_line.length > 1) {
      for (let i = 0; i < key_line.length - 1; i++) {
        if (!target[key_line[i]]) throw `there is no arg ${target[key_line[i]]} in ${target}`;
        target = target[key_line[i]];
      }
    }
    target[key_line.length - 1] = value;
  }

  async function write() {
    const result = await writeFile(state.path, JSON.stringify(state.data, null, 2));
    if (!result) {
      console.log(chalk.red("Error"), "update config error");
      return false;
    }
  }

  return {
    state,
    read,
    write,
    update,
  };
}
