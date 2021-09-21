import { CapableClient, GET } from "./api";
import { DataWrapper } from "./DataWrapper";

class Patient extends DataWrapper {
    get name() {
        let name = this.first_name || this.last_name;
        if (!name && this.email) name = this.email.split("@")[0].split("+")[0];
        else if (!name) name = "";
        return name;
    }

    get email_strip_plus() {
        if (!this.email) return "";
        const left_side = this.email.split("@")[0].split("+")[0];
        const right_side = this.email.split("@")[1];
        return left_side + "@" + right_side;
    }

    static me() {
        return new Promise((resolve) => {
            CapableClient.fetch(GET, `/patients/me`).then((patient) => {
                resolve(new Patient(patient));
            });
        });
    }
}

export { Patient };
