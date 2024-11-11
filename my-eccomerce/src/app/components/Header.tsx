import Link from "next/link";
import { readPayload } from "../products/[slug]/page";
export default async function Header() {
  const userId = await readPayload();

  return (
    <>
      <header className="flex justify-between shadow-2xl  text-white px-6 bg-[#010506] items-center py-6">
        <div className="text-2xl font-bold">
          <Link href="/">Ecommerce</Link>
        </div>
        <nav>
          <ul className="flex space-x-6">
            <li>
              <a href="#" className="text-gray-400 hover:text-white">
                Home
              </a>
            </li>
            <li>
              <Link
                href="../products
              "
                className="text-gray-400 hover:text-white">
                All products
              </Link>
            </li>
            <li>
              <Link href="../login" className="text-gray-400 hover:text-white">
                Login
              </Link>
            </li>
            <li>
              <Link
                href="../register"
                className="text-gray-400 hover:text-white">
                Register
              </Link>
            </li>
            <li>
              <Link
                href={`../wishlists/${userId}`}
                className="text-gray-400 hover:text-white">
                My Wislists
              </Link>
            </li>
          </ul>
        </nav>
      </header>
    </>
  );
}
