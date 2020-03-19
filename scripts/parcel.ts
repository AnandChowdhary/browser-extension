import { writeFile, copyFile, copy, mkdirp } from "fs-extra";
import { join } from "path";

const html = `<!DOCTYPE html>
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

const backgroundHtml = `<script src="background.ts"></script>`;

(async () => {
  await mkdirp(join(__dirname, "..", "dist"));
  await copyFile(
    join(__dirname, "..", "static", "app.scss"),
    join(__dirname, "..", "dist", "app.scss")
  );
  await copy(join(__dirname, "..", "scripts"), join(__dirname, "..", "dist"), {
    recursive: true
  });
  await writeFile(
    join(__dirname, "..", "dist", "background.html"),
    backgroundHtml
  );
  await writeFile(join(__dirname, "..", "dist", "popup.html"), html);
})();
