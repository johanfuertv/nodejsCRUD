//Middleware son funciones que se van a ejecutar antes de que lleguen a una ruta
import { TOKEN_SECRET } from "../config.js";
import jwt from "jsonwebtoken"; // Asegúrate de importar la biblioteca 'jsonwebtoken'

export const authRequired = (req, res, next) => {
  const { token } = req.cookies;

  if (!token) {
    return res.status(401).json({ msg: "No has iniciado sesion" });

    jwt.verify(token, TOKEN_SECRET, function (err, user) {
      if (err) {
        return res.status(401).json({ msg: "No has iniciado sesion" });
      }

      req.user = user;
      next();
    });
  }
};
