import {Command, Option} from "commander"

let programa=new Command()

programa.option("-p, --port <PORT>", "Puerdo donde escuchara el servidor", 8080)
programa.option("-c, --color <COLOR>", "Ingresa un color")
programa.option("-d, --debug", "Activa modo debug")
programa.option("-C, --colores [COLORES...]", "Ingresa un arreglo de colores")
programa.requiredOption("-u, --user <USER>", "Usuario que ejecuta el script")
programa.addOption(new Option("-m, --mode <MODE>", "Mode de ejecución del script").choices(["production", "developer", "testing"]).default("developer"))

programa.parse()
const opts=programa.opts()

console.log(opts)
console.log(opts.color)
