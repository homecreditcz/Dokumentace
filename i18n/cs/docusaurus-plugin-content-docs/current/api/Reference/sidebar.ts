import type { SidebarsConfig } from "@docusaurus/plugin-content-docs";

const sidebar: SidebarsConfig = {
  apisidebar: [
    {
      type: "doc",
      id: "current/api/Reference/home-credit-partner-api-order",
    },
    {
      type: "category",
      label: "Zabezpečení",
      link: {
        type: "doc",
        id: "current/api/Reference/security",
      },
      collapsible: false,
      collapsed: false,
      items: [
        {
          type: "doc",
          id: "current/api/Reference/login-partner",
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
      label: "Zdroje pro aplikace",
      link: {
        type: "doc",
        id: "current/api/Reference/application-resources",
      },
      collapsible: false,
      collapsed: false,
      items: [
        {
          type: "doc",
          id: "current/api/Reference/create-application",
          label: "Vytvořit aplikaci",
          customProps: {
            tagDisplayName: "x-displayName",
          },
          className: "api-method post",
        },
        {
          type: "doc",
          id: "current/api/Reference/mark-order-as-shipped",
          label: "Označit objednávku jako odeslanou",
          customProps: {
            tagDisplayName: "x-displayName",
          },
          className: "api-method put",
        },
        {
          type: "doc",
          id: "current/api/Reference/mark-order-as-delivered",
          label: "Označit objednávku jako doručenou",
          customProps: {
            tagDisplayName: "x-displayName",
          },
          className: "api-method put",
        },
        {
          type: "doc",
          id: "current/api/Reference/cancel-application",
          label: "Zrušit žádost",
          customProps: {
            tagDisplayName: "x-displayName",
          },
          className: "api-method put",
        },
        {
          type: "doc",
          id: "current/api/Reference/get-application",
          label: "Získat aplikaci",
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
        id: "current/api/Reference/health-check",
      },
      collapsible: false,
      collapsed: false,
      items: [
        {
          type: "doc",
          id: "current/api/Reference/api-status-check",
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
      label: "Zdroje pro scoring",
      link: {
        type: "doc",
        id: "current/api/Reference/scoring-resources",
      },
      collapsible: false,
      collapsed: false,
      items: [
        {
          type: "doc",
          id: "current/api/Reference/run-precheck",
          label: "Spustit předběžnou kontrolu",
          customProps: {
            tagDisplayName: "x-displayName",
          },
          className: "api-method post",
        },
        {
          type: "doc",
          id: "current/api/Reference/run-multi-precheck",
          label: "Spustit multiPrecheck",
          customProps: {
            tagDisplayName: "x-displayName",
          },
          className: "api-method post",
        },
        {
          type: "doc",
          id: "current/api/Reference/get-multi-precheck-result",
          label: "GET výsledky více předběžných kontrol",
          customProps: {
            tagDisplayName: "x-displayName",
          },
          className: "api-method get",
        },
        {
          type: "doc",
          id: "current/api/Reference/result-notification",
          label: "Oznámení výsledku",
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
        id: "current/api/Reference/installments-calculator-resources",
      },
      collapsible: false,
      collapsed: false,
      items: [
        {
          type: "doc",
          id: "current/api/Reference/calculate-installment-programs-offer",
          label: "Vypočítat nabídku splátkového programu",
          customProps: {
            tagDisplayName: "x-displayName",
          },
          className: "api-method post",
        },
        {
          type: "doc",
          id: "current/api/Reference/calculate-installment-program-detail",
          label: "Vypočítat podrobnosti splátkového programu",
          customProps: {
            tagDisplayName: "x-displayName",
          },
          className: "api-method post",
        },
        {
          type: "doc",
          id: "current/api/Reference/calculate-installment-programs-down-payments",
          label: "Vypočítat splátkové programy a zálohy",
          customProps: {
            tagDisplayName: "x-displayName",
          },
          className: "api-method post",
        },
      ],
    },
    {
      type: "category",
      label: "Integrace JavaScriptového widgetu",
      link: {
        type: "doc",
        id: "current/api/Reference/java-script-widget-integration",
      },
      collapsible: false,
      collapsed: false,
      items: [
        {
          type: "doc",
          id: "current/api/Reference/api-health-check",
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
      label: "Zdroje obchodního webu",
      link: {
        type: "doc",
        id: "current/api/Reference/merchantsite-resources",
      },
      collapsible: false,
      collapsed: false,
      items: [
        {
          type: "doc",
          id: "current/api/Reference/application-notification",
          label: "Oznámení o podání žádosti",
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
