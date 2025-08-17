import Link from "next/link"

/* eslint-disable @next/next/no-img-element */
const NavBar = () => {
    return (
        <nav className="bg-gray-900 text-white flex justify-between items-center p-4">
            <div className="logo font-bold text-lg flex items-center">
                <img src="/tea.gif" alt="tea" width={44} />
                <span>Get Me A Chai</span>
            </div>
            {/* <ul className="flex gap-6">
                <li>Home</li>
                <li>About</li>
                <li>Projects</li>
                <li>Sign Up</li>
                <li>Login</li>
            </ul> */}
            <div>
                <Link href={"/login"}>
                    <button type="button" className="text-white bg-gradient-to-br from-purple-600 to-blue-500 hover:bg-gradient-to-bl focus:ring-1 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2 cursor-pointer">Login</button>
                </Link>
            </div>
        </nav>
    )
}

export default NavBar