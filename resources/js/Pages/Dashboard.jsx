import Container from '@/Components/Container'
import App from '@/Layouts/App'

import { Head, usePage } from '@inertiajs/react'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/Components/ui/tabs'
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/Components/ui/card'
import {
  Globe,
  Image,
  ListOrdered,

  TrendingUp,
  WalletMinimal,
} from 'lucide-react'

import { Bar, BarChart, CartesianGrid, Line, LineChart, XAxis } from 'recharts'
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from '@/Components/ui/chart'

export default function Dashboard({ auth }) {
  const { user } = auth;
  // const convertToIDR = (credit) => {
  //   return new Intl.NumberFormat('id-ID', {
  //     style: 'currency',
  //     currency: 'IDR',
  //     maximumSignificantDigits: 3,
  //   }).format(credit)
  // }
  const chartData = [
    { month: 'January', desktop: 186, mobile: 80 },
    { month: 'February', desktop: 305, mobile: 200 },
    { month: 'March', desktop: 237, mobile: 120 },
    { month: 'April', desktop: 73, mobile: 190 },
    { month: 'May', desktop: 209, mobile: 130 },
    { month: 'June', desktop: 214, mobile: 140 },
    { month: 'July', desktop: 214, mobile: 140 },
    { month: 'Aug', desktop: 214, mobile: 140 },
    { month: 'Sept', desktop: 214, mobile: 140 },
    { month: 'Oktober', desktop: 214, mobile: 140 },
    { month: 'November', desktop: 214, mobile: 140 },
  ]
  const chartConfig = {
    desktop: {
      label: 'Desktop',
      color: 'var(--chart-1)',
    },
    mobile: {
      label: 'Mobile',
      color: 'hsl(var(--muted-foreground))',
    },
  }
  const dashboards = [
    {
      title: 'Total Pesanan',
      count: 0,
      icon: <ListOrdered className="w-4 h-4" />,
    },
    {
      title: 'Pembuatan Website',
      count: 0,
      icon: <Globe className="w-4 h-4" />,
    },
    {
      title: 'Desain Website',
      count: 0,
      icon: <Image className="w-4 h-4" />,
    },
    {
      title: 'Desain Slide',
      count: 0,
      icon: <Image className="w-4 h-4" />,
    },
    {
      title: 'Dompet Ku',
      count: 0,
      icon: <WalletMinimal className="w-4 h-4" />,
    },
  ]

  const formatNumber = (count) => {
    if (count >= 1_000_000) {
      return 'Jt'
    } else if (count >= 1000) {
      return 'Rb'
    }
  }
  return (
    <>
      <Head title="Dashboard" />

      <div className="w-full">
        <Container>
          <header className="flex flex-col py-4 px-4 bg-graph-paper-[#020617]/5">
            <p className="text-zinc-700 text-sm">Selamat Datang,</p>
            <h3 className="scroll-m-20 text-2xl font-semibold tracking-tight mb-5">
              Rata Dashboard {user.name} 👋
            </h3>
          </header>
          <Tabs defaultValue="account" className="w-full">
            <TabsList>
              <TabsTrigger value="account">Keseluruhan</TabsTrigger>
              <TabsTrigger value="analytic">Analisis</TabsTrigger>
            </TabsList>
            <TabsContent value="account" className="w-full">
              <div className="flex flex-col">
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 mb-3">
                  {dashboards.map(({ title, count, icon }) => (
                    <Card key={title}>
                      <CardHeader>
                        <CardTitle>
                          <div className="flex items-center justify-between text-zinc-800 border-b">
                            <p className="leading-7 [&:not(:first-child)]:mt-6 text-sm">
                              {title}
                            </p>
                            <span>{icon}</span>
                          </div>
                        </CardTitle>
                      </CardHeader>
                      <CardContent>
                        <div className="flex px-3">
                          <h3 className="scroll-m-20 text-sm md:text-lg font-semibold tracking-tight">
                            <data value={`${count}`}>{count}</data>
                          </h3>
                        </div>
                      </CardContent>
                      <CardFooter>
                        <h4 className="scroll-m-20 text-sm text-zinc-400 font-semibold tracking-tight">
                          {title === 'Dompet Ku'
                            ? 0
                            : 'Pesanan'}
                        </h4>
                      </CardFooter>
                    </Card>
                  ))}
                </div>
                <div className="flex md:flex-col flex-col-reverse lg:flex-row gap-4">
                  <div className="w-full lg:w-1/2">
                    <Card>
                      <CardHeader>
                        <CardTitle>Bar Chart - Multiple</CardTitle>
                        <CardDescription>January - June 2024</CardDescription>
                      </CardHeader>
                      <CardContent>
                        <ChartContainer config={chartConfig}>
                          <BarChart accessibilityLayer data={chartData}>
                            <CartesianGrid vertical={false} />
                            <XAxis
                              dataKey="month"
                              tickLine={false}
                              tickMargin={10}
                              axisLine={false}
                              tickFormatter={(value) => value.slice(0, 3)}
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
                          Trending up by 5.2% this month{' '}
                          <TrendingUp className="h-4 w-4" />
                        </div>
                        <div className="leading-none text-muted-foreground">
                          Showing total visitors for the last 6 months
                        </div>
                      </CardFooter>
                    </Card>
                  </div>
                  <div className="w-full lg:w-1/2">
                    <Card>
                      <CardHeader>
                        <CardTitle className="text-base font-semibold px-2">
                          Pesanan yang baru saja lunas
                        </CardTitle>
                      </CardHeader>
                      <CardContent>
                        {/*<div className="flex flex-col space-y-6">*/}
                        {/*  {paids.data.length > 0 ? (*/}
                        {/*    paids.data.map((people, i) => (*/}
                        {/*      <div*/}
                        {/*        key={i}*/}
                        {/*        className="flex items-center justify-between hover:bg-muted/60 rounded-md transition-all py-2 px-2"*/}
                        {/*      >*/}
                        {/*        <div className="flex items-center gap-3">*/}
                        {/*          <img*/}
                        {/*            src={`https://eu.ui-avatars.com/api/?name=${people.name}&size=250`}*/}
                        {/*            alt="Avatar Girl"*/}
                        {/*            className="w-12 h-12 rounded-sm"*/}
                        {/*          />*/}

                        {/*          <div>*/}
                        {/*            <h3 className="text-base font-semibold">*/}
                        {/*              {people.name}*/}
                        {/*            </h3>*/}
                        {/*            <p className="text-sm">{people.email}</p>*/}
                        {/*          </div>*/}
                        {/*        </div>*/}

                        {/*        <h4 className="font-semibold text-base">*/}
                        {/*          + Rp.{people.amount}*/}
                        {/*        </h4>*/}
                        {/*      </div>*/}
                        {/*    ))*/}
                        {/*  ) : (*/}
                        {/*    <div className="flex flex-1 flex-col gap-4 p-4 lg:gap-6 lg:p-6">*/}
                        {/*      <div className="flex flex-1 items-center justify-center rounded-lg p-3 border border-dashed shadow-sm">*/}
                        {/*        <div className="flex flex-col items-center gap-1 text-center">*/}
                        {/*          <h3 className="text-xl font-bold tracking-tight">*/}
                        {/*            Belum ada pesanan yang sudah lunas :(*/}
                        {/*          </h3>*/}
                        {/*          <p className="text-sm text-muted-foreground mb-3">*/}
                        {/*            Jika pembayaran sudah lunas maka akan tampil*/}
                        {/*            disini.*/}
                        {/*          </p>*/}
                        {/*        </div>*/}
                        {/*      </div>*/}
                        {/*    </div>*/}
                        {/*  )}*/}
                        {/*</div>*/}
                      </CardContent>
                      <CardFooter></CardFooter>
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
  )
}

Dashboard.layout = (page) => <App title="Dashboard Rata" children={page} />
