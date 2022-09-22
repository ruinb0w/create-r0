import { useJSONManager } from "./libs/lib.mjs";

const json_manager = useJSONManager();
await json_manager.read("./hello/src/manifest.json");
json_manager.update("mp-weixin.appid", "hello");
