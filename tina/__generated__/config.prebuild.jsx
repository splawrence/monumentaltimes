// tina/config.ts
import { defineConfig } from "tinacms";
var config_default = defineConfig({
  branch: "master",
  clientId: process.env.VITE_TINA_CLIENT_ID || null,
  token: process.env.TINA_TOKEN || null,
  build: {
    publicFolder: "public",
    outputFolder: "admin"
  },
  // Use local mode when no cloud credentials are provided
  contentApiUrlOverride: false ? "/api/tina/gql" : void 0,
  media: {
    tina: {
      mediaRoot: "images",
      publicFolder: "public"
    }
  },
  schema: {
    collections: [
      {
        label: "Blog Articles",
        name: "articles",
        path: "public/content/articles",
        format: "mdx",
        ui: {
          router: ({ document }) => {
            return `/article/${document._sys.filename}`;
          }
        },
        fields: [
          {
            type: "string",
            name: "title",
            label: "Title",
            isTitle: true,
            required: true
          },
          {
            type: "string",
            name: "summary",
            label: "Summary",
            ui: {
              component: "textarea"
            }
          },
          {
            type: "string",
            name: "author",
            label: "Author"
          },
          {
            type: "datetime",
            name: "date",
            label: "Publish Date"
          },
          {
            type: "string",
            name: "category",
            label: "Category",
            options: [
              { label: "Spiritual/Bible", value: "Spiritual/Bible" },
              { label: "Opinion/Testimony", value: "Opinion/Testimony" },
              { label: "News Flash", value: "News Flash" },
              { label: "Biography/History", value: "Biography/History" },
              { label: "Recipes", value: "Recipes" },
              { label: "Poetry & Art", value: "Poetry & Art" },
              { label: "Stories & Comics", value: "Stories & Comics" },
              { label: "Tech & Sports", value: "Tech & Sports" },
              { label: "Reviews", value: "Reviews" },
              { label: "Book review", value: "Book review" },
              { label: "Prayer", value: "Prayer" },
              { label: "Poetry", value: "Poetry" },
              { label: "Stories", value: "Stories" },
              { label: "Human interest", value: "Human interest" }
            ]
          },
          {
            type: "number",
            name: "readTime",
            label: "Reading Time (minutes)"
          },
          {
            type: "image",
            name: "image",
            label: "Featured Image"
          },
          {
            type: "boolean",
            name: "isBreaking",
            label: "Breaking News"
          },
          {
            type: "string",
            name: "canvaEmbed",
            label: "Canva Embed URL (optional)",
            description: "Paste the Canva embed URL here (e.g., https://www.canva.com/design/...)",
            ui: {
              component: "textarea"
            }
          },
          {
            type: "rich-text",
            name: "body",
            label: "Body",
            isBody: true
          }
        ]
      }
    ]
  }
});
export {
  config_default as default
};
