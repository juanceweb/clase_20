import minimist from "minimist";

const options = {
    alias: {
        P: "PORT",
        M: "DEV"
    },
    default: {
        PORT: 8080,
        MODE: "DEV"
    }
}

const arg = minimist(process.argv.slice(2), options)

export default arg