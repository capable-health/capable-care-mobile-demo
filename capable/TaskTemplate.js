import { CapableClient, GET } from "./api";
import { DataWrapper } from "./DataWrapper";

class TaskTemplate extends DataWrapper {
    static async getList() {
        return new Promise((resolve) => {
            CapableClient.fetch(GET, "/tasks/templates").then((data) => {
                resolve(data.map((item) => new TaskTemplate(item)));
            });
        });
    }
}

export { TaskTemplate };
