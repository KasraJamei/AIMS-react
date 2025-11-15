const Header = () => {
    return (
        <header className="p-4 bg-white shadow-md">
            <div className="flex justify-between items-center">
                <input
                    type="text"
                    placeholder="Search..."
                    className="border rounded p-2"
                />
                <div>{/* Icons go here */}</div>
            </div>
        </header>
    );
};

export default Header;
