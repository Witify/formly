export default  {
    state: {
        locale: undefined,
        mutated: false
    },
    setLocale (locale) {
        this.state.locale = locale
    },
    setMutated (mutated) {
        this.state.mutated = mutated
    }
}
