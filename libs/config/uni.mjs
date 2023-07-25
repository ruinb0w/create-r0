import { useJSONManager } from "../lib.mjs";
import inquirer from "inquirer";

export async function uniConfig(basicConfig) {
  const uniConfig = await inquirer.prompt([
    {
      name: "APP_ID",
      type: "input",
      validate(data) {
        return data.length > 0 || "please input appid";
      },
    },
    {
      name: "language",
      type: "list",
      choices: ["js", "ts"],
      default: 0,
    },
  ]);
  basicConfig.template = uniConfig.language == "js" ? "uni-app" : "uni-app-ts";
  return { ...uniConfig, ...basicConfig };
}

export async function configUni(config) {
  const json_manager = useJSONManager();
  await json_manager.read(config.project_name + "/src/manifest.json");

  json_manager.update("mp-weixin.appid", config.APP_ID);
  json_manager.update("name", config.project_name);
  json_manager.write();
}
