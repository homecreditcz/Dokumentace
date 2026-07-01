import {themes as prismThemes} from 'prism-react-renderer';
import type {Config} from '@docusaurus/types';
import type * as Preset from '@docusaurus/preset-classic';
import type * as OpenApiPlugin from 'docusaurus-plugin-openapi-docs';

// This runs in Node.js - Don't use client-side code here (browser APIs, JSX...)

// Load environment variables (with fallbacks for local development)
const algoliaAppId = process.env.ALGOLIA_APP_ID || 'PBCNXEYFI2';
const algoliaApiKey = process.env.ALGOLIA_API_KEY || '48d66ff729deba2c985df900c321b72d';
const algoliaIndexName = process.env.ALGOLIA_INDEX_NAME || 'homecreditcz_github_io_pbcnxeyfi2_pages';
const algoliaSiteVerification = process.env.ALGOLIA_SITE_VERIFICATION || 'BB5757DF62EAF0E2';

const config: Config = {
  title: "Home Credit Developer Documentation",
  tagline: "Integrate your ecommerce system with Home Credit easily and provide your customers with a seamless payment experience.",
  favicon: "img/favicon.ico",

  // Future flags, see https://docusaurus.io/docs/api/docusaurus-config#future
  future: {
    v4: true, // Improve compatibility with the upcoming Docusaurus v4
  },

  // Set the production url of your site here
  url: process.env.SITE_URL || "https://hc-docs.pages.dev",
  // Set the /<baseUrl>/ pathname under which your site is served
  // For GitHub pages deployment, it is often '/<projectName>/'
  baseUrl: process.env.SITE_BASE_URL || "/",

  // GitHub pages deployment config.
  // If you aren't using GitHub pages, you don't need these.
  organizationName: "homecreditcz", // Usually your GitHub org/user name.
  projectName: "Dokumentace", // Usually your repo name.

  onBrokenLinks: "throw",

  // Algolia site verification
  headTags: [
    {
      tagName: 'meta',
      attributes: {
        name: 'algolia-site-verification',
        content: algoliaSiteVerification,
      },
    },
  ],

  // Even if you don't use internationalization, you can use this field to set
  // useful metadata like html lang. For example, if your site is Chinese, you
  // may want to replace "en" with "zh-Hans".
  i18n: {
    defaultLocale: "cs",
    locales: ["en", "cs"],
    localeConfigs: {
      en: { label: "English", htmlLang: "en-US" },
      cs: { label: "Čeština", htmlLang: "cs-CZ" }
    }
  },

  presets: [
    [
      "classic",
      {
        docs: {
          path: "docs",
          sidebarPath: "./sidebars.ts",
          docItemComponent: "@theme/ApiItem",
        },
        // blog: {
        //   showReadingTime: true,
        //   feedOptions: {
        //     type: ["rss", "atom"],
        //     xslt: true,
        //   },
        //   // Please change this to your repo.
        //   // Remove this to remove the "edit this page" links.
        //   editUrl:
        //     "https://github.com/facebook/docusaurus/tree/main/packages/create-docusaurus/templates/shared/",
        //   // Useful options to enforce blogging best practices
        //   onInlineTags: "warn",
        //   onInlineAuthors: "warn",
        //   onUntruncatedBlogPosts: "warn",
        // },
        theme: {
          customCss: "./src/css/custom.css",
        },
      } satisfies Preset.Options,
    ],
  ],

  plugins: [
    [
      'docusaurus-plugin-openapi-docs',
      {
        id: 'api',
        docsPluginId: 'classic',
        config: {
          // homeCreditApi: {
          //   specPath: 'api-docs-source/testopenapi.yaml',
          //   outputDir: 'docs/api/Reference',
          //   sidebarOptions: {
          //     groupPathsBy: 'tag',
          //     sidebarCollapsible: true,
          //     sidebarCollapsed: false,
          //   },
          // } satisfies OpenApiPlugin.Options,
          // psd2Api: {
          //   specPath: 'api-docs-source/openapi.yaml',
          //   outputDir: 'docs/api-psd2',
          //   sidebarOptions: {
          //     groupPathsBy: 'tag',
          //     sidebarCollapsible: true,
          //     sidebarCollapsed: false,
          //   },
          // } satisfies OpenApiPlugin.Options,
          // oldHomeCreditApi: {
          //   specPath: 'api-docs-source/swaggerspec.yaml',
          //   outputDir: 'docs/api/ReferenceV1V2V3',
          //   sidebarOptions: {
          //     groupPathsBy: 'tag',
          //     sidebarCollapsible: false,
          //     sidebarCollapsed: false,
          //   },
          // } satisfies OpenApiPlugin.Options,
          eshopHomeCreditApi: {
            specPath: 'api-docs-source/eshopopenapispec.yaml',
            outputDir: 'docs/api/eshopReference',
            sidebarOptions: {
              groupPathsBy: 'tag',
              categoryLinkSource: 'tag',
              sidebarCollapsible: false,
              sidebarCollapsed: false,
            },
          } satisfies OpenApiPlugin.Options,
          eshopHomeCreditApiCs: {
            specPath: 'api-docs-source/eshopopenapispec.cs.yaml',
            outputDir: 'i18n/cs/docusaurus-plugin-content-docs/current/api/eshopReference',
            sidebarOptions: {
              groupPathsBy: 'tag',
              categoryLinkSource: 'tag',
              sidebarCollapsible: false,
              sidebarCollapsed: false,
              customProps: {
                tagDisplayName: 'x-displayName',
              },
            },
          } satisfies OpenApiPlugin.Options,
          homeCreditApi: {
            specPath: 'api-docs-source/openapispec.yaml',
            outputDir: 'docs/api/Reference',
            sidebarOptions: {
              groupPathsBy: 'tag',
              categoryLinkSource: 'tag',
              sidebarCollapsible: false,
              sidebarCollapsed: false,
            },
          } satisfies OpenApiPlugin.Options,
          homeCreditApiCs: {
            specPath: 'api-docs-source/openapispec.cs.yaml',
            outputDir: 'i18n/cs/docusaurus-plugin-content-docs/current/api/Reference',
            sidebarOptions: {
              groupPathsBy: 'tag',
              categoryLinkSource: 'tag',
              sidebarCollapsible: false,
              sidebarCollapsed: false,
              customProps: {
                tagDisplayName: 'x-displayName',
              },
            },
          } satisfies OpenApiPlugin.Options,
        } as any,
      }
    ]
  ],
  themes: ["docusaurus-theme-openapi-docs"],
  themeConfig: {
    algolia: {
      // The application ID provided by Algolia
      appId: algoliaAppId,

      // Public API key: it is safe to commit it
      apiKey: algoliaApiKey,

      indexName: algoliaIndexName,

      // Optional: see doc section below
      contextualSearch: false,

      // Remove /cs/ prefix from URLs since Czech is the default locale at root
      replaceSearchResultPathname: {
        from: '/cs/',
        to: '/',
      },
    },
    // Replace with your project's social card
    image: "img/docusaurus-social-card.jpg",
    colorMode: {
      respectPrefersColorScheme: true,
    },
    navbar: {
      title: "Developer Documentation",
      logo: {
        alt: "HC Docs Logo",
        src: "img/logo.svg",
      },
      items: [
        {
          type: "docSidebar",
          sidebarId: "docSidebar",
          position: "left",
          label: "Docs",
        },
        {
          type: "docSidebar",
          sidebarId: "eshopApiReference",
          position: "left",
          label: "API Reference eshop",
        },
        {
          type: "docSidebar",
          sidebarId: "apiReference",
          position: "left",
          label: "API Reference PSP",
        },
        // {
        //   type: "docSidebar",
        //   sidebarId: "widgetsSidebar",
        //   position: "left",
        //   label: "Widgets",
        // },
        { to: "docs/contact", label: "Contact", position: "left" },
        {
          type: "localeDropdown",
          position: "right",
        }
      ],
    },
    footer: {
      style: "dark",
      links: [
        {
          title: "Docs",
          items: [
            {
              label: "Documentation",
              to: "/docs/documentation/button-quarter",
            },
            {
              label: "API reference PSP",
              to: "docs/api/Reference/home-credit-partner-api-order",
            },
            {
              label: "API reference eshop",
              to: "docs/api/eshopReference/hc-oneclick-api-installments",
            },
            // {
            //   label: "Widgets",
            //   to: "/docs/widgets/install",
            // },
          ],
        },
        {
          title: "Community",
          items: [
            {
              label: "LinkedIn",
              href: "https://www.linkedin.com/company/homecredit/",
            },
            {
              label: "Facebook",
              href: "https://www.facebook.com/homecreditcz",
            },
            {
              label: "Home Credit",
              href: "https://www.homecredit.cz/",
            }
          ],
        },
        {
          title: "More",
          items: [
            {
              label: "GitHub",
              href: "https://github.com/homecreditcz",
            },
          ],
        },
      ],
      copyright: `Copyright © ${new Date().getFullYear()} Home Credit a.s., Nové sady 996/25, 602 00 Brno`,
    },
    prism: {
      theme: prismThemes.github,
      darkTheme: prismThemes.dracula,
    },
  } satisfies Preset.ThemeConfig,
};

export default config;
