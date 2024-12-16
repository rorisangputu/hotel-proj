import { useForm } from "react-hook-form";

type RegisterFormData = {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  confirmPassword: string;
};

const Register = () => {
  const { register } = useForm<RegisterFormData>();
  return (
    <div>
      <form className="flex flex-col gap-5">
        <h2 className="text-3xl font-bold">Create an account</h2>
        <div className="flex flex-col md:flex-row gap-5">
          <label htmlFor="" className="text-gray-700 text-sm font-bold flex-1">
            First Name
            <input
              type="text"
              id=""
              className="border rounded w-full py-2 px-2 mt-3 font-normal"
              {...register("firstName", { required: "This field is required" })}
            />
          </label>
          <label htmlFor="" className="text-gray-700 text-sm font-bold flex-1">
            Last Name
            <input
              type="text"
              id=""
              className="border rounded w-full py-2 px-2 mt-3 font-normal"
              {...register("lastName", { required: "This field is required" })}
            />
          </label>
        </div>
        <label htmlFor="" className="text-gray-700 text-sm font-bold flex-1">
          Email
          <input
            type="email"
            id=""
            className="border rounded w-full py-2 px-2 mt-3 font-normal"
            {...register("email", { required: "This field is required" })}
          />
        </label>
        <label htmlFor="" className="text-gray-700 text-sm font-bold flex-1">
          Password
          <input
            type="password"
            id=""
            className="border rounded w-full py-2 px-2 mt-3 font-normal"
            {...register("password", { required: "This field is required" })}
          />
        </label>
        <label htmlFor="" className="text-gray-700 text-sm font-bold flex-1">
          Confirm Password
          <input
            type="password"
            id=""
            className="border rounded w-full py-2 px-2 mt-3 font-normal"
            {...register("confirmPassword", {
              required: "This field is required",
            })}
          />
        </label>
      </form>
    </div>
  );
};

export default Register;
