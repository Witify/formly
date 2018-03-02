let config = {
    locales: [],
    locale: 'en',
    onFormFail(response) {
        if (response && response.data && response.data.message) {
            alert(response.data.message)
        } else {
            alert("Whoops! An error has occured!")
        }
    },
    onFormSuccess(response) {
        
    }
}

export default config

export const setOptions = (options) => { config = options }
