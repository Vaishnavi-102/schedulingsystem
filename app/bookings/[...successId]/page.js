"use client";
import { useEffect, useState } from "react";
import Header from "@/components/Header";
import supabase from "@/utils/supabase";
import { LoadingOverlay } from "@mantine/core";
import { useRouter } from "next/navigation";

export default function Home({ params }) {
  console.log("params", params);

  const [once, setOnce] = useState(true);

  const paramId = params.successId;
  const id = paramId[0];
  const from_time = paramId[1];
  const to_time = paramId[2];
  const userId = paramId[3];
  const price = paramId[4];

  const decodedFromTime = decodeURIComponent(from_time);
  const decodedToTime = decodeURIComponent(to_time);

  console.log(
    "decodedFromTime",
    decodedFromTime,
    "decodedToTime",
    decodedToTime
  );

  const router = useRouter();

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!once) return;
    const createBooking = async () => {
      const { data, error } = await supabase.from("bookings").insert([
        {
          service_id: id,
          from_time: decodedFromTime,
          to_time: decodedToTime,
          booked_by: userId,
          total: price,
        },
      ]);
      if (data) {
        console.log("booking created");
      }
      if (error) {
        console.error(error);
      }
      setOnce(false);
    };
    createBooking();
    setLoading(false);
    window.location.href = "/bookings";
  }, [decodedFromTime, id, price, decodedToTime, userId, router, once]);
  // console.log("successId", successId);
  return (
    <>
      <Header />
      <LoadingOverlay
        visible={loading}
        zIndex={1000}
        overlayProps={{ radius: "sm", blur: 2 }}
      />
      {/* hey {successId} */}
    </>
  );
}
