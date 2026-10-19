function Navbar()
{
    return (
        <nav className = "flex justify-between bg-[#101820] p-4">
            <p className = "text-lg font-bold text-white mx-6">
                iTask 
            </p>

            <div className = "flex gap-6 mx-6">
                <p className = "text-lg font-bold text-white hover:text-[#2DD4BF] hover:underline hover:cursor-pointer transition-all duration-300"> Home </p>
                <p className = "text-lg font-bold text-white hover:text-[#2DD4BF] hover:underline hover:cursor-pointer transition-all duration-300"> Your Tasks</p>
            </div>
        </nav>
    )
}

export default Navbar;