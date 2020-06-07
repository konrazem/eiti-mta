
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

export function getResult(elements, product) {
    let result = { ...product };
    const keys = Object.keys(result);

    for (const key of keys) {
        if (elements.hasOwnProperty(key)) {
            result[key] = elements[key].value || "";
        }
    }
    return result;
}

export function fetchProducts() {
    const URL = 'http://localhost:5000/products';
    return fetch(URL)
    .then((res) =>  res.json())
    .catch((error) =>  'error' );
}
export function fetchPrfile() {
    const URL = 'http://localhost:5000/profile';
    return fetch(URL)
    .then((res) =>  res.json())
    .catch((error) =>  'error' );
}

export function fetchProduct(_id) {
    const URL = 'http://localhost:5000/product';
    return fetch(URL + '/' + _id)
    .then((res) =>  res.json())
    .catch((error) =>  'error' );
}
export function createProduct(data) {
    const URL = 'http://localhost:5000/product';
    return fetch(URL, {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    })
    .then((res) =>  res)
    .catch((error) =>  'error' );
}

export function updateProduct(data) {
    const URL = 'http://localhost:5000/product' + data._id;
    return fetch(URL, {
        method: 'PUT',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    })
    .then((res) =>  res)
    .catch((error) =>  'error' );
}

export function deleteProduct(_id) {
    const URL = 'http://localhost:5000/product';
    return fetch(URL + '/' + _id, {
        method: 'DELETE'
    })
    .then((res) =>  res)
    .catch((error) =>  'error' );
}

export default { genSettings, getResult, fetchProducts, fetchProduct, createProduct,updateProduct, deleteProduct };
