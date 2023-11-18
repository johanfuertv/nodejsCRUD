import { useForm } from "react-hook-form";
import { useAuth } from "../context/AuthContext";
import { useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";

function RegisterPage() {
  const { register, handleSubmit, formState: { errors } } = useForm();
  const { signup, isAuthenticated, errors: registerErrors } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (isAuthenticated) navigate("/tasks");
  }, [isAuthenticated]);

  const onSubmit = handleSubmit(async (values) => {
    console.log("Form Values:", values);
    signup(values);
  });

  return (
    <div className="bg-zinc-800 max-w-md p-20 rounded-md  ">
      {/* Mostrar errores del registro */}
      {registerErrors && registerErrors.map((error, i) => (
        <div className="bg-red-100 border-l-4 border-red-500 text-red-700 px-4 py-3" key={i}>
          {error}
        </div>
      ))}

      {/* Formulario de registro */}
      <form onSubmit={handleSubmit(onSubmit)}>
        <input
          type="text"
          {...register("username", { required: true })}
          className="w-full bg-zinc-700 text-white px-4 py-2 rounded-md my-5"
          placeholder="Username"
        />
        {errors.username && (
          <p className="text-red-500 text-xs italic">Username is required</p>
        )}

        <input
          type="email"
          {...register("email", { required: true })}
          className="w-full bg-zinc-700 text-white px-4 py-2 rounded-md my-5"
          placeholder="Email Address"
        />
        {errors.email && (
          <p className="text-red-500 text-xs italic">Email is required</p>
        )}

        <input
          type="password"
          {...register("password", { required: true })}
          className="w-full bg-zinc-700 text-white px-4 py-2 rounded-md my-5"
          placeholder="Password"
        />
        {errors.password && (
          <p className="text-red-500 text-xs italic">Password is required</p>
        )}

        <button className="text-blue-500" type="submit">Register</button>
      </form>

      <p className="text-white">
        Already have an account? <Link to="/login" className="text-red-500">Login</Link>
      </p>
    </div>
  );
}

export default RegisterPage;