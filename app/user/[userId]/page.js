"use client";
import { useState, useEffect } from "react";
import supabase from "@/utils/supabase";
import Header from "@/components/Header";
import { useKindeBrowserClient } from "@kinde-oss/kinde-auth-nextjs";
import { format, addHours, formatISO, parseISO, isSameDay} from "date-fns";
import { useDisclosure } from "@mantine/hooks";
import { Modal } from "@mantine/core";
import { hoursArray, updateBookingStatus } from "@/utils/func";
import { TimeSlots } from "@/utils/globals";

const UserPage = ({ params }) => {

  

  const [opened, { open, close }] = useDisclosure(false);

  const userId = params.userId;
  const { user } = useKindeBrowserClient();
  const [services, setServices] = useState([]);
  const [service, setService] = useState("");
  const [date, setDate] = useState("");

  const [timeSlots, setTimeSlots] = useState(TimeSlots);



  const [bookings, setBookings] = useState([]);

  useEffect(() => {
    const getBookingByService = async (serviceId) => {
      const { data, error } = await supabase
        .from("bookings")
        .select()
        .eq("service_id", serviceId);
      if (error) {
        console.error(error);
      }
      if (data) {
        setBookings(data);
      }
    };
    getBookingByService(service.id);
  }, []);

  // updateBookingStatus(timeSlots, bookings, date, setTimeSlots)

  console.log("bookings ", bookings);

  useEffect(() => {
    async function fetchServices() {
      const { data, error } = await supabase
        .from("services")
        .select()
        .eq("created_by", userId);
      if (error) {
        console.error(error);
      }
      if (data) {
        setServices(data);
      }
    }
    fetchServices();
  }, [userId]);


  const handleBooking = async (hour) => {
    const confirmed = confirm("Are you sure you want to book this slot?");
    if (!confirmed) {
      return;
    }
    const dateTimeString = `${date} ${hour}`;
    console.log(dateTimeString);
    const parsedTime = formatISO(new Date(dateTimeString));
    const addHour = addHours(parsedTime, 1);
    const formattedNext = format(addHour, "yyyy-MM-dd HH:mm:ss");
    const nextHour = formatISO(formattedNext);

    const { data, error } = await supabase.from("bookings").insert({
      service_id: service.id,
      booked_by: user.id,
      from_time: parsedTime,
      to_time: nextHour,
      total: service.price,
    });

    if (error) {
      console.error(error);
      alert("Booking failed");
    }
    alert("Booking successful");
  };


  updateBookingStatus(hoursArray, bookings, date);

  return (
    <>
      <Header />
      {!user && (
        <h1 className="text-center text-normal bg-red-300 py-2">
          Please login to book services
        </h1>
      )}
      <div className="mt-12 flex flex-col items-center gap-4 mx-auto max-w-lg justify-center">
        {user && (
          <p className="font-bold">
            Hello {user?.given_name} {user?.family_name}
          </p>
        )}
        <h1 className="font-bold -mb-4 mt-2">Services</h1>
        <div className="flex gap-2">
          {services?.map((service) => (
            <div key={service.id} className="border p-4">
              <p className="capitalize font-bold">{service.name}</p>
              <p>Rs.{service.price}/hr</p>
              <p>from: {service.starttime}</p>
              <p>To: {service.endtime}</p>
              <button
                className="bg-blue-500 text-white px-2"
                onClick={() => {
                  open();
                  setService(service);
                }}
              >
                Book service
              </button>
            </div>
          ))}
        </div>
      </div>
      <Modal opened={opened} onClose={close} title="Select open slots">
        <div className="flex flex-col">
          <input
            className="border-2 border-black mx-2"
            type="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
          />
          {/* <button className="border bg-gray-300 px-2 mx-auto mt-2 max-w-fit">Set Date</button> */}
          {date &&
            timeSlots.map((hour) => (
              <button
                key={hour.time}
                className={`m-2 py-1 text-white ${
                  hour.bookingStatus == "free"
                    ? "bg-green-600"
                    : "bg-red-500 cursor-not-allowed"
                }`}
                onClick={() => {
                  handleBooking(hour.time);
                }}
              >
                {hour.time}
              </button>
            ))}
        </div>
      </Modal>
    </>
  );
};

export default UserPage;

// booked | free
