import { ArrowUpRightIcon } from "@heroicons/react/24/solid";
import { signIn } from "next-auth/react";
import { useCallback, useState } from "react";
import { type SubmitHandler, useForm, type FieldError } from "react-hook-form";
import Footer from "~/components/Footer";
import Header from "~/components/Header";
import { TopLabel } from "~/components/Labels";
import { type LoginInput } from "~/lib/validation/auth";

const FormFieldError = ({ error }: { error?: FieldError }) => {
  return (
    <span className="text-sm italic text-red-600">{error?.message ?? ""}</span>
  );
};

const SignInForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginInput>({});

  const [error, setError] = useState<string | undefined>(undefined);

  /**
   * Form submit handler.
   * @param data Form data.
   * @returns
   */
  const onSubmit: SubmitHandler<LoginInput> = useCallback(async (data) => {
    try {
      const res = await signIn("credentials", {
        ...data,
        redirect: false,
        callbackUrl: "/",
      });
      // error response
      if (res?.error) setError("Invalid username or password");

      // success response
      if (res?.ok) window.location.replace("/resources");
    } catch (err) {
      console.error(err);
    }
  }, []);

  return (
    <div className="mx-auto max-w-lg overflow-hidden rounded-xl border border-neutral-400 bg-neutral-200 drop-shadow">
      <TopLabel>
        <h1 className="text-md font-bold text-gray-300">Admin Login</h1>
      </TopLabel>
      <form onSubmit={handleSubmit(onSubmit)} id="admin-login">
        <div className="space-y-4 p-4">
          {/** Username section */}
          <section className="flex flex-col space-y-2">
            <label className="text-md font-semibold">Username:</label>
            <FormFieldError error={errors.username} />
            <input
              className="rounded-md border border-neutral-400 p-2"
              type="username"
              {...register("username", {
                required: "Username is required",
              })}
            />
          </section>

          {/** Password section */}
          <section className="flex flex-col space-y-2">
            <label className="text-md font-semibold">Password:</label>
            <FormFieldError error={errors.password} />
            <input
              className="rounded-md border border-neutral-400 p-2"
              type="password"
              {...register("password", {
                required: "Password is required",
              })}
            />
          </section>

          <div>
            <button
              type="submit"
              className="mx-auto inline-block flex w-fit flex-row rounded-md border border-neutral-900 bg-yellow-200 px-4 py-2 align-middle font-semibold shadow-md shadow-black/50 duration-200 ease-out hover:bg-yellow-300 hover:shadow-md"
            >
              sign in
              <ArrowUpRightIcon className="ml-2 inline-block w-4 align-middle" />
            </button>
            <span className="mt-4 block text-center font-semibold text-red-400">
              {error ? <p>{error}</p> : undefined}
            </span>
          </div>
        </div>
      </form>
    </div>
  );
};

const AdminLogin = () => {
  return (
    <>
      <Header />
      <div className="my-16">
        <SignInForm />
      </div>
      <Footer />
    </>
  );
};

export default AdminLogin;
