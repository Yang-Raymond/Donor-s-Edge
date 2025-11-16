declare module "firebaseui" {
    import { Auth } from "firebase/auth";
    
    export namespace auth {
        /**
         * AuthUI class
         * 
         * Main class for initializing and controlling the FirebaseUI authentication widget.
         */
        export class AuthUI {
            /**
             * Constructs a new AuthUI instance with the given Firebase Auth object.
             * @param auth - The Firebase Auth instance to use.
             */
            constructor(auth: Auth);

            /**
             * Returns the singleton instance of AuthUI, or null if not initialized.
             */
            static getInstance(): AuthUI | null;

            /**
             * Starts the FirebaseUI widget in the specified DOM element with the given configuration.
             * @param element - The DOM element or selector to render the widget in.
             * @param config - The configuration object for FirebaseUI.
             */
            start(element: string | HTMLElement, config: AuthUIConfig): void;

            /**
             * Resets the FirebaseUI widget state.
             */
            reset(): void;
        }

        /**
         * AuthUIConfig interface
         * 
         * Configuration options for the FirebaseUI widget.
         */
        export interface AuthUIConfig {
            /** URL to redirect to after successful sign-in. */
            signInSuccessUrl?: string;
            /** List of sign-in providers or provider configurations. */
            signInOptions: Array<string | SignInOption>;
            /** Terms of Service URL. */
            tosUrl?: string;
            /** Privacy Policy URL. */
            privacyPolicyUrl?: string;
            /** Callback functions for sign-in events. */
            callbacks?: {
                /**
                 * Called when sign-in succeeds.
                 * @param authResult - The result of the authentication.
                 * @returns Whether to automatically redirect.
                 */
                signInSuccessWithAuthResult?: (authResult: any) => boolean;
                /**
                 * Called when sign-in fails.
                 * @param error - The error encountered.
                 * @returns A promise that resolves when handling is complete.
                 */
                signInFailure?: (error: any) => Promise<void>;
            };
        }

        /**
         * SignInOption interface
         * 
         * Configuration for individual sign-in providers.
         */
        export interface SignInOption {
            /** The provider ID (e.g., "google.com", "facebook.com"). */
            provider: string;
            /** Whether to require a display name for the user. */
            requireDisplayName?: boolean;
            /** Additional provider-specific options. */
            [key: string]: any;
        }
    }
}
