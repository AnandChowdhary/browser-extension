import { writeFile, copyFile, copy, mkdirp } from "fs-extra";
import { join } from "path";

const popupHtml = `<!DOCTYPE html>
<html>
  <head>
    <title>Browser Extension</title>
    <link rel="stylesheet" href="app.scss" />
  </head>
  <body>
    <p>Hello</p>
    <script src="app.ts"></script>
  </body>
</html>`;

const settingsHtml = `<!DOCTYPE html>
<html>
  <head>
    <title>Settings</title>
    <link rel="stylesheet" href="settings.scss" />
  </head>
  <body>
    <p>Hello</p>
    <script src="settings.ts"></script>
  </body>
</html>`;

const backgroundHtml = `<script src="background.ts"></script>`;

(async () => {
  await mkdirp(join(__dirname, "..", "dist"));
  await copyFile(
    join(__dirname, "..", "static", "app.scss"),
    join(__dirname, "..", "dist", "app.scss")
  );
  await copyFile(
    join(__dirname, "..", "static", "settings.scss"),
    join(__dirname, "..", "dist", "settings.scss")
  );
  await copy(join(__dirname, "..", "scripts"), join(__dirname, "..", "dist"), {
    recursive: true
  });
  await writeFile(
    join(__dirname, "..", "dist", "background.html"),
    backgroundHtml
  );
  await writeFile(join(__dirname, "..", "dist", "settings.html"), settingsHtml);
  await writeFile(join(__dirname, "..", "dist", "popup.html"), popupHtml);
})();
