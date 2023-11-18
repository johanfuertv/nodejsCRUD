import app from "./app.js";
import {connectDB} from "./db.js";


connectDB() //Llama a la función para establecer la conexión a la base de datos
app.listen(4000)
console.log("Server on port",4000)