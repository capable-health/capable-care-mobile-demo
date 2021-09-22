import { CapableClient, GET } from "./api";
import { DataWrapper } from "./DataWrapper";

class GoalTemplate extends DataWrapper {
  static async getList() {
    return new Promise((resolve) => {
      CapableClient.fetch(GET, "/goals/templates").then((data) => {
        resolve(data.map((item) => new GoalTemplate(item)));
      });
    });
  }
}

export { GoalTemplate };
