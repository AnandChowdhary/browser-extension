const manifest = `{
  "manifest_version": 2,
  "name": "NAME",
  "description": "DESCRIPTION",
  "version": "1.0.0",
  "browser_action": {
    "default_icon": "icon16.png",
    "default_popup": "index.html"
  },
  "background": {
    "scripts": ["dist/background.js"],
    "persistent": false
  },
  "icons": {
    "16": "icon16.png",
    "48": "icon48.png",
    "128": "icon128.png"
  },
  "permissions": []
}`;

//
