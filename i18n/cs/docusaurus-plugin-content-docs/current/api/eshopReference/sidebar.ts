import type { SidebarsConfig } from "@docusaurus/plugin-content-docs";

const sidebar: SidebarsConfig = {
  apisidebar: [
    {
      type: "doc",
      id: "current/api/eshopReference/hc-oneclick-api-installments",
    },
    {
      type: "category",
      label: "Bezpečnost",
      link: {
        type: "doc",
        id: "current/api/eshopReference/security",
      },
      collapsible: false,
      collapsed: false,
      items: [
        {
          type: "doc",
          id: "current/api/eshopReference/login-partner",
          label: "Přihlášení partnera",
          customProps: {
            tagDisplayName: "x-displayName",
          },
          className: "api-method post",
        },
      ],
    },
    {
      type: "category",
      label: "Zdroje žádosti",
      link: {
        type: "doc",
        id: "current/api/eshopReference/application-resources",
      },
      collapsible: false,
      collapsed: false,
      items: [
        {
          type: "doc",
          id: "current/api/eshopReference/create-using-post-3",
          label: "Vytvořit žádost",
          customProps: {
            tagDisplayName: "x-displayName",
          },
          className: "api-method post",
        },
        {
          type: "doc",
          id: "current/api/eshopReference/get-using-get-7",
          label: "Podrobnosti o žádosti",
          customProps: {
            tagDisplayName: "x-displayName",
          },
          className: "api-method get",
        },
        {
          type: "doc",
          id: "current/api/eshopReference/cancel-using-put",
          label: "Zrušit žádost",
          customProps: {
            tagDisplayName: "x-displayName",
          },
          className: "api-method put",
        },
        {
          type: "doc",
          id: "current/api/eshopReference/change-application-order-using-put",
          label: "Změnit objednávku žádosti",
          customProps: {
            tagDisplayName: "x-displayName",
          },
          className: "api-method put",
        },
        {
          type: "doc",
          id: "current/api/eshopReference/deliver-using-put",
          label: "Označit objednávku jako doručenou",
          customProps: {
            tagDisplayName: "x-displayName",
          },
          className: "api-method put",
        },
        {
          type: "doc",
          id: "current/api/eshopReference/send-order-items-using-put",
          label: "Označit objednávku jako odeslanou",
          customProps: {
            tagDisplayName: "x-displayName",
          },
          className: "api-method put",
        },
        {
          type: "doc",
          id: "current/api/eshopReference/get-using-get-9",
          label: "Objednávky",
          customProps: {
            tagDisplayName: "x-displayName",
          },
          className: "api-method get",
        },
      ],
    },
    {
      type: "category",
      label: "Kontrola stavu",
      link: {
        type: "doc",
        id: "current/api/eshopReference/health-check",
      },
      collapsible: false,
      collapsed: false,
      items: [
        {
          type: "doc",
          id: "current/api/eshopReference/get-health-using-get",
          label: "Kontrola stavu API",
          customProps: {
            tagDisplayName: "x-displayName",
          },
          className: "api-method get",
        },
      ],
    },
    {
      type: "category",
      label: "Zdroje bodování",
      link: {
        type: "doc",
        id: "current/api/eshopReference/scoring-resources",
      },
      collapsible: false,
      collapsed: false,
      items: [
        {
          type: "doc",
          id: "current/api/eshopReference/run-precheck",
          label: "Precheck",
          customProps: {
            tagDisplayName: "x-displayName",
          },
          className: "api-method post",
        },
        {
          type: "doc",
          id: "current/api/eshopReference/run-multi-precheck",
          label: "MultiPrecheck",
          customProps: {
            tagDisplayName: "x-displayName",
          },
          className: "api-method post",
        },
        {
          type: "doc",
          id: "current/api/eshopReference/get-multi-precheck-result",
          label: "Výsledek MultiPrecheck",
          customProps: {
            tagDisplayName: "x-displayName",
          },
          className: "api-method get",
        },
        {
          type: "doc",
          id: "current/api/eshopReference/result-notification",
          label: "Notifikace o výsledku MultiPrecheck",
          customProps: {
            tagDisplayName: "x-displayName",
          },
          className: "api-method post",
        },
      ],
    },
    {
      type: "category",
      label: "Zdroje splátkové kalkulačky",
      link: {
        type: "doc",
        id: "current/api/eshopReference/installments-calculator-resources",
      },
      collapsible: false,
      collapsed: false,
      items: [
        {
          type: "doc",
          id: "current/api/eshopReference/calculate-installment-program-using-post",
          label: "Splátkové programy",
          customProps: {
            tagDisplayName: "x-displayName",
          },
          className: "api-method post",
        },
        {
          type: "doc",
          id: "current/api/eshopReference/calculate-installment-program-down-payments-using-post",
          label: "Splátkové programy - zálohy",
          customProps: {
            tagDisplayName: "x-displayName",
          },
          className: "api-method post",
        },
        {
          type: "doc",
          id: "current/api/eshopReference/calculate-installment-programs-using-post",
          label: "Nabídky splátkových programů",
          customProps: {
            tagDisplayName: "x-displayName",
          },
          className: "api-method post",
        },
      ],
    },
    {
      type: "category",
      label: "Zdroje pro partnery",
      link: {
        type: "doc",
        id: "current/api/eshopReference/merchantsite-resources",
      },
      collapsible: false,
      collapsed: false,
      items: [
        {
          type: "doc",
          id: "current/api/eshopReference/application-notification",
          label: "Notifikace aplikace",
          customProps: {
            tagDisplayName: "x-displayName",
          },
          className: "api-method post",
        },
      ],
    },
  ],
};

export default sidebar.apisidebar;
