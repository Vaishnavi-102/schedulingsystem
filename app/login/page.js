import Header from "@/components/Header";
import supabase from "@/utils/supabase";
import { Auth } from "@supabase/auth-ui-react";

import { PROJECT_NAME } from "@/utils/globals";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import { Input } from "@/components/ui/input";

const Login = () => {
  console.log(supabase);
  return (
    <div>
      <Header />
      <div className="">
        <Card className="max-w-lg w-full rounded-lg mx-auto">
          <CardHeader>
            <CardTitle>Login to {PROJECT_NAME}</CardTitle>
            <CardDescription>Login with email</CardDescription>
          </CardHeader>
          <CardContent>
            <form className="flex flex-col gap-2">
              <Input type="email" placeholder="someone@gmail.com" />
              <Input type="password" placeholder="********" /> 
            </form>
          </CardContent>
          <CardFooter className="flex items-center gap-2">
            <button className="p-2 bg-blue-500 text-white rounded-lg">Login</button>
            <button className="p-2 bg-blue-500 text-white rounded-md">Sign up</button>
          </CardFooter>
        </Card>
      </div>
    </div>
  );
};

export default Login;
