"use client";

import { useEffect, useRef } from "react";
import { auth } from "../server/connection_to_firebase";
import * as firebaseui from "firebaseui";
import "firebaseui/dist/firebaseui.css";

export default function Login() {
    const uiRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (uiRef.current) {
            const ui =
                firebaseui.auth.AuthUI.getInstance() ||
                new firebaseui.auth.AuthUI(auth);

            ui.start(uiRef.current, {
                signInOptions: [
                    {
                        provider: "google.com",
                        customParameters: {
                            prompt: "select_account",
                        },
                    },
                    {
                        provider: "password",
                        requireDisplayName: true,
                    },
                ],
                signInSuccessUrl: "/",
                tosUrl: "/terms",
                privacyPolicyUrl: "/privacy",
            });

            return () => {
                ui.reset();
            };
        }
    }, []);

    return <div ref={uiRef}></div>;
}