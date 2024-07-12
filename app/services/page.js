"use client";
import { useState, useEffect } from "react";
import Header from "@/components/Header";
import { useKindeBrowserClient } from "@kinde-oss/kinde-auth-nextjs";
import supabase from "@/utils/supabase";
import {
  RegisterLink,
  LoginLink,
} from "@kinde-oss/kinde-auth-nextjs/components";
import Link from "next/link";

export default function Home() {
  const { user } = useKindeBrowserClient();
  const [services, setServices] = useState([]);

  const deleteService = async (id) => {
    alert("your service will be delete");
    const { data, error } = await supabase
      .from("services")
      .delete()
      .eq("id", id)
      .select();

    const { data: newData, error: newError } = await supabase
      .from("services")
      .select()
      .eq("created_by", user.id);

    if (!newError) {
      setServices(newData);
    }

    if (error) {
      alert("deleting failed because: ", error.message);
    }
  };

  useEffect(() => {
    if (!user) return;
    async function fetchServices() {
      const { data, error } = await supabase
        .from("services")
        .select()
        .eq("created_by", user.id);
      if (error) {
        console.error(error);
      }
      if (data) {
        console.log(data);
        setServices(data);
      }
    }

    fetchServices();
  }, [user?.id]);

  console.log(user);
  if (user) {
    return (
      <>
        <Header />
        <div className="mt-12 flex flex-col items-center gap-4 mx-auto max-w-lg justify-center">
          <p className="font-bold">
            Hello {user.given_name} {user.family_name}
          </p>
          <p>
            Your link:{" "}
            <a
              className="text-blue-400 underline"
              href={`http://localhost:3000/user/${user.id}`}
            >
              Click Me to view Services and Book
            </a>
          </p>
        </div>
        <div className="max-w-lg mx-auto ">
          <h1 className="font-bold -mb-4 mt-2">Services created by you:</h1>
          {services.length == 0 && (
            <>
              <p className="mt-4">You have no services.</p>
              <Link className="text-blue-500 underline" href={"/create"}>Create a service</Link> to see it here.
            </>
          )}
          {services.map((service) => (
            <div key={service.id} className="border p-4 mt-4">
              <p className="capitalize">Name: {service.name}</p>
              <p>Price: Rs.{service.price}</p>
              <p>Available from: {service.starttime}</p>
              <p>To: {service.endtime}</p>
              <p>Profile: {service?.profile}</p>
              <button
                className="bg-red-500 text-white px-2 py-0"
                onClick={() => {
                  deleteService(service.id);
                }}
              >
                Delete
              </button>
            </div>
          ))}
        </div>
      </>
    );
  }

  return (
    <>
      <Header />
      <h1 className="text-center text-lg mt-12">Welcome</h1>
      <p className="text-center text-md">
        To continue, login or sign up to get started!
      </p>
      <div className="max-w-md  flex gap-2 justify-center mt-4 mx-auto">
        <LoginLink className="border p-2 bg-blue-500 text-white">
          Sign in
        </LoginLink>
        <RegisterLink className="border p-2">Sign up</RegisterLink>
      </div>
    </>
  );
}
