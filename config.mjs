import inquirer from "inquirer";
import { useJSONManager } from "./lib.mjs";

export async function questionConfig() {
  const basic_config = await basicConfig();
  let template_config;
  switch (basic_config.template) {
    case "uni-app":
      template_config = await uniAppConfig();
      break;
    case "vue3":
      template_config = await vue3Config();
      break;
  }
  const extend_config = await extendConfig();
  return { ...basic_config, ...template_config, ...extend_config };
}

async function basicConfig() {
  return await inquirer.prompt([
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
      choices: ["uni-app", "vue3"],
      default: 0,
    },
  ]);
}

async function uniAppConfig() {
  return await inquirer.prompt({
    name: "APP_ID",
    type: "input",
    validate(data) {
      return data.length > 0 || "please input appid";
    },
  });
}

async function vue3Config() {}

async function extendConfig() {
  return await inquirer.prompt({
    name: "scss",
    type: "confirm",
  });
}

export async function configProject(config) {
  switch (config.template) {
    case "uni-app":
      await configUniApp(config);
  }
}

async function configUniApp(config) {
  const json_manager = useJSONManager();
  const { state } = json_manager;
  await json_manager.read(config.project_name + "/src/manifest.json");
  state.data["mp-weixin"].appid = config.APP_ID;
  state.data.name = config.project_name;
  json_manager.update();
}
