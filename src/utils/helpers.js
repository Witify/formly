/**
 * Recusively convert arrays in an object to objects
 * 
 * @param Object object
 * @return Object
 */
function recursiveArrayToObject(object) {
    Object.keys(object).forEach(function(key) {
        if (object[key] !== undefined && object[key] !== null && object[key].constructor === Array) {
            object[key] = arrayToObject(object[key])
        }

        if (object[key] !== undefined && object[key] !== null &&  typeof object[key] === 'object') {
            recursiveArrayToObject(object[key])
        }
    })
}

export { recursiveArrayToObject }

/**
 * Converts array to object
 * 
 * @param Array array
 * @return Object 
 */
function arrayToObject(array) {
    if (array.constructor !== Array) {
        throw new Error('Param of arrayToObject must be an array')
    }
    let obj = {}
    array.forEach(function (value, index) {
        obj[index] = value
    })
    return obj
}

export { arrayToObject }

/**
 * Converts array to object
 * 
 * @param Array array
 * @return Object 
 */
function deepCopy(object) {
    return JSON.parse(JSON.stringify(object))
}

export { deepCopy }
