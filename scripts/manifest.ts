import { mkdirp, writeJson, readJson, readFile } from "fs-extra";
import { join } from "path";
import sharp from "sharp";

const manifest = {
  manifest_version: 2,
  name: "",
  description: "",
  version: "0.0.0",
  browser_action: {
    default_icon: "icon16.png",
    default_popup: "popup.html"
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

const sizes = [128, 48, 38, 19, 16];

(async () => {
  await mkdirp(join(__dirname, "..", "dist"));
  const pkg = await readJson(join(__dirname, "..", "package.json"));
  manifest.name = pkg.name;
  manifest.description = pkg.description;
  manifest.version = pkg.version;
  await writeJson(join(__dirname, "..", "dist", "manifest.json"), manifest);
  const icon = await readFile(join(__dirname, "..", "static", "icon.png"));
  for await (const size of sizes) {
    await sharp(icon)
      .resize(size, size)
      .toFile(join(__dirname, "..", "dist", `icon${size}.png`));
  }
})();
