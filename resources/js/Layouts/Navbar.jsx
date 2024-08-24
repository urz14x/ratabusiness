import React from "react";
import Container from "@/Components/Container";
import { Link, usePage } from "@inertiajs/react";
import {
    ArrowLeftRight,
    DoorOpen,
    DoorOpenIcon,
    ListOrdered,
    PlusCircleIcon,
    User,
} from "lucide-react";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "../Components/ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "@/Components/ui/avatar";

export default function Navbar() {
    const { auth, ziggy } = usePage().props;
    const navbar_items = [
        {
            title: "Dashboard",
            link: route("dashboard"),
            icon: <DoorOpenIcon className="mr-2 h-4 w-4" />,
        },
        {
            title: "Daftar Pemesanan",
            link: route("order.list.index"),
            icon: <ListOrdered className="mr-2 h-4 w-4" />,
        },
        {
            title: "Transaksi",
            link: "/",
            icon: <ArrowLeftRight className="mr-2 h-4 w-4" />,
        },
    ];

    return (
        <div className="w-full bg-white text-md border-b">
            <Container className="flex items-center justify-between">
                <div className="flex items-center gap-10">
                    <header className="flex items-center gap-2">
                        <svg
                            width={23}
                            height={23}
                            viewBox="0 0 561 673"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                        >
                            <path
                                d="M561 132H0C0 96.9914 13.9071 63.4167 38.6619 38.6619C63.4167 13.9071 96.9914 0 132 0H429C464.009 0 497.583 13.9071 522.338 38.6619C547.093 63.4167 561 96.9914 561 132Z"
                                fill="#00B1DE"
                            />
                            <path
                                d="M141 240.5V672.5C105.991 672.5 72.4167 658.593 47.6619 633.838C22.9071 609.083 9 575.509 9 540.5V372.5C9 337.491 22.9071 303.917 47.6619 279.162C72.4167 254.407 105.991 240.5 141 240.5Z"
                                fill="#00B1DE"
                            />
                            <path
                                d="M272 240.5H557C557 240.5 580 386.5 396 403.5L507 672.5H359L272 456.5V240.5Z"
                                fill="#00B1DE"
                            />
                        </svg>
                        <h4 className="text-xl font-semibold text-brand tracking-tight">
                            Rata Business
                        </h4>
                    </header>
                    <nav>
                        <ul className="flex items-center space-x-5">
                            {navbar_items.map((item, i) => {
                                return (
                                    <Link
                                        href={item.link}
                                        className={`${
                                            ziggy.location === `${item.link}`
                                                ? "text-primary"
                                                : "text-zinc-500 hover:text-zinc-800 transition-all"
                                        }`}
                                    >
                                        <li className="flex items-center text-sm">
                                            <span>{item.title}</span>
                                        </li>
                                    </Link>
                                );
                            })}
                        </ul>
                    </nav>
                </div>

                <div>
                    <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                            <Avatar>
                                <AvatarImage src="https://github.com/shadcn.png" />
                                <AvatarFallback>CN</AvatarFallback>
                            </Avatar>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end" className="w-56 mr-3 mt-3">
                            <DropdownMenuLabel>
                                <p className="text-sm"> {auth.user.name}</p>
                            </DropdownMenuLabel>
                            <DropdownMenuLabel>
                                <p className="text-xs font-normal">
                                    {auth.user.email}
                                </p>
                            </DropdownMenuLabel>

                            <DropdownMenuSeparator />
                            <DropdownMenuItem>
                                <Link
                                    href=""
                                    className="flex items-center gap-2"
                                >
                                    <span>
                                        <User width={15} h={15} />
                                    </span>
                                    <span>Profil</span>
                                </Link>
                            </DropdownMenuItem>
                            <DropdownMenuItem>
                                <Link
                                    href="/"
                                    method="POST"
                                    className="flex items-center gap-2"
                                >
                                    <span>
                                        <PlusCircleIcon width={15} h={15} />
                                    </span>
                                    <span>Buat Kategori Pesanan</span>
                                </Link>
                            </DropdownMenuItem>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem>
                                <Link
                                    href={route("logout")}
                                    method="POST"
                                    className="flex items-center gap-2"
                                >
                                    <span>
                                        <DoorOpen width={15} h={15} />
                                    </span>
                                    <span>Keluar Akun</span>
                                </Link>
                            </DropdownMenuItem>
                        </DropdownMenuContent>
                    </DropdownMenu>
                </div>
            </Container>
        </div>
    );
}
