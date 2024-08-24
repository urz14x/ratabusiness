import React from "react";
import { Link, usePage } from "@inertiajs/react";
import { ArrowLeftRight, DoorOpen, ListOrdered, Settings } from "lucide-react";
import Container from "@/Components/Container";

export default function Sidebar() {
    const { auth } = usePage().props;
    const sidebar_items = [
        {
            title: "Dashboard",
            link: route("dashboard"),
        },
        {
            title: "Daftar Pemesanan",
            link: route("order.list.index"),
        },
        {
            title: "Transaksi",
            link: "/",
        },
    ];
    return (
        <aside>
            <nav className="w-[240px] max-w-[300px] border-r min-h-screen h-full px-3 bg-white flex flex-col justify-between items-start text-foreground  ">
                <header className="w-full h-auto mb-5 mt-2">
                    <Container className="flex flex-row gap-1 items-start justify-center px-2 border-b">
                        <svg
                            width={23}
                            height={23}
                            viewBox="0 0 561 673"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                        >
                            <path
                                d="M561 132H0C0 96.9914 13.9071 63.4167 38.6619 38.6619C63.4167 13.9071 96.9914 0 132 0H429C464.009 0 497.583 13.9071 522.338 38.6619C547.093 63.4167 561 96.9914 561 132Z"
                                fill="#000000"
                            />
                            <path
                                d="M141 240.5V672.5C105.991 672.5 72.4167 658.593 47.6619 633.838C22.9071 609.083 9 575.509 9 540.5V372.5C9 337.491 22.9071 303.917 47.6619 279.162C72.4167 254.407 105.991 240.5 141 240.5Z"
                                fill="#000000"
                            />
                            <path
                                d="M272 240.5H557C557 240.5 580 386.5 396 403.5L507 672.5H359L272 456.5V240.5Z"
                                fill="#000000"
                            />
                        </svg>
                        <h4 className="text-xl font-semibold tracking-tight">
                            Rata Business
                        </h4>
                    </Container>
                    <ul className="w-full flex flex-col gap-3">
                        {sidebar_items.map((item, i) => (
                            <li key={i}>
                                <Link
                                    href={item.link}
                                    className="flex items-center text-xs px-3 hover:bg-foreground/5 w-full py-3 rounded-md hover:text-foreground"
                                >
                                    <span>{item.icon}</span>
                                    <span>{item.title}</span>
                                </Link>
                            </li>
                        ))}
                    </ul>
                </header>

                <ul className="w-full">
                    <li>
                        <Link
                            href="/settings"
                            className="flex items-center text-xs px-3 hover:bg-foreground/5 w-full py-3 rounded-md hover:text-foreground"
                        >
                            <span>
                                <Settings className="mr-2 w-4 h-4" />
                            </span>
                            <span>Settings</span>
                        </Link>
                    </li>
                </ul>
            </nav>
        </aside>
    );
}
