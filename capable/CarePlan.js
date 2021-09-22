import Logger from "js-logger";

import { CapableClient, GET, POST } from "./api";
import { CarePlanTemplate } from "./CarePlanTemplate";
import { DataWrapper } from "./DataWrapper";
import { today } from "../helpers/dayjs";
import { Goal } from "./Goal";
import { GoalTemplate } from "./GoalTemplate";
import { Task } from "./Task";
import { TaskTemplate } from "./TaskTemplate";

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

  static async ensureExistOrCreate(
    CARE_PLAN_TEMPLATE_EXTERNAL_ID,
    GOALS_TEMPLATES,
    TASKS_TEMPLATES
  ) {
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

        const inOneMonth = today.add(1, "month");
        const start_on = today.toISOString();
        const due_on = inOneMonth.toISOString();

        const goalTemplates = await GoalTemplate.getList();
        const taskTemplates = await TaskTemplate.getList();

        await Promise.all([
          ...goalTemplates
            .filter((goalTemplate) => GOALS_TEMPLATES.includes(goalTemplate.external_id))
            .map(async (goalTemplate) => {
              return await Goal.create({
                goal_template_id: goalTemplate.id,
                care_plan_id: carePlan.id,
                start_on,
                due_on,
              });
            }),
          ...taskTemplates
            .filter((taskTemplate) => TASKS_TEMPLATES.includes(taskTemplate.external_id))
            .map(async (taskTemplate) => {
              return await Task.create({
                task_template_id: taskTemplate.id,
                care_plan_id: carePlan.id,
                due_on,
              });
            }),
        ]);
      } else throw "Care plan template not found.";
    } else {
      const activeCarePlans = carePlans.filter((carePlan) => carePlan.status == "active");
      carePlan = new CarePlan(activeCarePlans[0]);
    }

    return carePlan;
  }
}

export { CarePlan };
