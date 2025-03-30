import { useState } from "react";
import { ChevronRight } from "lucide-react";
import { Toaster } from "@/Components/ui/sonner"
import Sidebar from "./Sidebar";
import { Button } from "@/Components/ui/button";

export default function App({ title, children }) {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <div className="font-display min-h-screen flex justify-start">
            <header className="flex">
                <Sidebar title={title}  open={isOpen} />
                {/* <Button
                    onClick={() => setIsOpen(!isOpen)}
                    variant="outline"
                    size='icon'
                    className={`z-[9999] fixed top-1/2 ${isOpen ? `-left-3` : `left-56` } rounded-full z-50`}
                >
                    <ChevronRight className="h-5 w-5" />
                </Button> */}
            </header>
            <main className={`w-full h-full flex-1 ml-0 md:ml-60  mt-14`}>
                {children}
            </main>
            <Toaster />
        </div>
    );
}
