import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";

dayjs.extend(utc);

const today = dayjs.utc().hour(0).minute(0).second(0).millisecond(0);
const tomorrow = dayjs.utc().add(1, "day").hour(0).minute(0).second(0).millisecond(0);

export { dayjs, today, tomorrow };
