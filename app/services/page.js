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
import { format, parseISO, set } from "date-fns";

import { useDisclosure } from "@mantine/hooks";
import { LoadingOverlay, Button, Group, Box } from "@mantine/core";

export default function Home() {
  const { user } = useKindeBrowserClient();
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(true);

  const deleteService = async (id) => {
    alert("your service will be delete");
    setLoading(true);
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
    setLoading(false);
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
    setLoading(false);
  }, [user?.id, user]);

  console.log(user);
  if (user) {
    return (
      <>
        <LoadingOverlay
          visible={loading}
          zIndex={1000}
          overlayProps={{ radius: "sm", blur: 2 }}
        />
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
          <h1 className="font-bold mt-2">Services created by you:</h1>
          {services.length == 0 && (
            <>
              <p className="mt-4">You have no services.</p>
              <Link className="text-blue-500 underline" href={"/create"}>
                Create a service
              </Link>{" "}
              to see it here.
            </>
          )}
          {services.map((service) => {
            const timeString = service.starttime;
            const endTimeString = service.endtime;
            const [h, m] = timeString.split(":");
            const [eh, em] = endTimeString.split(":");
            const endFormattedTime = format(
              new Date(0, 0, 0, eh, em),
              "hh:mm a"
            );
            const formattedTime = format(new Date(0, 0, 0, h, m), "hh:mm a");
            return (
              <div
                key={service.id}
                className="border shadow mt-2 rounded-lg p-4 w-full"
              >
                <p className="capitalize text-xl font-bold">{service.name}</p>
                <p>Profile: {service?.profile}</p>
                <p>Price: Rs.{service.price}/hour</p>
                <p>Available from: {formattedTime}</p>
                <p>To: {endFormattedTime}</p>
                <div className="flex justify-end">
                  <button
                    className="bg-red-500 rounded-md text-white px-2 py-0"
                    onClick={() => {
                      deleteService(service.id);
                    }}
                  >
                    Delete
                  </button>
                </div>
              </div>
            );
          })}
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
