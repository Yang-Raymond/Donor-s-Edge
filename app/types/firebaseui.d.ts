declare module "firebaseui" {
    import { Auth } from "firebase/auth";
    
    export namespace auth {
        export class AuthUI {
            constructor(auth: Auth);
            static getInstance(): AuthUI | null;
            start(element: string | HTMLElement, config: AuthUIConfig): void;
            reset(): void;
        }

        export interface AuthUIConfig {
            signInSuccessUrl?: string;
            signInOptions: Array<string | SignInOption>;
            tosUrl?: string;
            privacyPolicyUrl?: string;
            callbacks?: {
                signInSuccessWithAuthResult?: (authResult: any) => boolean;
                signInFailure?: (error: any) => Promise<void>;
            };
        }

        export interface SignInOption {
            provider: string;
            requireDisplayName?: boolean;
            [key: string]: any;
        }
    }
}
