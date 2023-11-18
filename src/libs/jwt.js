import { TOKEN_SECRET } from "../config.js";
import jwt from 'jsonwebtoken'; // Asegúrate de importar la biblioteca 'jsonwebtoken'

export function createAccessToken(payload) {
  return new Promise((resolve, reject) => { // Corrección: Debes usar paréntesis para definir los parámetros de la función.
    jwt.sign(
      payload,
      TOKEN_SECRET, // Usando la variable TOKEN_SECRET en lugar de una cadena estática "secret123"
      {
        expiresIn: "1d"
      },
      (err, token) => {
        if (err) {
          reject(err);
        } else {
          resolve(token);
        }
      }
    );
  });
}