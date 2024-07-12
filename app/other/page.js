'use client'
import { useState, useEffect} from 'react'
import { Header } from '@/components/Header'
import supabase from '@/utils/supabase'


const page = () => {

  const [anythingg, anything] = useState([])
  const [booking, setBooking] = useState([])

  
  useEffect(() => { 
   const getData = async() => {
  const  {data, error} = await supabase.from("bookings").select('*');

  if (data) {
    setBooking(data)
  }
  if (error) {
    alert("Error")
  }

}
  getData()
  }, [])



  return (
    <div >
      <Header />
      <h1 className="text-4xl">{anythingg}</h1>
      <button className="border-4 p-4" onClick={() => anything(anythingg+1)}>Increment</button>
      {booking.map((booking) => {
        return (
          <div>
              <h1>{booking.total}</h1>
            </div>
        )
      }) }
    </div>
  )
}

export default page
