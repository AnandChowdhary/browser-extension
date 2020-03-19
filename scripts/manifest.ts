import { writeJson, readJson, readFile, readdir } from "fs-extra";
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
  options_page: "settings.html",
  background: {
    scripts: [""],
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
  const pkg = await readJson(join(__dirname, "..", "package.json"));
  manifest.name = pkg.name;
  manifest.description = pkg.description;
  manifest.version = pkg.version;
  const builtFiles = await readdir(join(__dirname, "..", "dist"));
  const backgroundJs = builtFiles.find(
    file => file.startsWith("background.") && file.endsWith(".js")
  );
  if (!backgroundJs) throw new Error("Could not find background JS");
  manifest.background.scripts[0] = backgroundJs;
  await writeJson(join(__dirname, "..", "dist", "manifest.json"), manifest);
  const icon = await readFile(join(__dirname, "..", "static", "icon.png"));
  for await (const size of sizes) {
    await sharp(icon)
      .resize(size, size)
      .toFile(join(__dirname, "..", "dist", `icon${size}.png`));
  }
})();
