import { useForm } from "react-hook-form";
import { useAuth } from "../context/AuthContext";
import { Link } from "react-router-dom";

function LoginPage() {
  // Obtener funciones y datos necesarios del hook useForm
  const { register, handleSubmit, formState: { errors } } = useForm();
  
  // Obtener funciones y datos necesarios del hook useAuth
  const { signin, errors: signinErrors } = useAuth();

  // Función que se ejecuta al enviar el formulario
  const onSubmit = handleSubmit(async (data) => {
    signin(data);
  });

  return (
    <div className="flex h-screen items-center justify-center">
      {/* Mostrar errores del inicio de sesión */}
      {signinErrors.map((error, i) => (
        <div className="bg-zinc-800 max-w-md w-full p-10 rounded-md" key={i}>
          {error}
        </div>
      ))}
      
      <div className="max-w-md w-full p-10 rounded-md text-white-500">
        <h1 className="text-2xl font-bold mb-5">Login</h1>
        
        {/* Formulario de inicio de sesión */}
        <form onSubmit={onSubmit}>
          <input
            type="email"
            {...register("email", { required: true })}
            className="w-full bg-zinc-700 text-white px-4 py-2 rounded-md my-3"
            placeholder="Email Address"
          />
          {errors.email && (
            <p className="text-red-500 text-xs italic">Email is required</p>
          )}

          <input
            type="password"
            {...register("password", { required: true })}
            className="w-full bg-zinc-700 text-white px-4 py-2 rounded-md my-3"
            placeholder="Password"
          />
          {errors.password && (
            <p className="text-red-500 text-xs italic">Password is required</p>
          )}

          <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded-md">
            Login
          </button>
        </form>

        {/* Enlace para registrarse */}
        <p className="mt-3">
          Dont have an account? <Link to="/register" className="text-blue-500">Sign up</Link>
        </p>
      </div>
    </div>
  );
}

export default LoginPage;