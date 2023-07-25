import { useJSONManager } from "../lib.mjs";
import inquirer from "inquirer";

export const uniapp = {
  options: {},
  async query() {
    this.options = await inquirer.prompt([
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
  },
  async configure(config) {
    const json_manager = useJSONManager();
    await json_manager.read(config.project_name + "/src/manifest.json");

    json_manager.update("mp-weixin.appid", this.options.APP_ID);
    json_manager.update("name", config.project_name);
    // state.data["mp-weixin"].appid = this.options.APP_ID;
    // state.data.name = config.project_name;
    json_manager.write();
  },
};
