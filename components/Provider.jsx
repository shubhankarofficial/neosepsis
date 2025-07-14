'use client';

import { SessionProvider } from "next-auth/react";

const Provider = ({ children, session }) => (
  <SessionProvider>
    {children}
  </SessionProvider>
)

export default Provider;
