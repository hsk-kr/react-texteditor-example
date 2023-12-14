I recently made an example to compare text editor libraries. I planned to deploy the project using Vercel as it is the easiest way. When I was about to deploy the project, I thought it would be a good experience deploying to GitHub Pages after exporting the project as static assets.

I will share the process in this post.

---

# Build into Static Assets

## Change the Output Mode and Set Environment Variables

```typescript
/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  assetPrefix: process.env.ASSET_PREFIX,
  basePath: process.env.BASE_PATH,
};

module.exports = nextConfig;
```

[To enable a static export](https://nextjs.org/docs/pages/building-your-application/deploying/static-exports#configuration), set `output` to `export`.

And then, as the URL is generated with this format `https://[ACCOUNT].github.io/[REPOSITORY NAME]`, set [`basePath`](https://nextjs.org/docs/pages/api-reference/next-config-js/basePath), which will be used to find static files, links and images.

---

## generateStaticParams

> Error: Page "/editor/[name]" is missing "generateStaticParams()" so it cannot be used with "output: export" config.

If you don't define `generateStaticParams` for dynamic routes, you may see this error. You have to define the function to generate static files.

```typescript
export function generateStaticParams() {
  const pages = ['draft', 'quill', 'slate-react', 'result'];
  return pages.map((page) => ({ name: page }));
}
```

In my case, I set 4 routes.

---

## Use Dynamic Import if necessary

> document is not defined.

If you access things that are not defined on the server side such as `document`, you will encounter some errors like this error in build time.

In that case, you may be able to solve therror using dynamic import.

```typescript
// Components
const Quill = dynamic(
  () => import('../../components/Quill').then((mod) => mod.default),
  { ssr: false, loading: () => <Loading /> }
);

// Functions
const removeHtmlTags = (html: string) => {
  if (typeof DOMParser === 'undefined') return html;
  let tmpHtml = new DOMParser().parseFromString(html, 'text/html');
  return tmpHtml.body.textContent?.trim() ?? '';
};
```

As `Quill` text editor needs to access `document`, I import it using dynamic. The `removeHtmlTags` function utilizes `DOMParse`, which doesn't exist on the server side, so, I did a type check first. If that is undefined, it does nothing. Of course, the logic must be different depending on the purpose of a function.

---

# Github Setting & Action

## Github Action

```yml
name: Github Page

on:
  push:
    branches: [main]

jobs:
  build:
    runs-on: ubuntu-latest

    steps:
      - name: Checkout
        uses: actions/checkout@v3
      - name: Install Packages
        uses: pnpm/action-setup@v2
        with:
          version: 8
          run_install: true
      - name: Set Environment Variables
        env:
          BASE_PATH: /react-texteditor-example
        run: |
          echo "" > .env.local
          echo BASE_PATH=$BASE_PATH >> .env.local
      - name: Build
        run: pnpm run build
      - name: Create .nojekyll
        run: touch ./out/.nojekyll
      - name: Deploy
        uses: JamesIves/github-pages-deploy-action@v4
        with:
          folder: out
```

Although I use `pnpm` as a package manager, you can the other package managers as well such as [npm](https://github.com/actions/setup-node).

I set the `BASE_PATH` environment variable here by creating the `.env.local` file.

Since Next.js builds static files under the `_next` directory, you need to [create `.nojekyll` to bypass Jekyll processing on Github Pages](https://github.blog/2009-12-29-bypassing-jekyll-on-github-pages/).

---

## Github Permission

![github permission](https://dev-to-uploads.s3.amazonaws.com/uploads/articles/p2wcz8nnymbs9rwgdxgb.png)

I gave all the permissions by default. If you plan to use it in the product environment, it would be more secure to specify granular permissions in the workflow.

---

## Set Github Page

![Image description](https://dev-to-uploads.s3.amazonaws.com/uploads/articles/56ac32uvo0vwlf04v0ol.png)

Set the branch you want to deploy. As the `JamesIves/github-pages-deploy-action@v4` action uses `gh-pages` unless you [change the branch](https://github.com/JamesIves/github-pages-deploy-action?tab=readme-ov-file#optional-choices), I selected `gh-pages`.

---

This is it!

It's one of the ways in many different ways to deploy to Github Pages.

I hope you found it helpful.

Happy Coding!
