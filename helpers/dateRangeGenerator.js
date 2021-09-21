function* generateDateFrom(startDate) {
    let diff = 0;
    while (true) {
        yield startDate.add(diff, "day");
        diff++;
    }
}

function dateRangeGenerator(startDate, endDate) {
    const dateRange = [];
    for (const date of generateDateFrom(startDate)) {
        if (date.isAfter(endDate)) break;
        dateRange.push(date.toString());
    }
    return dateRange;
}

export { dateRangeGenerator };
