"use client";
import { useState, useEffect } from "react";
import supabase from "@/utils/supabase";
import Header from "@/components/Header";
import { useKindeBrowserClient } from "@kinde-oss/kinde-auth-nextjs";

const UserPage = () => {
  const { user } = useKindeBrowserClient();
  const [bookings, setBookings] = useState([]);

  useEffect(() => {
    async function fetchServices() {
      const { data, error } = await supabase
        .from("bookings")
        .select(`
            *,
            services (
              name
            )
          `)
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
      <div className="mt-12 flex flex-col items-center gap-4 mx-auto max-w-lg justify-center">
        {user && (
          <p className="font-bold">
            Hello {user?.given_name} {user?.family_name}
          </p>
        )}
        <h1 className="font-bold -mb-4 mt-2">Bookings made by you:</h1>
        <div className="flex gap-2">
        {bookings?.map((booking) => (
          <div key={booking.id} className="border p-4">
            <p className="capitalize font-bold">{booking.name}</p>
            <p className="font-bold text-xl">{booking.services.name}</p>
            <p>Total Price: Rs.{booking.total}</p>
          </div>
        ))} 
        </div>
        
      </div>
    </>
  );
};

export default UserPage;
