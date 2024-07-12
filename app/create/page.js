"use client";

import { useState } from "react";
import Header from "@/components/Header";

import supabase from "@/utils/supabase";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import {
  RegisterLink,
  LoginLink,
} from "@kinde-oss/kinde-auth-nextjs/components";

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useKindeBrowserClient } from "@kinde-oss/kinde-auth-nextjs";

const Login = () => {
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [startTime, setStartTime] = useState("");
  const [endTime, setEndTime] = useState("");
  const [profile, setProfile] = useState('')

  const { user } = useKindeBrowserClient();


  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!name || !price || !startTime || !endTime || !profile) {
      alert("Fill all fields before submiting")
      return;
    }
    const { data, error } = await supabase.from("services").insert({
      name, price, starttime: startTime, endtime: endTime, created_by: user.id, profile
    });

    if (error) {
      console.error(error);
    }

      alert("Service created successfully")
      console.log(data);
  };

  return (
    <div>
      <Header />
      <div className="mt-12">
        <h1 className="text-center text-lg mb-2 capitalize">Hi, {user?.given_name}</h1>
        <Card className="max-w-lg w-full rounded-lg mx-auto">
          <CardHeader>
            <CardTitle>Create a service</CardTitle>
            <CardDescription>
              Define a name, price and available hours
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form className="flex flex-col gap-2">
              <div className="grid w-full max-w-lg items-center gap-1.5">
                <Label htmlFor="name">Name</Label>
                <Input
                  type="name"
                  id="name"
                  value={name}
                  required
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Health Checkup"
                  className="placeholder:text-gray-400"
                />
 <Label className=" font-normal" htmlFor="profile">Profile</Label>
                   <Input
                    type="text"
                    value={profile}
                    required
                    onChange={(e) => setProfile(e.target.value)}
                    id="endttime"
                    placeholder="Doctor"
                    className="placeholder:text-gray-400"
                  />
                  <Label className="mt-2" htmlFor="Price">Price per hour (INR)</Label>
                <Input
                  type="number"
                  value={price}
                  required
                  onChange={(e) => setPrice(e.target.value)}
                  id="Price"
                  placeholder="20"
                  className="placeholder:text-gray-400"
                />
                  <Label className="mt-2" htmlFor="Price">Available hours</Label>
                <div className=" ">
                  <Label className="text-xs font-normal" htmlFor="Price">Start time</Label>
                  <Input
                    type="time"
                    value={startTime}
                    required
                    onChange={(e) => setStartTime(e.target.value)}
                    id="starttime"
                    placeholder="20"
                    className="placeholder:text-gray-400"
                  />
                  <Label className="text-xs font-normal" htmlFor="endtime">End time</Label>
                   <Input
                    type="time"
                    value={endTime}
                    required
                    onChange={(e) => setEndTime(e.target.value)}
                    id="endttime"
                    placeholder="20"
                    className="placeholder:text-gray-400"
                  />
                 
                </div>
              </div>
            </form>
          </CardContent>
          <CardFooter className="flex items-center gap-2">
            <button onClick={handleSubmit} className="bg-blue-500 text-white p-4 py-2">
              Create service
            </button>
          </CardFooter>
        </Card>
      </div>
    </div>
  );
};

export default Login;
