import Sidebar from "./Sidebar";

export default function App({ user, header, children }) {
    return (
        <div className="font-display">
            <main className="w-full h-full">{children}</main>
        </div>
    );
}
