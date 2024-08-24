import Container from "@/Components/Container";
import App from "@/Layouts/App";
import Navbar from "@/Layouts/Navbar";
import { Head, usePage } from "@inertiajs/react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/Components/ui/tabs";
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/Components/ui/card";
import {
    Calendar,
    Globe,
    Image,
    ListOrdered,
    TrendingUp,
    WalletMinimal,
} from "lucide-react";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/Components/ui/table";
import { Bar, BarChart, CartesianGrid, XAxis } from "recharts";
import {
    ChartContainer,
    ChartTooltip,
    ChartTooltipContent,
} from "@/Components/ui/chart";
import { Button } from "@/Components/ui/button";

export default function Dashboard({ auth }) {
    const { user } = auth;
    const { total, wallet } = usePage().props;
    console.log(wallet);
    const convertToIDR = (credit) => {
        return new Intl.NumberFormat("id-ID", {
            style: "currency",
            currency: "IDR",
            maximumSignificantDigits: 3,
        }).format(credit);
    };
    const chartData = [
        { month: "January", desktop: 186, mobile: 80 },
        { month: "February", desktop: 305, mobile: 200 },
        { month: "March", desktop: 237, mobile: 120 },
        { month: "April", desktop: 73, mobile: 190 },
        { month: "May", desktop: 209, mobile: 130 },
        { month: "June", desktop: 214, mobile: 140 },
    ];
    const chartConfig = {
        desktop: {
            label: "Desktop",
            color: "hsl(var(--chart-1))",
        },
        mobile: {
            label: "Mobile",
            color: "hsl(var(--chart-2))",
        },
    };
    const dashboards = [
        {
            title: "Total Pesanan",
            count: total.order,
            icon: <ListOrdered className="w-4 h-4" />,
        },
        {
            title: "Pembuatan Website",
            count: 0,
            icon: <Globe className="w-4 h-4" />,
        },
        {
            title: "Desain Banner",
            count: 0,
            icon: <Image className="w-4 h-4" />,
        },
        {
            title: "Desain Slide",
            count: 0,
            icon: <Image className="w-4 h-4" />,
        },
        {
            title: "DompetKu",
            count: convertToIDR(wallet) || 0,
            icon: <WalletMinimal className="w-4 h-4" />,
        },
    ];

    const invoices = [
        {
            invoice: "INV001",
            paymentStatus: "Paid",
            totalAmount: "$250.00",
            paymentMethod: "Credit Card",
        },
        {
            invoice: "INV002",
            paymentStatus: "Pending",
            totalAmount: "$150.00",
            paymentMethod: "PayPal",
        },
        {
            invoice: "INV003",
            paymentStatus: "Unpaid",
            totalAmount: "$350.00",
            paymentMethod: "Bank Transfer",
        },
        {
            invoice: "INV004",
            paymentStatus: "Paid",
            totalAmount: "$450.00",
            paymentMethod: "Credit Card",
        },
        {
            invoice: "INV005",
            paymentStatus: "Paid",
            totalAmount: "$550.00",
            paymentMethod: "PayPal",
        },
        {
            invoice: "INV006",
            paymentStatus: "Pending",
            totalAmount: "$200.00",
            paymentMethod: "Bank Transfer",
        },
        {
            invoice: "INV007",
            paymentStatus: "Unpaid",
            totalAmount: "$300.00",
            paymentMethod: "Credit Card",
        },
    ];
    const dateNow = () => {
        const date = new Date();

        let day = date.getDate();
        let month = date.getMonth() + 1;
        let year = date.getFullYear();
        let currentDate = `${day}-${month}-${year}`;
        return currentDate;
    };
    return (
        <>
            <Head title="Dashboard" />
            <header>
                <Navbar title="Dashboard" />
            </header>
            <div className="w-full">
                <Container>
                    <div className="flex items-center justify-between">
                        <header>
                            <h3 className="scroll-m-20 text-2xl font-semibold tracking-tight mb-5 mt-3">
                                Selamat Datang di Dashboard Rata! {user.name} 👋
                            </h3>
                        </header>

                        <Button
                            variant="outline"
                            className="flex items-center mb-2 gap-2"
                        >
                            <span>
                                <Calendar className="w-4 h-4" />
                            </span>
                            <span>{dateNow()}</span>
                            {dateNow()}
                        </Button>
                    </div>

                    <Tabs defaultValue="account" className="w-full">
                        <TabsList>
                            <TabsTrigger value="account">
                                Keseluruhan
                            </TabsTrigger>
                            <TabsTrigger value="analytic">Analisis</TabsTrigger>
                        </TabsList>
                        <TabsContent value="account" className="w-full">
                            <div className="flex flex-col">
                                <div className="grid grid-cols-5 gap-4 mb-3">
                                    {dashboards.map(
                                        ({ title, count, icon }) => (
                                            <Card key={title}>
                                                <CardHeader>
                                                    <CardTitle>
                                                        <div className="flex items-center justify-between">
                                                            <p className="leading-7 [&:not(:first-child)]:mt-6 text-sm">
                                                                {title}
                                                            </p>
                                                            <span>{icon}</span>
                                                        </div>
                                                    </CardTitle>
                                                </CardHeader>
                                                <CardContent>
                                                    <div className="flex flex-col justify-start">
                                                        <h3 className="scroll-m-20 text-xl font-semibold tracking-tight">
                                                            {count}
                                                        </h3>
                                                        <h4 className="scroll-m-20 text-sm text-zinc-400 font-semibold tracking-tight">
                                                            {title ===
                                                            "DompetKu"
                                                                ? "Rb"
                                                                : "Pesanan"}
                                                        </h4>
                                                    </div>
                                                </CardContent>
                                            </Card>
                                        )
                                    )}
                                </div>
                                <div className="grid grid-cols-2">
                                    <div className="">
                                        <Card className="w-[450px]">
                                            <CardHeader>
                                                <CardTitle>
                                                    Bar Chart - Multiple
                                                </CardTitle>
                                                <CardDescription>
                                                    January - June 2024
                                                </CardDescription>
                                            </CardHeader>
                                            <CardContent>
                                                <ChartContainer
                                                    config={chartConfig}
                                                >
                                                    <BarChart
                                                        accessibilityLayer
                                                        data={chartData}
                                                    >
                                                        <CartesianGrid
                                                            vertical={false}
                                                        />
                                                        <XAxis
                                                            dataKey="month"
                                                            tickLine={false}
                                                            tickMargin={10}
                                                            axisLine={false}
                                                            tickFormatter={(
                                                                value
                                                            ) =>
                                                                value.slice(
                                                                    0,
                                                                    3
                                                                )
                                                            }
                                                        />
                                                        <ChartTooltip
                                                            cursor={false}
                                                            content={
                                                                <ChartTooltipContent indicator="dashed" />
                                                            }
                                                        />
                                                        <Bar
                                                            dataKey="desktop"
                                                            fill="var(--color-desktop)"
                                                            radius={4}
                                                        />
                                                        <Bar
                                                            dataKey="mobile"
                                                            fill="var(--color-mobile)"
                                                            radius={4}
                                                        />
                                                    </BarChart>
                                                </ChartContainer>
                                            </CardContent>
                                            <CardFooter className="flex-col items-start gap-2 text-sm">
                                                <div className="flex gap-2 font-medium leading-none">
                                                    Trending up by 5.2% this
                                                    month{" "}
                                                    <TrendingUp className="h-4 w-4" />
                                                </div>
                                                <div className="leading-none text-muted-foreground">
                                                    Showing total visitors for
                                                    the last 6 months
                                                </div>
                                            </CardFooter>
                                        </Card>
                                    </div>
                                    <div className="">
                                        <Card className="">
                                            <CardHeader>
                                                <CardTitle>
                                                    Belum Melakukan Transaksi
                                                </CardTitle>
                                                <CardDescription>
                                                    January - June 2024
                                                </CardDescription>
                                            </CardHeader>
                                            <CardContent>
                                                <Table>
                                                    <TableHeader>
                                                        <TableRow>
                                                            <TableHead className="w-[100px]">
                                                                Invoice
                                                            </TableHead>
                                                            <TableHead>
                                                                Status
                                                            </TableHead>
                                                            <TableHead>
                                                                Method
                                                            </TableHead>
                                                            <TableHead className="text-right">
                                                                Amount
                                                            </TableHead>
                                                        </TableRow>
                                                    </TableHeader>
                                                    <TableBody>
                                                        {invoices.map(
                                                            (invoice) => (
                                                                <TableRow
                                                                    key={
                                                                        invoice.invoice
                                                                    }
                                                                >
                                                                    <TableCell className="font-medium">
                                                                        {
                                                                            invoice.invoice
                                                                        }
                                                                    </TableCell>
                                                                    <TableCell>
                                                                        {
                                                                            invoice.paymentStatus
                                                                        }
                                                                    </TableCell>
                                                                    <TableCell>
                                                                        {
                                                                            invoice.paymentMethod
                                                                        }
                                                                    </TableCell>
                                                                    <TableCell className="text-right">
                                                                        {
                                                                            invoice.totalAmount
                                                                        }
                                                                    </TableCell>
                                                                </TableRow>
                                                            )
                                                        )}
                                                    </TableBody>
                                                </Table>
                                            </CardContent>
                                        </Card>
                                    </div>
                                </div>
                            </div>
                        </TabsContent>
                        <TabsContent value="analytic">
                            Change your password here.
                        </TabsContent>
                    </Tabs>
                </Container>
            </div>
        </>
    );
}

Dashboard.layout = (page) => <App children={page} />;
