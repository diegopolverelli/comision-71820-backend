import fs from "fs"

console.log("pid:", process.pid)
console.log("cwd:", process.cwd())
console.log("s.o.:", process.platform)
console.log("memoryUsage", process.memoryUsage())

// console.log("variables de entorno", process.env)
console.log(process.env.PRUEBA_PORT)
console.log(process.env.PRUEBA_SECRET)

console.log("argumentos CLI", process.argv)