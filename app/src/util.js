
/**
 *
 *
 * @export
 * @param {*} [obj={}] plain object
 */
export function genSettings(schema) {
    let result = [];
    if(schema instanceof Object) {
        for (const key in schema) {
            let type = 'text';
            let val = schema[key];
            if (key === 'dateAdded' || key === 'dateUpdated') {
                const date = new Date(val);
                // check if date
                if (date.toString() !== 'Invalid Date') {
                    val = date.toISOString().split("T")[0];
                }
                type = 'date';
            }
            result.push({
                defaultValue: val,
                label: key.toString(),
                id: key.toString(),
                type: type,
            });
    
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

export default { genSettings, makeEmptyProduct, getArrOfArrsOfObjsVals };
