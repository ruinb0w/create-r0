#!/usr/bin/env node

import chalk from "chalk";
import { dependecies_list } from "./libs/data.mjs";
import { questionConfig, configProject } from "./libs/config.mjs";
import { checkDependencies, downloadTemplate } from "./libs/lib.mjs";

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

main();
