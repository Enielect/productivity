import { signIn, signOut } from "@/auth";
import { getAuthenticatedUserId } from "@/server/db/queries/insert";
import Image from "next/image";
import React from "react";

const LoginForm = async () => {
  const userId = await getAuthenticatedUserId()

  return (
    <form
      action={async () => {
        "use server";
        if (!!userId) await signOut();
        else await signIn("google", { redirectTo: "/dashboard" });
      }}
      className="flex items-center justify-center"
    >
      <div className="flex h-screen w-full flex-col items-center justify-center gap-4">
        <div className="">
          <Image src="/productivity.png" alt="logo" width={100} height={100} />
        </div>
        <h2 className="text-3xl">
          {userId
            ? "Are you sure you want to Log Out??"
            : "Ready to Get Started??"}
        </h2>
        <h3 className="">
          {userId
            ? "You can always come bak and login easily using your google account without any hassle"
            : "Signup today with your google account to get started"}
        </h3>
        <div>
          {!userId ? (
            <button
              className="flex items-center gap-3 rounded-md border bg-[#ea5489] px-3 py-1 text-white"
              type="submit"
            >
              <GoogleIcon />
              <span>Sign in with google </span>
            </button>
          ) : (
            <button className="flex items-center gap-3 rounded-md border bg-red-600 px-3 py-1 text-white">
              Log Out
            </button>
          )}
        </div>
      </div>
    </form>
  );
};

function GoogleIcon() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      style={{ fill: "white" }}
    >
      <path d="M20.283 10.356h-8.327v3.451h4.792c-.446 2.193-2.313 3.453-4.792 3.453a5.27 5.27 0 0 1-5.279-5.28 5.27 5.27 0 0 1 5.279-5.279c1.259 0 2.397.447 3.29 1.178l2.6-2.599c-1.584-1.381-3.615-2.233-5.89-2.233a8.908 8.908 0 0 0-8.934 8.934 8.907 8.907 0 0 0 8.934 8.934c4.467 0 8.529-3.249 8.529-8.934 0-.528-.081-1.097-.202-1.625z"></path>
    </svg>
  );
}

export default LoginForm;
// const { data: session, status } = useSession()
