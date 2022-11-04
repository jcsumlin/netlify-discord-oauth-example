const getEnvironmentVariable = (name) => {
    let value = process.env[name]
    if (!value) {
        throw ("missing env var for " + name);
    }
    return value;
}
const fs = require('fs')
const CONFIG_FILE = './functions/config.json'

const url = getEnvironmentVariable("URL")

let rawdata = fs.readFileSync(CONFIG_FILE);
let config_data = JSON.parse(rawdata);
config_data["url"] = url
console.log("==========START CONFIG DATA==========")
console.log(config_data)
console.log("===========END CONFIG DATA===========")
let string_data = JSON.stringify(config_data);
fs.writeFileSync(CONFIG_FILE, string_data);
