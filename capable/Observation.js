import { CapableClient, POST } from "./api";
import { DataWrapper } from "./DataWrapper";

class Observation extends DataWrapper {
    store(observed_value) {
        const { observed_date, target_id, patient_id, data_type } = this;
        return Observation.store({
            observed_value,
            observed_date,
            target_id,
            patient_id,
            data_type,
        });
    }

    static store({ observed_value, observed_date, target_id, patient_id, data_type }) {
        return new Promise((resolve) => {
            CapableClient.fetch(POST, "/observations", {
                data: {
                    observation: {
                        observed_value: Number(observed_value),
                        target_id: target_id,
                        patient_id: patient_id,
                        data_type: data_type || "string",
                        observed_date: observed_date,
                    },
                },
            }).then((data) => {
                resolve(data);
            });
        });
    }
}

export { Observation };
