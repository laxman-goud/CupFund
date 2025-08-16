const NavBar = () => {
    return (
        <nav className="bg-gray-900 text-white flex justify-between items-center p-4">
            <div className="logo font-bold text-lg">GetMeAChai</div>
            <ul className="flex gap-6">
                <li>Home</li>
                <li>About</li>
                <li>Projects</li>
                <li>Sign Up</li>
                <li>Login</li>
            </ul>
        </nav>
    )
}

export default NavBar