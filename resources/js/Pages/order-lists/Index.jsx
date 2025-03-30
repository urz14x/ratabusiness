import React, { useState } from 'react'
import App from '@/Layouts/App.jsx'
import { Head, Link, router, usePage } from '@inertiajs/react'
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
    ClipboardPlus, Edit2,
    Printer, TrashIcon,

} from 'lucide-react'
import { Button } from '@/Components/ui/button'

import { cva } from 'class-variance-authority'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/Components/ui/table.jsx'
import { Badge } from '@/Components/ui/badge.jsx'
import { Input } from '@/Components/ui/input.jsx'
import { useFilter } from '@/hooks/useFilter.js'
import {
    AlertDialog, AlertDialogAction, AlertDialogCancel,
    AlertDialogContent, AlertDialogDescription, AlertDialogFooter,
    AlertDialogHeader, AlertDialogTitle,
    AlertDialogTrigger,
} from '@/Components/ui/alert-dialog.jsx'
export default function Index(props) {
  const {data: orders} = props.orders;
  const [params, setParams] = useState(props.state);

  useFilter({
      route: route('order.list.index'),
      values: params,
      only: ['orders'],
  });
  const deleteOrder = (id) => {
      router.delete(route('order.list.destroy', id))
  }
  return (
    <>
      <Head title="Semua Pesanan Pesanan" />

        <Container className="flex flex-col space-y-3 transition-all lg:px-4">
            <header className="flex flex-col md:flex-row justify-between items-center w-full mb-3 py-4 lg:py-4 bg-graph-paper-[#020617]/5">
                <h3 className="text-2xl font-semibold tracking-tight mb-3">
                    &#128230; Daftar Pesanan Produk
                </h3>
                <section className='flex items-center gap-x-2'>
                    <Button asChild>
                        <Link href={route('order.list.create')} className={`flex items-center text-xs gap-2`}>
                            <span>
                                <ClipboardPlus className="w-4 h-4" />
                            </span>
                                <span>
                                Pesanan baru
                            </span>
                        </Link>
                    </Button>

                    <Button variant={'outline'} className="flex items-center gap-x-2">
                        <span>Ekspor</span>
                        <i><Printer className={'w-4 h-4'} /> </i>
                    </Button>
                </section>
            </header>
            <Card>
                <CardHeader>
                    <CardTitle>
                        Daftar Pesanan pelanggan
                    </CardTitle>
                    <CardDescription>
                        Berikut beberapa Produk yang ada pada Rata Business
                    </CardDescription>
                    <CardDescription>
                        <Input type={'text'} value={params?.search} onChange={e => setParams((prev) => ({
                            ...prev, search: e.target.value
                        }))} placeholder={'Cari Pesanan'} className={'w-full md:w-3/2'} />
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead>ID</TableHead>
                                <TableHead>Dibuat</TableHead>
                                <TableHead>Nama Pemesan</TableHead>
                                <TableHead>Status</TableHead>
                                <TableHead>Aksi</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {orders.map((order, i) => (
                                <TableRow key={i}>
                                    <TableCell>{order.id}</TableCell>
                                    <TableCell>{order.created}</TableCell>
                                    <TableCell className='text-sm'>{order.customer}</TableCell>
                                    <TableCell> <Badge variant={`${order.status === "draf" ? 'outline' :
                                    'default'}`}>{order.status}</Badge>
                                    </TableCell>

                                    <TableCell>
                                        <AlertDialog>
                                            <AlertDialogTrigger asChild>
                                               <Button variant="ghost" size="icon">
                                                    <TrashIcon className="h-4 w-4" />
                                               </Button>
                                            </AlertDialogTrigger>
                                            <AlertDialogContent>
                                                <AlertDialogHeader>
                                                    <AlertDialogTitle>Apakah anda yakin?</AlertDialogTitle>
                                                    <AlertDialogDescription>
                                                        Tindakan ini tidak dapat dibatalkan. Ini akan menghapus pesanan secara permanen
                                                    </AlertDialogDescription>
                                                </AlertDialogHeader>
                                                <AlertDialogFooter>
                                                    <AlertDialogCancel>Cancel</AlertDialogCancel>
                                                    <AlertDialogAction key={i} onClick={() => deleteOrder(order.id)}>
                                                        Hapus
                                                    </AlertDialogAction>
                                                </AlertDialogFooter>
                                            </AlertDialogContent>
                                        </AlertDialog>

                                    </TableCell>
                                </TableRow>
                            ))}

                        </TableBody>
                    </Table>
                </CardContent>
                <CardFooter>

                </CardFooter>
            </Card>
        </Container>
    </>
  )
}
Index.layout = (page) => <App title="Daftar Pesanan" children={page} />
