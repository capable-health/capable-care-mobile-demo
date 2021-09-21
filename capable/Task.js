import Logger from "js-logger";

import { CapableClient, GET, POST, PATCH } from "./api";
import { DataWrapper } from "./DataWrapper";

const IN_PROGRESS = "in_progress";
const COMPLETED = "completed";
const CANCELLED = "cancelled";
const ACHIEVEMENT_STATUSES = {
    0: IN_PROGRESS,
    1: COMPLETED,
    2: CANCELLED,
};

class Task extends DataWrapper {
    static getList() {
        return new Promise((resolve) => {
            CapableClient.fetch(GET, "/tasks").then((data) => {
                resolve(data.map((item) => new Task(item)));
            });
        });
    }

    static create({ care_plan_id, task_template_id, due_on }) {
        return new Promise((resolve) => {
            CapableClient.fetch(POST, "/tasks", {
                data: {
                    task: {
                        task_template_id,
                        care_plan_id,
                        due_on,
                    },
                },
            }).then((data) => {
                Logger.debug("Task created: ", data);
                resolve(new Task(data));
            });
        });
    }

    setStatus(status) {
        const achievement_status = ACHIEVEMENT_STATUSES[status];
        return new Promise((resolve) => {
            CapableClient.fetch(PATCH, `/tasks/${this.id}`, {
                data: {
                    task: {
                        achievement_status,
                    },
                },
            }).then((data) => {
                Logger.debug("Task updated: ", data);
                resolve(new Task(data));
            });
        });
    }

    get isInProgress() {
        return this.achievement_status == IN_PROGRESS;
    }

    get isCompleted() {
        return this.achievement_status == COMPLETED;
    }

    get isCancelled() {
        return this.achievement_status == CANCELLED;
    }
}

export { Task, ACHIEVEMENT_STATUSES };
