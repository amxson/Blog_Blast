# Blog Blast

A React and Vite blog prototype with posts, category filters, comments, and browser-local persistence. It is a frontend learning project: there is no server-side authentication or shared database.

## Run

Use Node.js 22.12 or newer:

```sh
npm ci
npm run dev
npm run build
npm run preview
```

Vite prints the local URL, normally `http://localhost:5173`. The production build is written to `dist`.

Posts live in the current browser's local storage. Clearing site data removes them; they are not shared between users or devices. Account-like screens in the interface are demonstration flows, not an access-control boundary. Do not use this prototype for private content.

`src/components/Blog` contains post forms and views; the context module manages local data. The project uses React Router and Font Awesome. IDs use the browser's `crypto.randomUUID()`; no model runtime is bundled.
