
/**
 * @name convertStrToDate
 * @description  check if date is string convert to date if possible. If not return this string
 * @export
 * @param {*} date
 * @returns
 */
export function convertStrToDate(date) {
    if (!date) {
        return "";
    }

    const _date = new Date(date.toString());
    if (_date.toString() === "Invalid Date") {
        return date;
    }

    // we have valid date
    return _date.toDateString();
}


export default { convertStrToDate };