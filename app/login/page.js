"use client"

import { useState } from "react";
import Header from "@/components/Header";

import { PROJECT_NAME } from "@/utils/globals";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import {RegisterLink, LoginLink} from "@kinde-oss/kinde-auth-nextjs/components";
  

import { Input } from "@/components/ui/input";

const Login = () => {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")


  return (
    <div>
      <Header />
      <div className="mt-12">
        <Card className="max-w-lg w-full rounded-lg mx-auto">
          <CardHeader>
            <CardTitle>Login to {PROJECT_NAME}</CardTitle>
            <CardDescription>Login with email</CardDescription>
          </CardHeader>
          <CardContent>
            <form className="flex flex-col gap-2">
              <Input value={email} onChange={(e) => setEmail(e.target.value)} type="email" placeholder="someone@gmail.com" />
              <Input value={password} onChange={(e) => setPassword(e.target.value)} type="password" placeholder="********" /> 
            </form>
          </CardContent>
          <CardFooter className="flex items-center gap-2">
          <LoginLink>Sign in</LoginLink>

          <RegisterLink>Sign up</RegisterLink>

          </CardFooter>
        </Card>
      </div>
    </div>
  );
};

export default Login;
