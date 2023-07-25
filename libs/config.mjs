import inquirer from "inquirer";
import { rm } from "./promised_api.mjs";
import * as path from "path";
import { uniConfig, configUni } from "./config/uni.mjs";

export async function questionConfig() {
  const basic_config = await basicConfig();
  let equipmentConfig;
  switch (basic_config.template) {
    case "uni-app":
      equipmentConfig = await uniConfig(basic_config);
      break;
    case "vue3":
      await vue3Config();
      break;
    case "electron":
      await electronConfig();
      break;
    case "back-end":
      await backendConfig();
  }
  return equipmentConfig || basic_config;
}

function basicConfig() {
  return inquirer.prompt([
    {
      name: "project_name",
      type: "input",
      validate(data) {
        return data.length > 0 || "please input project name";
      },
    },
    {
      name: "template",
      type: "list",
      choices: ["uni-app", "vue3", "electron", "back-end"],
      default: 0,
    },
  ]);
}

async function vue3Config() {}
async function electronConfig() {}
async function backendConfig() {}

export async function configProject(config) {
  switch (config.template) {
    case "uni-app":
      await configUni(config);
  }
  await rm(path.join(path.resolve(), config.project_name, ".git"));
}
