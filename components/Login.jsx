import { signIn } from "next-auth/client";

export default function Login() {
  return (
    <div className="flex justify-center items-center">
      <button onClick={signIn}>Sign In</button>
    </div>
  );
}
