/**
 * @name getDateFromStr
 * @description  check if parameter is a string convert to date if possible. If not return this string
 * @export
 * @param {*} str String
 * @returns yyyy-MM-dd
 */
export function getDateFromStr(str) {
    var def = "0000-00-00";
    if (!str) {
        return def;
    }

    const date = new Date(str.toString()); // try to conver to Date
    if (date.toString() === "Invalid Date") {
        return def;
    }

    // we have valid date
    // we need to return format yyyy-MM-dd
    return date.toISOString().split("T")[0];
}


/**
 * @name 
 * @description Get values from arrays' objects. Used to fill mui-datatable rows
 * @export
 * @param {*} arr [{*}, {*}, ...]
 * @returns [[*], [*], ...]
 */
export function getArrOfArrsOfObjsVals(arrOfObjs) {
    var res = [];

    arrOfObjs.map(function (ele, index) {
        if (typeof ele === "object") {
            res.push(Object.values(ele));
        } else {
            res.push([]);
        }
    });

    return res;
}

export default { getDateFromStr, getArrOfArrsOfObjsVals };
