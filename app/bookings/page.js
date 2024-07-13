"use client";
import { useState, useEffect } from "react";
import supabase from "@/utils/supabase";
import Header from "@/components/Header";
import { useKindeBrowserClient } from "@kinde-oss/kinde-auth-nextjs";
import Image from "next/image";
import { format } from "date-fns";
const UserPage = () => {
  const { user } = useKindeBrowserClient();
  const [bookings, setBookings] = useState([]);

  const cancelBooking = async (id) => {
    const userConfirmation = confirm("do you want to cancel your booking?");
    if (!userConfirmation) {
      return;
    }
    const { data, error } = await supabase
      .from("bookings")
      .delete()
      .eq("id", id)
      .select();

    const { freshData, freshError } = await supabase
      .from("bookings")
      .select(
        `
          *,
          services (
            name
          )
        `
      )
      .eq("booked_by", user?.id);
    if (freshError) {
      console.error(error);
    }
    setBookings(freshData);

    if (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    async function fetchServices() {
      const { data, error } = await supabase
        .from("bookings")
        .select(
          `
            *,
            services (
              name
            )
          `
        )
        .eq("booked_by", user?.id);
      if (error) {
        console.error(error);
      }
      if (data) {
        setBookings(data);
      }
    }
    fetchServices();
  }, [user?.id]);

  return (
    <>
      <Header />
      <div className="mt-12 flex flex-col  gap-4 mx-auto max-w-lg">
        {user && (
          <p className="font-normal self-center">
            Hi{" "}
            <span className="font-bold">
              {user?.given_name} {user?.family_name}
            </span>
          </p>
        )}
        <h1 className="font-bold text-left text-2xl -mb-4 mt-2">
          Your Bookings
        </h1>
        <div className="flex flex-col gap-2 flex-wrap w-full">
          {bookings?.length == 0 && (
            <>
              <p className="text-left ">
                Empty! Create a booking to get started!
              </p>
              <Image src="/empty.jpg" width={500} height={200} alt="empty" />
            </>
          )}
          {bookings &&
            bookings?.map((booking) => (
              <div
                key={booking.id}
                className="border shadow mt-2 rounded-lg p-4 w-full"
              >
                <p className="capitalize font-bold">{booking.name}</p>
                <p className="font-bold text-xl capitalize">
                  {booking?.services?.name}
                </p>
                <p>Price: Rs.{booking.total}</p>
                <p>{format(booking.from_time, "E, do LLL 'at' hh:mm a")}</p>
                <button
                  className=" rounded-md mt-2 px-2 hover:bg-blue-800 capitalize font-medium bg-blue-500 text-white"
                  onClick={() => {
                    cancelBooking(booking.id);
                  }}
                >
                  cancel
                </button>
              </div>
            ))}
        </div>
      </div>
    </>
  );
};

export default UserPage;
