import Vue from "vue";
import { ValidationProvider, ValidationObserver, extend, configure } from "vee-validate";
import * as rules from "vee-validate/dist/rules";
Object.keys(rules).forEach(rule => {
  extend(rule, rules[rule]);
});
configure({
  classes: {
    valid: "is-valid",
    invalid: "is-invalid"
  }
});
// Custom rule: hasError
extend("hasError", () => {
  return false;
});
Vue.component("ValidationProvider", ValidationProvider);
Vue.component("ValidationObserver", ValidationObserver);