import Alert from "./alert";
import Footer from "./footer";
import Meta from "./meta";
import Head from "next/head";
import Navbar from "./navbar";

export default function Layout({ preview, children }) {
  return (
    <>
      <Meta />

      <div className="pt-20">
        <Navbar />
        <main>{children}</main>
      </div>
      <Footer />
    </>
  );
}
