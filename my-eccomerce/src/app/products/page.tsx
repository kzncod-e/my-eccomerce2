"use client";
import { Heart, ShoppingCart } from "lucide-react";
import Link from "next/link";
import { useEffect } from "react";
import CardLimit from "./CardLimit";
import { debounce } from "lodash";
import { useState } from "react";
export default function Products() {
  const [search, setSearch] = useState<string>("");
  const [debouncedSearch, setDebouncedSearch] = useState(search);

  const handleSearchChange = debounce((value) => {
    setDebouncedSearch(value);
  }, 500);
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value);
    handleSearchChange(e.target.value);
  };
  return (
    <>
      <div className="grid">
        <header className="py-4 mx-4 shadow-sm bg-white">
          <div className="container flex items-center justify-between">
            <Link href="/">
              <img
                src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAASwAAACoCAMAAABt9SM9AAAAdVBMVEX///8AAAC/v7/09PSioqLS0tIwMDD6+vrl5eV7e3vx8fF4eHjLy8tQUFBGRkarq6vY2NiOjo7e3t6EhIS3t7cXFxcMDAyampo+Pj5hYWHb29uwsLDs7OwgICCgoKBXV1dsbGwsLCyJiYm8vLxlZWU3NzckJCSrYnspAAAE5klEQVR4nO2d13KrQAyGg4MDbsENN1xTzvs/4okhTgyIErMrrTT67pmR/lkWrcry9KQoiqIoiqIoimKTPbUBTJj724Pn7ajNYMB04WX0qS1xnuTi3RhT2+I4vneHilVHz8sxpbbHYYaTvFZeSG2Ruyy9ItQWucuopFVMbZKzvJa08rbUNrnKS1krb01tlKNAWunHEKb4GdT9vZoFqNWA2iwneQe10pMhxBDW6oXaLicBgoYrS2q7XKQcuKesqO1yElgrr0dtl4usYa1eqe1ykoqFpfl3gCOslU9tl5PEoFYTarOcpA8vLGqz3GQAaqUZUhBQKz3ngISQVhphwUSqVXvKeXetFVZSTvrNqU1yl1VBqteA2iKHKWilcXsdOalOQ2pz3OZeKq3lNPAj1ZsG7Y0cPO8wWUT6CUwJ5j1/NjiPZlH/ue0zu2gwyYqum8nAH7d+jjXD5SCfgBkljVt4fw2UL0aJdMEisGizWdekQPtAQH8LwCI8y7GZV7vtvfjgOpnOqh/J1pfMnS08Nfh9ei88sV9fGh5JH5P3yQxqVtUv59/kQuiDPTQQ0tofKmqm0EI5ToNgvGitVIqopMTHn1x/gAW1h8YIi2kEC2yonTTE2L5UX8QiDtwJilZfCIhRoYS6HVbsc4QV/XtW+KR2tiMVtWVLnKnd7URFr6M1WJ8V/xZadmZG7W8X3lClilmfqaeoWp2p3e3GAVMr1ttVZfueHZgfpQNMrbhXzODRG9UKAnNhse9HakqeG4T/uCaeVidqVzuDeIBmn2yoGuqyAP85sWc0rQTkk/1mLw0hoON7i6WVgIWF9y1kH2JhJkipPTUA2pYlobhqvQJ9g3myIQVLKwlvIZpYEr6Fcyyx3qg9NUCv2U0z8D/qIJbsJezvaLks1sWvb1q1RJpAQpsRmljUjprgrGK1By3nQO2oCdDE4p9RRhRLwkU+aOdoCffoo23wEoJStNAhofbUAPDFOxaQkPtDO+5IuIgTrxBG7akB0FI0EnZ4vGbSEbWr3cEr3kt4D/HEKo4KM+SCJpaAkgVaCC+hMQQvdhBwgzDO8GoG+9YQ1Gkwamc7gzmJcqZ2titoeYcr3MMHvMnoK8wvWNmjisV98B5XrJh35QIt/ydBLcxIK4VzoQd12jCF87kHrRz2A+PhMLQraH555dtUgy+W5x2pnX6Upiv+rBAzrSTiVS3y8Dz8EInFM2WDOX5/B7XbjwH+5MQ6XCv6GwqxuDYwU2zxfG9nIxCL7/09qFf3ZFC73AF0rThPPiHesZLBOWWKnajh3VSDvLQ4ZwCxlxbvhYXa9cB7x0pB1IrzpzADMYyndtUA5b8VWoJp3i8HVnGa76nwnor/2JuGa7qhAMp11Px39wyMLGBM7aQxEBqQJEwefmO9LMa4Gl3C9qmHf8vyPZavauNbtwexGj8ImA3LYzGQ51r9qsHaD8MEjO+UsBZtse6QrMJS56SQY04RK7GpuM39hoWMPN+iaiPGG2skRe4lDP/jSbRWLQoY23XS6+92/V4yazxRSrhMspa6nPw2KRT+Qr/ujwWcO99bsr9UKAX3Nz5HFbnDE/vCVyuAc2J8rHF9B00v8mwdfYBh/qu4mjX+kamXH5z6FL9b3RMsv3fvw0fScrRynow+r+fLf9uI+TDmIwRhyLuRQ1EURVEURTHCf8eYSCcC+BLCAAAAAElFTkSuQmCC"
                className="w-32"
                alt=""
              />
            </Link>
            <div className="w-full max-w-xl relative flex">
              <span className="absolute left-4 top-3 text-lg text-gray-400">
                <i className="fa-solid fa-magnifying-glass" />
              </span>
              <input
                type="text"
                name="search"
                id="search"
                onChange={(e) => handleChange(e)}
                className="w-full border border-primary border-r-0 pl-12 py-3 pr-3 rounded-l-md focus:outline-none"
                placeholder="search"
              />
              <button className="bg-primary border border-primary text-white px-8 rounded-r-md hover:bg-transparent hover:text-primary transition">
                Search
              </button>
            </div>
            <div className="flex items-center space-x-4">
              <a
                href="#"
                className="text-center text-gray-700 hover:text-primary transition relative">
                <div className="text-2xl">
                  <Heart />
                </div>
                <div className="text-xs leading-3">Wishlist</div>
                <div className="absolute right-0 -top-1 w-5 h-5 rounded-full flex items-center justify-center bg-primary text-white text-xs">
                  8
                </div>
              </a>

              <a
                href="#"
                className="text-center text-gray-700 hover:text-primary transition relative">
                <div className="text-2xl">
                  <i className="fa-regular fa-user" />
                </div>
              </a>
            </div>
          </div>
        </header>

        <CardLimit search={debouncedSearch} />
      </div>
    </>
  );
}
