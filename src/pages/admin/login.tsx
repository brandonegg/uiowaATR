import { ArrowUpRightIcon } from "@heroicons/react/24/solid";
import Footer from "~/components/Footer";
import Header from "~/components/Header";
import { TopLabel } from "~/components/Labels";

const SignInForm = () => {
  return (
    <div className="mx-auto max-w-lg overflow-hidden rounded-xl border border-neutral-400 bg-neutral-200 drop-shadow">
      <TopLabel>
        <h1 className="text-md font-bold text-gray-300">Admin Login</h1>
      </TopLabel>
      <form id="admin-login">
        <div className="space-y-4 p-4">
          {/** Username section */}
          <section className="flex flex-col space-y-2">
            <label className="text-md font-semibold">Username:</label>
            <input className="rounded-md p-2" type="text" />
          </section>

          {/** Password section */}
          <section className="flex flex-col space-y-2">
            <label className="text-md font-semibold">Password:</label>
            <input className="rounded-md p-2" type="text" />
          </section>

          <div>
            <button
              type="submit"
              className="mx-auto inline-block flex w-fit flex-row rounded-md border border-neutral-900 bg-yellow-200 px-4 py-2 align-middle font-semibold shadow-md shadow-black/50 duration-200 ease-out hover:bg-yellow-300 hover:shadow-md"
            >
              sign in
              <ArrowUpRightIcon className="ml-2 inline-block w-4 align-middle" />
            </button>
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
