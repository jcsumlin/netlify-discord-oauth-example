const getEnvironmentVariable = (name: string) => {
    let value = process.env[name]
    if (!value) {
        throw ("missing env var for " + name);
    }
    return value;
}

export default getEnvironmentVariable;
