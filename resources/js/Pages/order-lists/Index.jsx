import React from "react";
import App from "@/Layouts/App.jsx";
import { Head, usePage } from "@inertiajs/react";
import Container from "@/Components/Container";
import Navbar from "@/Layouts/Navbar";
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/Components/ui/card";
import {
    Globe,
    Image,
    ListOrdered,
    MoreHorizontal,
    PlusIcon,
} from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/Components/ui/tabs";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/Components/ui/table";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/Components/ui/dialog";

import { Button } from "@/Components/ui/button";
import FormNewOrder from "./FormNewOrder";
import { Badge } from "@/Components/ui/badge";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuTrigger,
} from "@/Components/ui/dropdown-menu";
import {
    Breadcrumb,
    BreadcrumbItem,
    BreadcrumbLink,
    BreadcrumbList,
    BreadcrumbSeparator,
} from "@/Components/ui/breadcrumb";

export default function Index({ orders }) {
    const { total, website } = usePage().props;
    const dashboards = [
        {
            title: "Total Pesanan",
            count: total.order,
            icon: <ListOrdered className="w-4 h-4" />,
        },
        {
            title: "Pembuatan Website",
            count: total.website,
            icon: <Globe className="w-4 h-4" />,
        },
        {
            title: "Desain Banner",
            count: total.banner,
            icon: <Image className="w-4 h-4" />,
        },
        {
            title: "Desain Slide",
            count: total.design,
            icon: <Image className="w-4 h-4" />,
        },
    ];

    return (
        <>
            <Head title="Semua Pesanan Pesanan" />
            <header>
                <Navbar title="Daftar Pesanan" />
            </header>
            <Container>
                <Breadcrumb className="py-3">
                    <BreadcrumbList>
                        <BreadcrumbItem>
                            <BreadcrumbLink href="/">Home</BreadcrumbLink>
                        </BreadcrumbItem>
                        <BreadcrumbSeparator />
                        <BreadcrumbItem>
                            <BreadcrumbLink href="/components">
                                Daftar Pemesanan
                            </BreadcrumbLink>
                        </BreadcrumbItem>
                    </BreadcrumbList>
                </Breadcrumb>

                <Tabs defaultValue="overview">
                    <div className="flex items-center">
                        <TabsList>
                            <TabsTrigger value="overview">Semua</TabsTrigger>
                            <TabsTrigger value="status">
                                Status Pembayaran
                            </TabsTrigger>
                        </TabsList>
                        <div className="ml-auto flex gap-2">
                            <Dialog>
                                <DialogTrigger asChild>
                                    <Button className="flex items-center gap-2 mb-2 rounded-full">
                                        <span>
                                            <PlusIcon className="w-4 h-4" />
                                        </span>
                                        <span>Pesanan Baru</span>
                                    </Button>
                                </DialogTrigger>
                                <DialogContent className="sm:max-w-[425px]">
                                    <DialogHeader>
                                        <DialogTitle>Pesanan Baru!</DialogTitle>
                                        <DialogDescription>
                                            Buat data pesanan baru di Rata?
                                        </DialogDescription>
                                    </DialogHeader>
                                    {/* Form Pesanan baru */}
                                    <FormNewOrder />
                                    {/* Akhir Form Pesanan baru */}
                                </DialogContent>
                            </Dialog>
                            <Button variant="outline" className="rounded-full">
                                Export
                            </Button>
                        </div>
                    </div>
                    <TabsContent value="overview">
                        <Card className="p-3">
                            <CardHeader>
                                <CardTitle>
                                    <h1 className="text-2xl">Pesanan</h1>
                                </CardTitle>
                                <CardDescription>
                                    Semua seluruh orderan ada disini.
                                </CardDescription>
                            </CardHeader>
                            <CardContent>
                                {orders.data.length > 0 ? (
                                    <Table>
                                        <TableHeader>
                                            <TableRow>
                                                <TableHead className="w-[100px]">
                                                    ID
                                                </TableHead>
                                                <TableHead>Status</TableHead>
                                                <TableHead>Waktu</TableHead>
                                                <TableHead>
                                                    Nama Pelanggan
                                                </TableHead>
                                                <TableHead>
                                                    Kategori Pesanan
                                                </TableHead>
                                                <TableHead>Jumlah</TableHead>
                                            </TableRow>
                                        </TableHeader>
                                        <TableBody>
                                            {orders.data.map((order) => (
                                                <TableRow
                                                    key={order.id}
                                                    className="h-12"
                                                >
                                                    <TableCell className="font-medium">
                                                        {order.id}
                                                    </TableCell>
                                                    <TableCell>
                                                        <Badge
                                                            variant={`${
                                                                order.payment_status ===
                                                                "Lunas"
                                                                    ? ""
                                                                    : "outline"
                                                            }`}
                                                            className={
                                                                "rounded-full"
                                                            }
                                                        >
                                                            {
                                                                order.payment_status
                                                            }
                                                        </Badge>
                                                    </TableCell>
                                                    <TableCell>
                                                        {order.date}
                                                    </TableCell>
                                                    <TableCell>
                                                        {order.name}
                                                    </TableCell>
                                                    <TableCell>
                                                        {order.order_category}
                                                    </TableCell>
                                                    <TableCell>
                                                        {new Intl.NumberFormat(
                                                            "id-ID",
                                                            {
                                                                style: "currency",
                                                                currency: "IDR",
                                                                maximumSignificantDigits: 3,
                                                            }
                                                        ).format(order.amount)}
                                                    </TableCell>
                                                    <TableCell>
                                                        <DropdownMenu>
                                                            <DropdownMenuTrigger
                                                                asChild
                                                            >
                                                                <Button
                                                                    aria-haspopup="true"
                                                                    size="icon"
                                                                    variant="ghost"
                                                                >
                                                                    <MoreHorizontal className="h-4 w-4" />
                                                                    <span className="sr-only">
                                                                        Toggle
                                                                        menu
                                                                    </span>
                                                                </Button>
                                                            </DropdownMenuTrigger>
                                                            <DropdownMenuContent align="end">
                                                                <DropdownMenuLabel>
                                                                    Aksi
                                                                </DropdownMenuLabel>
                                                                <DropdownMenuItem>
                                                                    Edit
                                                                </DropdownMenuItem>
                                                                <DropdownMenuItem>
                                                                    Delete
                                                                </DropdownMenuItem>
                                                            </DropdownMenuContent>
                                                        </DropdownMenu>
                                                    </TableCell>
                                                </TableRow>
                                            ))}
                                        </TableBody>
                                    </Table>
                                ) : (
                                    <div className="flex flex-1 flex-col gap-4 p-4 lg:gap-6 lg:p-6">
                                        <div className="flex flex-1 items-center justify-center rounded-lg p-3 border border-dashed shadow-sm">
                                            <div className="flex flex-col items-center gap-1 text-center">
                                                <h3 className="text-2xl font-bold tracking-tight">
                                                    Ternyata Kamu belum
                                                    mempunyai pesanan...
                                                </h3>
                                                <p className="text-sm text-muted-foreground mb-3">
                                                    Tekan tombol Pesanan Baru
                                                    dibawah 👇
                                                </p>
                                                <Dialog>
                                                    <DialogTrigger asChild>
                                                        <Button className="flex items-center gap-2 mb-2 rounded-full">
                                                            <span>
                                                                <PlusIcon className="w-4 h-4" />
                                                            </span>
                                                            <span>
                                                                Pesanan Baru
                                                            </span>
                                                        </Button>
                                                    </DialogTrigger>
                                                    <DialogContent className="sm:max-w-[425px]">
                                                        <DialogHeader>
                                                            <DialogTitle>
                                                                Pesanan Baru!
                                                            </DialogTitle>
                                                            <DialogDescription>
                                                                Buat data
                                                                pesanan baru di
                                                                Rata?
                                                            </DialogDescription>
                                                        </DialogHeader>
                                                        {/* Form Pesanan baru */}
                                                        <FormNewOrder />
                                                        {/* Akhir Form Pesanan baru */}
                                                    </DialogContent>
                                                </Dialog>
                                            </div>
                                        </div>
                                    </div>
                                )}
                            </CardContent>
                        </Card>
                    </TabsContent>
                    <TabsContent value="status">
                        Change your password here.
                    </TabsContent>
                </Tabs>
            </Container>
        </>
    );
}
Index.layout = (page) => <App children={page} />;
