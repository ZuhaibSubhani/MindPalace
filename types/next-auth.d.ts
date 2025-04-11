import NextAuth from "next-auth";

declare module "next-auth" {
  interface Session {
    user: {
      id: string;
      name?: string | null;
      email?: string | null;
      image?: string | null;
    };
  }
}
declare global {
    interface Window {
      twttr?: {
        widgets: {
          load: () => void;
        };
      };
    }
  }