import Logger from "js-logger";

import { CapableClient, GET, POST } from "./api";
import { CarePlanTemplate } from "./CarePlanTemplate";
import { DataWrapper } from "./DataWrapper";
import { dayjs } from "../helpers/dayjs";

class CarePlan extends DataWrapper {
  static create(care_plan_template_id) {
    return new Promise((resolve) => {
      CapableClient.fetch(POST, "/care_plans", {
        data: {
          care_plan: {
            status: "active",
            care_plan_template_id,
          },
        },
      }).then((data) => {
        resolve(data);
      });
    });
  }

  static getList() {
    return new Promise((resolve) => {
      CapableClient.fetch(GET, "/care_plans").then((data) => {
        resolve(data.map((item) => new CarePlan(item)));
      });
    });
  }

  static async ensureExistOrCreate(CARE_PLAN_TEMPLATE_EXTERNAL_ID) {
    let carePlan;
    const carePlans = await CarePlan.getList();
    if (carePlans.length == 0) {
      const carePlanTemplates = await CarePlanTemplate.getList();
      const carePlanTemplate01 = carePlanTemplates.find(
        (template) => template.external_id == CARE_PLAN_TEMPLATE_EXTERNAL_ID
      );

      if (carePlanTemplate01) {
        carePlan = await CarePlan.create(carePlanTemplate01.id);

        Logger.info("CarePlan created: ", carePlan);
      } else throw "Care plan template not found.";
    } else {
      const activeCarePlans = carePlans
        .filter((carePlan) => carePlan.status == "active")
        .sort((a, b) => {
          const dateA = dayjs.utc(a.created_at);
          const dateB = dayjs.utc(b.created_at);
          return dateB.diff(dateA);
        });
      if (activeCarePlans.length == 0) throw "No active care plans found.";
      carePlan = new CarePlan(activeCarePlans[0]);
    }

    return carePlan;
  }
}

export { CarePlan };
