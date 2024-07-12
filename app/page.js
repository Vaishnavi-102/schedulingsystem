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
  return (
    <>
      <Header />
    </>
  )
}
