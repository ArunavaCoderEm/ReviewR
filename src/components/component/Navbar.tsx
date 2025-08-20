"use server"

import { checkUserNeon } from "@/hooks/checkUser";
import { NavbarClient } from "./NavbarClient";

export default async function Navbar() {
  const user = await checkUserNeon();
  return <NavbarClient />;
}
