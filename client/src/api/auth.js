/*import axios from "axios";

const API = "http//localhost:4000/api"
const registerRequest = axios.post("")

export const registerRequest = user => axios.post(`${API}/register`,user)
*/

import axios from "axios";

const API = "http://localhost:4000/api";

// Esta línea no es necesaria y puede eliminarse
// const registerRequest = axios.post("");

// Aquí deberías definir tu función de solicitud de registro
export const registerRequest = user => axios.post(`${API}/register`, user);


export const loginRequest = user => axios.post(`${API}/login`,user);