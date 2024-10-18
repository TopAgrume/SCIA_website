"use client";

import NavigationBar from "../components/NavigationBar";
import { MsalProvider } from "@azure/msal-react";
import { msalInstance } from "@/lib/authConfig";

export default function ClientLayout({children}:
    Readonly<{
        children: React.ReactNode;
    }>) {
    return (
        <MsalProvider instance={msalInstance}>
            <NavigationBar />
            {children}
        </MsalProvider>
    );
}