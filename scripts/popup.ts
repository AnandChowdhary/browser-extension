import { writeFile } from "fs-extra";
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

(async () => {
  await writeFile(
    join(__dirname, "..", "static", "app.scss"),
    join(__dirname, "..", "dist", "app.scss")
  );
  await writeFile(
    join(__dirname, "..", "scripts", "app.ts"),
    join(__dirname, "..", "dist", "app.ts")
  );
  await writeFile(join(__dirname, "..", "dist", "popup.html"), html);
})();
