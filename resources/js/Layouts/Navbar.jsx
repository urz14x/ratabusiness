import React from "react";
import Container from "@/Components/Container";
import { Link, usePage } from "@inertiajs/react";
import {
    ArrowLeftRight,
    DoorOpen,
    DoorOpenIcon,
    ListOrdered,
    Menu,
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
import { Button } from "@/Components/ui/button";
import {
    Drawer,
    DrawerClose,
    DrawerContent,
    DrawerDescription,
    DrawerFooter,
    DrawerHeader,
    DrawerTitle,
    DrawerTrigger,
} from "@/Components/ui/drawer";

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
        <header className="sticky top-0 left-0 z-50 border-b w-full bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 text-md">
            <Container className="flex items-center justify-between h-14">
                <div className="flex items-center gap-10">
                    <header className="flex items-center gap-5">
                        <Drawer direction="left">
                            <DrawerTrigger asChild>
                                <Button
                                    variant="outline"
                                    className="rounded-full"
                                >
                                    <Menu className="w-5 h-5" />
                                </Button>
                            </DrawerTrigger>
                            <DrawerContent>
                                <DrawerHeader>
                                    <DrawerTitle>
                                        <header className="flex gap-2 items-center px-3 py-3">
                                            <svg
                                                width={20}
                                                height={20}
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
                                            <h4 className="text-base font-semibold text-brand tracking-tight">
                                                Rata Dashboard
                                            </h4>
                                        </header>
                                    </DrawerTitle>
                                    <nav>
                                        <ul className="px-3 font-display flex-col space-y-3">
                                            {navbar_items.map((item, i) => {
                                                return (
                                                    <li key={i}>
                                                        <Link
                                                            href={item.link}
                                                            className="flex items-center"
                                                        >
                                                            <span>
                                                                {item.icon}
                                                            </span>
                                                            <span>
                                                                {item.title}
                                                            </span>
                                                        </Link>
                                                    </li>
                                                );
                                            })}
                                        </ul>
                                    </nav>
                                </DrawerHeader>
                                <DrawerFooter>
                                    <Button>Submit</Button>
                                    <DrawerClose>
                                        <Button variant="outline">
                                            Cancel
                                        </Button>
                                    </DrawerClose>
                                </DrawerFooter>
                            </DrawerContent>
                        </Drawer>
                        <div className="flex gap-2 items-center">
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
                                Rata Dashboard
                            </h4>
                        </div>
                    </header>
                    {/* <nav>
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
                    </nav> */}
                </div>

                <div>
                    <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                            <Avatar>
                                <AvatarImage src="https://github.com/shadcn.png" />
                                <AvatarFallback>CN</AvatarFallback>
                            </Avatar>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent
                            align="end"
                            className="w-56 mr-3 mt-3"
                        >
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
        </header>
    );
}
