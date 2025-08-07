export default function Navbar() {
  return (
    <nav className="bg-blue-600 text-white p-4 shadow">
      <div className="container mx-auto flex justify-between items-center">
        <h1 className="text-xl font-bold">SubTrack</h1>
        <div className="flex gap-4">
          <a href="/dashboard" className="hover:underline">Dashboard</a>
          <a href="/add-subscription" className="hover:underline">Add</a>
          <a href="/manage-subscriptions" className="hover:underline">Manage</a>
          <a href="/billing-history" className="hover:underline">History</a>
          <a href="/settings" className="hover:underline">Settings</a>
          <a href="/" className="hover:underline text-red-200">Logout</a>
        </div>
      </div>
    </nav>
  );
}
