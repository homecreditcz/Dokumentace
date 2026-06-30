import type { SidebarsConfig } from "@docusaurus/plugin-content-docs";

const sidebar: SidebarsConfig = {
  apisidebar: [
    {
      type: "doc",
      id: "api/eshopReference/hc-oneclick-api-installments",
    },
    {
      type: "category",
      label: "Security",
      link: {
        type: "doc",
        id: "api/eshopReference/security",
      },
      collapsible: false,
      collapsed: false,
      items: [
        {
          type: "doc",
          id: "api/eshopReference/login-partner",
          label: "Login partner",
          className: "api-method post",
        },
      ],
    },
    {
      type: "category",
      label: "Application resources",
      link: {
        type: "doc",
        id: "api/eshopReference/application-resources",
      },
      collapsible: false,
      collapsed: false,
      items: [
        {
          type: "doc",
          id: "api/eshopReference/create-using-post-3",
          label: "Create application",
          className: "api-method post",
        },
        {
          type: "doc",
          id: "api/eshopReference/get-using-get-7",
          label: "Application detail",
          className: "api-method get",
        },
        {
          type: "doc",
          id: "api/eshopReference/cancel-using-put",
          label: "Cancel application",
          className: "api-method put",
        },
        {
          type: "doc",
          id: "api/eshopReference/change-application-order-using-put",
          label: "Change application order",
          className: "api-method put",
        },
        {
          type: "doc",
          id: "api/eshopReference/deliver-using-put",
          label: "Mark order as delivered",
          className: "api-method put",
        },
        {
          type: "doc",
          id: "api/eshopReference/send-order-items-using-put",
          label: "Mark order as sent",
          className: "api-method put",
        },
        {
          type: "doc",
          id: "api/eshopReference/get-using-get-9",
          label: "Orders",
          className: "api-method get",
        },
      ],
    },
    {
      type: "category",
      label: "Health check",
      link: {
        type: "doc",
        id: "api/eshopReference/health-check",
      },
      collapsible: false,
      collapsed: false,
      items: [
        {
          type: "doc",
          id: "api/eshopReference/get-health-using-get",
          label: "API health check",
          className: "api-method get",
        },
      ],
    },
    {
      type: "category",
      label: "Scoring resources",
      link: {
        type: "doc",
        id: "api/eshopReference/scoring-resources",
      },
      collapsible: false,
      collapsed: false,
      items: [
        {
          type: "doc",
          id: "api/eshopReference/run-precheck",
          label: "Precheck",
          className: "api-method post",
        },
        {
          type: "doc",
          id: "api/eshopReference/run-multi-precheck",
          label: "MultiPrecheck",
          className: "api-method post",
        },
        {
          type: "doc",
          id: "api/eshopReference/get-multi-precheck-result",
          label: "Multi precheck result",
          className: "api-method get",
        },
        {
          type: "doc",
          id: "api/eshopReference/result-notification",
          label: "Multi precheck result notification",
          className: "api-method post",
        },
      ],
    },
    {
      type: "category",
      label: "Installments calculator resources",
      link: {
        type: "doc",
        id: "api/eshopReference/installments-calculator-resources",
      },
      collapsible: false,
      collapsed: false,
      items: [
        {
          type: "doc",
          id: "api/eshopReference/calculate-installment-program-using-post",
          label: "Installment programs",
          className: "api-method post",
        },
        {
          type: "doc",
          id: "api/eshopReference/calculate-installment-program-down-payments-using-post",
          label: "Installment programs down payments",
          className: "api-method post",
        },
        {
          type: "doc",
          id: "api/eshopReference/calculate-installment-programs-using-post",
          label: "Installment programs offers",
          className: "api-method post",
        },
      ],
    },
    {
      type: "category",
      label: "Merchantsite resources",
      link: {
        type: "doc",
        id: "api/eshopReference/merchantsite-resources",
      },
      collapsible: false,
      collapsed: false,
      items: [
        {
          type: "doc",
          id: "api/eshopReference/application-notification",
          label: "Application notification",
          className: "api-method post",
        },
      ],
    },
  ],
};

export default sidebar.apisidebar;
