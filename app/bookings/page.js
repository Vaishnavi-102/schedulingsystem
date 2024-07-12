"use client";
import { useState, useEffect } from "react";
import supabase from "@/utils/supabase";
import Header from "@/components/Header";
import { useKindeBrowserClient } from "@kinde-oss/kinde-auth-nextjs";
import { Button } from "@mantine/core";
import { format } from "date-fns";
const UserPage = () => {
  const { user } = useKindeBrowserClient();
  const [bookings, setBookings] = useState([]);

  const cancelBooking = async (id) => {
    confirm("do you want to cancel your booking?");
    const { data, error } = await supabase
      .from("bookings")
      .delete()
      .eq("id", id)
      .select();

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
  }, [user]);

  return (
    <>
      <Header />
      <div className="mt-12 flex flex-col items-center gap-4 mx-auto max-w-2xl justify-center">
        {user && (
          <p className="font-bold">
            Hello {user?.given_name} {user?.family_name}
          </p>
        )}
        <h1 className="font-bold text-left -mb-4 mt-2">Your Bookings</h1>
        <div className="flex flex-col gap-2 flex-wrap">
          {bookings &&
            bookings?.map((booking) => (
              <div key={booking.id} className="border p-4 w-full">
                <p className="capitalize font-bold">{booking.name}</p>
                <p className="font-bold text-xl">{booking?.services?.name}</p>
                <p>Price: Rs.{booking.total}</p>
                <p>
                  {format(booking.from_time, "E, do LLL 'at' hh:mm a")}
                </p>
                <button
                className="px-1 bg-blue-500 text-white"
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
