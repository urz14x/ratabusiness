import React, { useState } from 'react'
import App from '@/Layouts/App.jsx'
import { Head, Link } from '@inertiajs/react'
import Container from '@/Components/Container'
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/Components/ui/card'
import {
    HandCoins,
    MoreHorizontal,
    Search,
    Trash2,
} from 'lucide-react'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/Components/ui/tabs'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/Components/ui/table'
import { Button } from '@/Components/ui/button'

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from '@/Components/ui/dropdown-menu'
import { Input } from '@/Components/ui/input'
import { useFilter } from '@/hooks/useFilter'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/Components/ui/select'
import SimplePagination from '@/Components/ui/pagination'

export default function Index(props) {
 console.log(props.orders)
  return (
    <>
      <Head title="Transaksi Pembayaran" />

      <Container className='mt-2'>
        <Tabs defaultValue="overview">
          <div className="flex flex-col">
            <TabsList>
              <TabsTrigger value="overview">Semua</TabsTrigger>
              <TabsTrigger value="paid">Lunas</TabsTrigger>
              <TabsTrigger value="unpaid">Belum Lunas</TabsTrigger>
              <TabsTrigger value="pending">Pending</TabsTrigger>
            </TabsList>
            <Card className="mt-3">
              <CardContent>
                <div className="flex flex-row gap-2 justify-between w-full">
                  <form className="flex items-center gap-1 ">
                    <Button variant="outline" size="icon">
                      <i>
                        <Search className="w-5 h-4" />
                      </i>
                    </Button>
                    <Input
                      type="text"

                      placeholder="Cari by name ?"
                    />
                  </form>
                  <div className="flex flex-row gap-2 ">
                    <Select
                      name="limit"
                    >
                      <SelectTrigger className="w-[180px]">
                        <SelectValue placeholder="Per-halaman" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="5">5</SelectItem>
                        <SelectItem value="50">50</SelectItem>
                        <SelectItem value="100">100</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
          <TabsContent value="overview" >
            <Card className="p-3">
              <CardHeader>
                <CardTitle>Daftar Transaksi Pembayaran</CardTitle>
                <CardDescription>Pembayaran seluruh pengguna</CardDescription>
              </CardHeader>
              <CardContent>
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Status</TableHead>
                        <TableHead>Waktu</TableHead>
                        <TableHead>Nama Pelanggan</TableHead>
                        <TableHead>Kategori Pesanan</TableHead>
                        <TableHead>Jumlah</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                        {
                            props.orders.data.length > 0 ? 'yes' : 'no'
                        }
                        <TableRow  className="h-12">
                          <TableCell>
                              Lunas
                          </TableCell>
                          <TableCell>ORDER DATE</TableCell>
                          <TableCell className="flex flex-col">
                            <span className="text-zinc-400">
                              #ORD
                            </span>
                            <span>Udin</span>
                          </TableCell>
                          <TableCell>Web developer</TableCell>
                          <TableCell>
                                Rp. 20.000.000
                          </TableCell>
                          <TableCell>
                            <DropdownMenu>
                              <DropdownMenuTrigger asChild>
                                <Button
                                  aria-haspopup="true"
                                  size="icon"
                                  variant="ghost"
                                >
                                  <MoreHorizontal className="h-4 w-4" />
                                  <span className="sr-only">Toggle menu</span>
                                </Button>
                              </DropdownMenuTrigger>
                              <DropdownMenuContent align="end">
                                <DropdownMenuLabel>Lainnya</DropdownMenuLabel>
                                <DropdownMenuItem>
                                  <Link
                                    href="#"
                                    className="flex items-center gap-2 text-sm"
                                  >
                                    <i>
                                      <HandCoins className="h-4 w-4" />
                                    </i>
                                    <span>Bayar Sekarang</span>
                                  </Link>
                                </DropdownMenuItem>


                                <DropdownMenuItem>
                                  <button

                                    className="flex items-center gap-2 text-red-800 text-sm"
                                  >
                                    <i>
                                      <Trash2 className="h-4 w-4" />
                                    </i>
                                    <span>Hapus & Batalkan Pesanan</span>
                                  </button>
                                </DropdownMenuItem>
                              </DropdownMenuContent>
                            </DropdownMenu>
                          </TableCell>
                        </TableRow>
                    </TableBody>
                  </Table>
              </CardContent>
              <CardFooter className="border-t pt-6">
                {/*<SimplePagination links={links} meta={meta} />*/}
              </CardFooter>
            </Card>

          </TabsContent>
          <TabsContent value="paid">Lunas</TabsContent>
          <TabsContent value="unpaid">Belum Lunas</TabsContent>
          <TabsContent value="pending">Pending</TabsContent>
        </Tabs>
      </Container>
    </>
  )
}
Index.layout = (page) => <App title="Transaksi" children={page} />
