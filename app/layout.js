import "primereact/resources/themes/lara-light-cyan/theme.css";
import { Inter } from "next/font/google";
import '@mantine/core/styles.css';
import "./globals.css";


import { ColorSchemeScript, MantineProvider } from '@mantine/core';


const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head><ColorSchemeScript /></head>
      <body className={inter.className}><MantineProvider>{children}</MantineProvider></body>
    </html>
  );
}
