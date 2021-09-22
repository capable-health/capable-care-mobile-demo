import { CapableClient, GET } from "./api";
import { DataWrapper } from "./DataWrapper";

class CarePlanTemplate extends DataWrapper {
  static async getList() {
    return new Promise((resolve) => {
      CapableClient.fetch(GET, "/care_plans/templates").then((data) => {
        resolve(data.map((item) => new CarePlanTemplate(item)));
      });
    });
  }
}

export { CarePlanTemplate };
