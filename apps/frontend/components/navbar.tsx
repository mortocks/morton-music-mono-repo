import Link from "next/link";
import dynamic from "next/dynamic";
import { RiAccountCircleLine } from "react-icons/ri";
import Image from "next/image";
import Logo from "../assets/img/logo.png";
import ListenButton from "./listenButton";
const DynamicCartLink = dynamic(() => import("./cartLink"), {
  ssr: false,
});

const Navbar = () => (
  <nav className="bg-white border-gray-200 dark:border-gray-600 dark:bg-gray-900 fixed top-0 left-0 w-full z-10">
    <div className="flex flex-wrap justify-between items-center mx-auto max-w-screen-xl p-4 py-4">
      <Link href="/" className="flex items-center">
        <Image
          width={200}
          height={120}
          src={Logo}
          className="mr-3"
          alt="Morton Music Logo"
        />
      </Link>
      <button
        data-collapse-toggle="mega-menu-full"
        type="button"
        className="inline-flex items-center p-2 ml-1 text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
        aria-controls="mega-menu-full"
        aria-expanded="false"
      >
        <span className="sr-only">Open main menu</span>
        <svg
          className="w-6 h-6"
          aria-hidden="true"
          fill="currentColor"
          viewBox="0 0 20 20"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            fillRule="evenodd"
            d="M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 15a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z"
            clipRule="evenodd"
          ></path>
        </svg>
      </button>
      <div
        id="mega-menu-full"
        className="items-center justify-between font-medium hidden w-full md:flex md:w-auto md:order-1"
      >
        <ul className="flex flex-col p-4 md:p-0 mt-4 border border-gray-100 rounded-lg bg-gray-50 md:flex-row md:space-x-8 md:mt-0 md:border-0 md:bg-white dark:bg-gray-800 md:dark:bg-gray-900 dark:border-gray-700">
          {/* <li>
                    <button id="mega-menu-full-dropdown-button" data-collapse-toggle="mega-menu-full-dropdown" className="flex items-center justify-between w-full py-2 pl-3 pr-4  text-gray-900 rounded md:w-auto hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-orange-600 md:p-0 dark:text-white md:dark:hover:text-orange-500 dark:hover:bg-gray-700 dark:hover:text-orange-500 md:dark:hover:bg-transparent dark:border-gray-700">Company <svg className="w-5 h-5 ml-1" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd"></path></svg></button>
                </li> */}
          <li>
            <ListenButton />
          </li>
          <li>
            <Link
              href="/catalogue"
              className="block py-2 pl-3 pr-4 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-orange-700 md:p-0 dark:text-white md:dark:hover:text-orange-500 dark:hover:bg-orange-700 dark:hover:text-orange-500 md:dark:hover:bg-transparent dark:border-gray-700"
            >
              Catalogue
            </Link>
          </li>
          <li>
            <Link
              href="/composers"
              className="block py-2 pl-3 pr-4 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-orange-700 md:p-0 dark:text-white md:dark:hover:text-orange-500 dark:hover:bg-gray-700 dark:hover:text-orange-500 md:dark:hover:bg-transparent dark:border-gray-700"
            >
              Composers
            </Link>
          </li>
          <li>
            <Link
              href="about-us"
              className="block py-2 pl-3 pr-4 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-orange-700 md:p-0 dark:text-white md:dark:hover:text-orange-500 dark:hover:bg-gray-700 dark:hover:text-orange-500 md:dark:hover:bg-transparent dark:border-gray-700"
            >
              About Us
            </Link>
          </li>
          <li>
            <Link
              href="contact-us"
              className="block py-2 pl-3 pr-4 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-orange-700 md:p-0 dark:text-white md:dark:hover:text-orange-500 dark:hover:bg-gray-700 dark:hover:text-orange-500 md:dark:hover:bg-transparent dark:border-gray-700"
            >
              Contact Us
            </Link>
          </li>
          <li>
            <DynamicCartLink />
          </li>
          <li>
            <button className="snipcart-customer-signin block py-2 pl-3 pr-4 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-orange-700 md:p-0 dark:text-white md:dark:hover:text-orange-500 dark:hover:bg-gray-700 dark:hover:text-orange-500 md:dark:hover:bg-transparent dark:border-gray-700">
              <RiAccountCircleLine size={24} />
            </button>
          </li>
        </ul>
      </div>
    </div>
    <div
      id="mega-menu-full-dropdown"
      className="hidden mt-1 border-gray-200 shadow-sm bg-gray-50 md:bg-white border-y dark:bg-gray-800 dark:border-gray-600"
    >
      <div className="grid max-w-screen-xl px-4 py-5 mx-auto text-gray-900 dark:text-white sm:grid-cols-2 md:px-6">
        <ul>
          <li>
            <a
              href="#"
              className="block p-3 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700"
            >
              <div className="font-semibold">Online Stores</div>
              <span className="text-sm text-gray-500 dark:text-gray-400">
                Connect with third-party tools that you're already using.
              </span>
            </a>
          </li>
          <li>
            <a
              href="#"
              className="block p-3 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700"
            >
              <div className="font-semibold">Segmentation</div>
              <span className="text-sm text-gray-500 dark:text-gray-400">
                Connect with third-party tools that you're already using.
              </span>
            </a>
          </li>
          <li>
            <a
              href="#"
              className="block p-3 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700"
            >
              <div className="font-semibold">Marketing CRM</div>
              <span className="text-sm text-gray-500 dark:text-gray-400">
                Connect with third-party tools that you're already using.
              </span>
            </a>
          </li>
        </ul>
        <ul>
          <li>
            <a
              href="#"
              className="block p-3 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700"
            >
              <div className="font-semibold">Online Stores</div>
              <span className="text-sm text-gray-500 dark:text-gray-400">
                Connect with third-party tools that you're already using.
              </span>
            </a>
          </li>
          <li>
            <a
              href="#"
              className="block p-3 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700"
            >
              <div className="font-semibold">Segmentation</div>
              <span className="text-sm text-gray-500 dark:text-gray-400">
                Connect with third-party tools that you're already using.
              </span>
            </a>
          </li>
          <li>
            <a
              href="#"
              className="block p-3 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700"
            >
              <div className="font-semibold">Marketing CRM</div>
              <span className="text-sm text-gray-500 dark:text-gray-400">
                Connect with third-party tools that you're already using.
              </span>
            </a>
          </li>
        </ul>
      </div>
    </div>
  </nav>
);

export default Navbar;
