import cronstrue from "cronstrue";
import Logger from "js-logger";

import { CapableClient, GET, POST } from "./api";
import { DataWrapper } from "./DataWrapper";
import { dateRangeGenerator } from "../helpers/dateRangeGenerator";
import { dayjs, today, tomorrow } from "../helpers/dayjs";
import { Observation } from "./Observation";

class Goal extends DataWrapper {
    constructor(data) {
        super(data);
        this.observations = data.observations.map((item) => new Observation(item));
    }

    get recurrence() {
        if (this._recurrence == undefined) {
            if (!this.cron_expression) this._recurrence = "";
            else if (this.cron_expression.startsWith("@"))
                this._recurrence = this.cron_expression.substring(1);
            else {
                try {
                    this._recurrence = cronstrue.toString(this.cron_expression);
                } catch (error) {
                    Logger.error("Could not parse cron expression: ", this.cron_expression);
                    Logger.debug(error);
                }
            }
        }

        return this._recurrence ? `repeats ${this._recurrence}` : "";
    }

    mostRecentObservations() {
        return this.realObservations().reduce((recents, observation) => {
            const observed_date = dayjs.utc(observation.observed_date);
            if (tomorrow.isAfter(observed_date)) recents[observation.target_id] = observation;

            return recents;
        }, {});
    }

    static mostRecentObservationsByDay(observationTargets) {
        observationTargets
            .sort((a, b) => {
                const dateA = dayjs.utc(a.observation.created_at);
                const dateB = dayjs.utc(b.observation.created_at);
                return dateA.diff(dateB);
            })
            .filter((observationTarget) =>
                tomorrow.isAfter(observationTarget.observation.observed_date)
            );
        const mostRecent = observationTargets.reduce((recents, observationTarget) => {
            recents[observationTarget.observation.target_id] = observationTarget;
            return recents;
        }, {});
        return Object.values(mostRecent);
    }

    nextObservations() {
        return this.placeholders().reduce((recents, observation) => {
            // TODO this reduce is rather inneficcient
            const observed_date = dayjs.utc(observation.observed_date);
            if (today.isBefore(observed_date) && !recents[observation.target_id])
                recents[observation.target_id] = observation;

            return recents;
        }, {});
    }

    observationsGroupBy(key) {
        return this.realObservations().reduce((groups, observation) => {
            if (!groups[observation[key]]) groups[observation[key]] = [];

            groups[observation[key]].push({
                target: this.targets.find((target) => target.id == observation.target_id),
                observation,
            });

            return groups;
        }, {});
    }

    placeholdersForDate(date) {
        return this.placeholders().filter((o) => o.observed_date == date);
    }

    realObservations() {
        return this.observations.filter((observation) => observation.id != null);
    }

    placeholders() {
        return this.observations.filter((observation) => observation.id == null);
    }

    observationsDatesUntilNow() {
        if (this.recurrence) {
            // goal has observations placeholder
            return [
                ...new Set(
                    this.observations
                        .filter(
                            (observation) =>
                                observation.id == null &&
                                tomorrow.isAfter(dayjs.utc(observation.observed_date))
                        )
                        .map((observation) => observation.observed_date)
                ),
            ];
        } else {
            // goal has no observations, dates a done from the goal range
            return dateRangeGenerator(dayjs.utc(this.start_on), dayjs.utc(this.due_on));
        }
    }

    hasTargetNamed(name) {
        return Boolean(this.targets.find((target) => target.name.trim() == name));
    }

    static isTargetType(targetType, targetName) {
        const types = {
            wellness: ["wellness", "how severe are your symptoms?"],
            done: ["have you done it?", "did you do it?"],
        };

        return types[targetType].includes(targetName.trim().toLowerCase());
    }

    hasTargetType(targetType) {
        return Boolean(this.targets.find((target) => Goal.isTargetType(targetType, target.name)));
    }

    static getList() {
        return new Promise((resolve) => {
            CapableClient.fetch(GET, "/goals").then((data) => {
                resolve(data.map((item) => new Goal(item)));
            });
        });
    }

    static create({ care_plan_id, start_on, due_on, cron_expression, goal_template_id }) {
        return new Promise((resolve) => {
            CapableClient.fetch(POST, "/goals", {
                data: {
                    goal: {
                        goal_template_id,
                        care_plan_id,
                        start_on,
                        due_on,
                        cron_expression,
                    },
                },
            }).then((data) => {
                Logger.debug("Goal created: ", data);
                resolve(data);
            });
        });
    }

    refresh() {
        return new Promise((resolve) => {
            CapableClient.fetch(GET, `/goals/${this.id}`).then((data) => {
                this._keysFromData(data);
                this.observations = data.observations.map((item) => new Observation(item));
                resolve(true);
            });
        });
    }
}

export { Goal };
