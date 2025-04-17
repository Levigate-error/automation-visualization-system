import axios from "axios";

export default {
  getComponentTemplates: () =>
    axios({
      method: "GET",
      url: "/component-templates/",
    }),
  getAutomations: () =>
    axios({
      method: "GET",
      url: "/automations",
    }),
};
