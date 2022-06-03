import React, { ReactNode } from "react";
import Head from "next/head";

type Props = {
  children?: ReactNode;
  title?: string;
};

const Layout = ({ children, title = "ERC20 Wallet" }: Props) => (
  <>
    <div className="flex items-center justify-center mt-10">
      <Head>
        <title>{title}</title>
        <meta charSet="utf-8" />
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      </Head>
      <header />
      {children}
      <footer />
    </div>
  </>
);

export default Layout;
