let config = {
    locales: [],
    locale: 'en',
    onFormFail(response) {
        
    },
    onFormFailValidation(response) {
        return response.data.errors
    },
    onFormSuccess(response) {
        
    }
}

export default config

export const setOptions = (options) => { config = options }
