#!/usr/bin/env node

import chalk from "chalk";
import { check_dependencies } from "./libs/lib.mjs";
import { dependecies_list } from "./libs/data.mjs";
import { questionConfig, configProject } from "./libs/config.mjs";
import { promisedExecFile } from "./libs/promised_api.mjs";

async function main() {
  console.log(chalk.blue("checking dependecies..."));
  const pass = await checkDependencies(dependecies_list);
  if (!pass) return;
  const config = await questionConfig();
  const download_status = await downloadTemplate(config);
  if (!download_status) return;
  await configProject(config);
  console.log(chalk.green("Init project finished"));
}

async function downloadTemplate(config) {
  console.log(chalk.blue("downloading template..."));
  let download_status = true;
  switch (config.template) {
    case "uni-app":
      download_status = await promisedExecFile("git", [
        "clone",
        "https://gitee.com/ruinb0w/uni-template.git",
        config.project_name,
      ]);
      break;
    case "vue3":
      download_status = await promisedExecFile("git", [
        "clone",
        "https://gitee.com/ruinb0w/vue-template.git",
        config.project_name,
      ]);
      break;
  }
  if (download_status) {
    console.log(chalk.green("OK"), "download finished");
  } else {
    console.log(chalk.green("Failed"), "download error");
  }
  return download_status;
}

async function checkDependencies(dependecies_list) {
  for (let i = 0; i < dependecies_list.length; i++) {
    const dependence = dependecies_list[i];
    const result = await check_dependencies(
      dependence.command,
      dependence.option_list
    );
    if (!result) return false;
  }
  return true;
}

main();
