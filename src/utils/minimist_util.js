import minimist from "minimist";

const options = {
    alias: {
        P: "PORT",
    },
    default: {
        PORT: 8080
    }
}

const arg = minimist(process.argv.slice(2), options)

export default arg