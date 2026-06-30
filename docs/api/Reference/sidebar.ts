import type { SidebarsConfig } from "@docusaurus/plugin-content-docs";

const sidebar: SidebarsConfig = {
  apisidebar: [
    {
      type: "doc",
      id: "api/Reference/home-credit-partner-api-order",
    },
    {
      type: "category",
      label: "Security",
      link: {
        type: "doc",
        id: "api/Reference/security",
      },
      collapsible: false,
      collapsed: false,
      items: [
        {
          type: "doc",
          id: "api/Reference/login-partner",
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
        id: "api/Reference/application-resources",
      },
      collapsible: false,
      collapsed: false,
      items: [
        {
          type: "doc",
          id: "api/Reference/create-application",
          label: "Create application",
          className: "api-method post",
        },
        {
          type: "doc",
          id: "api/Reference/mark-order-as-shipped",
          label: "Mark order as shipped",
          className: "api-method put",
        },
        {
          type: "doc",
          id: "api/Reference/mark-order-as-delivered",
          label: "Mark order as delivered",
          className: "api-method put",
        },
        {
          type: "doc",
          id: "api/Reference/cancel-application",
          label: "Cancel application",
          className: "api-method put",
        },
        {
          type: "doc",
          id: "api/Reference/get-application",
          label: "Get Application",
          className: "api-method get",
        },
      ],
    },
    {
      type: "category",
      label: "Health check",
      link: {
        type: "doc",
        id: "api/Reference/health-check",
      },
      collapsible: false,
      collapsed: false,
      items: [
        {
          type: "doc",
          id: "api/Reference/api-status-check",
          label: "API status check",
          className: "api-method get",
        },
      ],
    },
    {
      type: "category",
      label: "Scoring resources",
      link: {
        type: "doc",
        id: "api/Reference/scoring-resources",
      },
      collapsible: false,
      collapsed: false,
      items: [
        {
          type: "doc",
          id: "api/Reference/run-precheck",
          label: "Run precheck",
          className: "api-method post",
        },
        {
          type: "doc",
          id: "api/Reference/run-multi-precheck",
          label: "Run multiPrecheck",
          className: "api-method post",
        },
        {
          type: "doc",
          id: "api/Reference/get-multi-precheck-result",
          label: "GET multi precheck result",
          className: "api-method get",
        },
        {
          type: "doc",
          id: "api/Reference/result-notification",
          label: "Result notification",
          className: "api-method post",
        },
      ],
    },
    {
      type: "category",
      label: "Installments calculator resources",
      link: {
        type: "doc",
        id: "api/Reference/installments-calculator-resources",
      },
      collapsible: false,
      collapsed: false,
      items: [
        {
          type: "doc",
          id: "api/Reference/calculate-installment-programs-offer",
          label: "Calculate installment programs offer",
          className: "api-method post",
        },
        {
          type: "doc",
          id: "api/Reference/calculate-installment-program-detail",
          label: "Calculate installment program detail",
          className: "api-method post",
        },
        {
          type: "doc",
          id: "api/Reference/calculate-installment-programs-down-payments",
          label: "Calculate installment programs down payments",
          className: "api-method post",
        },
      ],
    },
    {
      type: "category",
      label: "JavaScript widget integration",
      link: {
        type: "doc",
        id: "api/Reference/java-script-widget-integration",
      },
      collapsible: false,
      collapsed: false,
      items: [
        {
          type: "doc",
          id: "api/Reference/api-health-check",
          label: "API health check",
          className: "api-method get",
        },
      ],
    },
    {
      type: "category",
      label: "Merchantsite resources",
      link: {
        type: "doc",
        id: "api/Reference/merchantsite-resources",
      },
      collapsible: false,
      collapsed: false,
      items: [
        {
          type: "doc",
          id: "api/Reference/application-notification",
          label: "Application notification",
          className: "api-method post",
        },
      ],
    },
  ],
};

export default sidebar.apisidebar;
