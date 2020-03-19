import { mkdirp, writeJson, readJson } from "fs-extra";
import { join } from "path";

const manifest = {
  manifest_version: 2,
  name: "",
  description: "",
  version: "0.0.0",
  browser_action: {
    default_icon: "icon16.png",
    default_popup: "index.html"
  },
  background: {
    scripts: ["dist/background.js"],
    persistent: false
  },
  icons: {
    "16": "icon16.png",
    "48": "icon48.png",
    "128": "icon128.png"
  },
  permissions: []
};

(async () => {
  await mkdirp(join(__dirname, "..", "dist"));
  const pkg = await readJson(join(__dirname, "..", "package.json"));
  manifest.name = pkg.name;
  manifest.description = pkg.description;
  manifest.version = pkg.version;
  await writeJson(join(__dirname, "..", "dist", "manifest.json"), manifest);
})();
