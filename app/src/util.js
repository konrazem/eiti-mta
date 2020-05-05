/**
 * @name getDateFromStr
 * @description  convert string to date if possible. if not return it.
 * @export
 * @param {*} str String
 * @returns yyyy-MM-dd
 */
export function getDateFromStr(arg) {
    if (!arg) {
        return arg;
    }

    const date = new Date(arg.toString()); // try to conver to Date
    if (date.toString() === "Invalid Date") {
        return arg;
    }

    // we have valid date
    // we need to return format yyyy-MM-dd
    return date.toISOString().split("T")[0];
}



/**
 *
 *
 * @export
 * @param {*} [obj={}] plain object
 */
export function genSettings(schema = {}) {
    let result = [];
    if (schema instanceof Object) {
        for (const key in schema) {
            if (schema.hasOwnProperty(key)) {
                let ele = schema[key];
                let type = 'text';
                // check if date
                const possible_date = new Date(ele);
                if (possible_date.toString() !== 'Invalid Date') {
                    ele = possible_date.toISOString().split("T")[0];
                    type = 'date';
                }
                result.push({
                    defaultValue: ele,
                    label: key.toString(),
                    id: key.toString(),
                    type: type,
                });
            }
        }
    }
    return result;
}

/**
 *
 *
 * @export
 * @param {*} obj
 * @param {string} [val=""]
 * @returns {*}
 */
export function makeEmptyProduct(obj, val = "") {
    let result = {};
    if (obj instanceof Object) {
        const keys = Object.keys(obj);
        for (const key of keys) {
            result[key] = val;
        }
    }
    result.id = Math.floor((1 + Math.random()) * 0x10000)
    .toString(16)
    .substring(1);
    result._id = result.id;
    return result;
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

    arrOfObjs.map((ele, index) => {
        if (typeof ele === "object") {
            res.push(Object.values(ele));
        } else {
            res.push([]);
        }
    });

    return res;
}

export default { getDateFromStr, genSettings, makeEmptyProduct, getArrOfArrsOfObjsVals };
