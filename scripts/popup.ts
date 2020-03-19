import { writeFile } from "fs-extra";
import { join } from "path";

const html = `<!DOCTYPE html>
<html>
  <head>
    <title>Browser Extension</title>
  </head>
  <body>
    <p>Hello</p>
    <script src="popup.ts"></script>
  </body>
</html>`;

(async () => {
  await writeFile(join(__dirname, "..", "dist", "popup.html"), html);
})();
