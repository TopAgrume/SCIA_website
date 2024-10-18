"use client";

import { Jersey_25 } from "next/font/google";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState, useEffect } from "react";
import { useMsal } from "@azure/msal-react";
import WeeklyCalendar from "@/app/home/WeeklyCalendar";
import { InteractionRequiredAuthError } from "@azure/msal-browser";

const jersey = Jersey_25({
  weight: ["400"],
  subsets: ["latin"],
});

export default function NavigationBar() {
  const pathname = usePathname();
  const { instance } = useMsal();
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [username, setUsername] = useState("");
  const [authToken, setAuthToken] = useState("");

  useEffect(() => {
    const accounts = instance.getAllAccounts();
    setIsAuthenticated(accounts.length > 0);
    if (accounts.length > 0) {
      setUsername(accounts[0].name || accounts[0].username);
      acquireToken();
    }
  }, [instance]);

  const handleLogin = async () => {
    try {
      await instance.loginPopup({
        scopes: ["user.read"],
        prompt: "select_account",
      });
      const accounts = instance.getAllAccounts();
      setIsAuthenticated(accounts.length > 0);
      if (accounts.length > 0) {
        setUsername(accounts[0].name || accounts[0].username);
        acquireToken();
      }
    } catch (error) {
      console.error("Login failed", error);
    }
  };

  const acquireToken = async () => {
    try {
      const request = {
        scopes: ["user.read"],
        account: instance.getAllAccounts()[0],
      };

      const response = await instance.acquireTokenSilent(request);
      setAuthToken(response.accessToken);
    } catch (error) {
      if (error instanceof InteractionRequiredAuthError) {
        try {
          const response = await instance.acquireTokenPopup({
            scopes: ["user.read"],
          });
          setAuthToken(response.accessToken);
        } catch (tokenError) {
          console.error("Token acquisition failed", tokenError);
        }
      } else {
        console.error("Token acquisition failed", error);
      }
    }
  };

  const handleLogout = () => {
    instance.logoutPopup();
    setIsAuthenticated(false);
    setUsername("");
    setAuthToken("");
  };

  const handleAuthAction = () => {
    if (isAuthenticated) {
      handleLogout();
      console.log("Logging out");
    } else {
      handleLogin();
      console.log("Logging in");
    }
  };

  const buttonClasses =
      "mt-auto mb-auto ml-2 mr-2 w-32 h-8 border flex justify-center items-center rounded-sm transition-all duration-300 bg-taskbar_button hover:bg-taskbar_button_hover";

  const getButtonWidth = () => {
    const minWidth = 224; // 14rem or 56 in tailwind
    const textWidth = isAuthenticated ? username.length * 10 : 160;
    return Math.max(minWidth, textWidth);
  };

  return (
    <>
      <div className="sticky top-0 z-50">
        <div className={`w-full h-10 flex ${jersey.className} bg-taskbar_main`}>
          <div className="flex m-1 ml-4">
            <Image src="/logo.png" alt="logo" width={34} height={40}/>
          </div>
          <button
              className={
                  buttonClasses +
                  ` ml-4 ${pathname === "/home" ? "border-black" : "border-taskbar_border"}`
              }
          >
            <Link href="/home">
              <span className="align-middle font-black text-navbar">Accueil</span>
            </Link>
          </button>

          <button
              className={
                  buttonClasses +
                  (pathname === "/events"
                      ? " border-black"
                      : "  border-taskbar_border")
              }
          >
            <Link href="/events">
              <span className="align-middle font-black text-navbar transform-none">
                Evenements
              </span>
            </Link>
          </button>

          <button
              className={
                  buttonClasses +
                  (pathname === "/projects"
                      ? " border-black"
                      : " border-taskbar_border")
              }
          >
            <Link href="/projects">
              <span className="align-middle font-black text-navbar">Projets</span>
            </Link>
          </button>

          <button
              className={
                  buttonClasses +
                  (pathname === "/suggestions"
                      ? " border-black"
                      : " border-taskbar_border")
              }
          >
            <Link href="/suggestions">
              <span className="align-middle font-black text-navbar">
                Suggestions
              </span>
            </Link>
          </button>

          <div className="flex ml-auto">
            <button className="rounded-full pl-1 pr-1 mt-1 mb-1 hover:bg-taskbar_button_hover duration-500">
              <Image
                  src="/moon.png"
                  alt="light/dark mode"
                  width={28}
                  height={28}
              />
            </button>

            <button
                className={`${buttonClasses} ml-4 mr-6 border-taskbar_border`}
                onClick={handleAuthAction}
                style={{width: `${getButtonWidth()}px`}}
            >
              <span className="align-middle font-black text-navbar truncate">
                {isAuthenticated ? `${username}` : "Login with Microsoft"}
              </span>
            </button>
          </div>
        </div>
        <div className="w-full h-0.5 bg-black"/>
      </div>
      <WeeklyCalendar isAuthenticated={isAuthenticated} authToken={authToken}/>
    </>
  );
}
