/**
 * methods module.
 * @module src/methods/methods
 */


/**
 * find correlated columns names with columns names of options and merged them
 *
 * @param {Array} columns data fetched from database without options 
 * @param {Array} options columns with options saved by user
 * @return {Array} merged data with options
 */
function setColumnsOptions(columns, options) {
    let col = '', opt = {}, res = [];

    res = [ ...columns ];

    for ( col of columns ) {
        for ( opt of options) {
            if ( opt.name === col) { 
                res[columns.indexOf(opt.name)] = opt;
            }
        }
    }

    return res;
};


export { setColumnsOptions };