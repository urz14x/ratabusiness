import App from '@/Layouts/App.jsx'
import Container from '@/Components/Container.jsx'
import { Head, Link, useForm } from '@inertiajs/react'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/Components/ui/card.jsx'
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from '@/Components/ui/table.jsx'
import { Button } from '@/Components/ui/button.jsx'
import { Edit2, PackageSearch, PlusIcon, Printer, ShoppingBagIcon, Trash2 } from 'lucide-react'
import React, { useState } from 'react'
import { Badge } from '@/Components/ui/badge.jsx'
import {
    Sheet, SheetClose,
    SheetContent,
    SheetDescription,
    SheetHeader,
    SheetTitle,
    SheetTrigger,
} from '@/Components/ui/sheet.jsx'
import { Label } from '@/Components/ui/label.jsx'
import { Input } from '@/Components/ui/input.jsx'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/Components/ui/select.jsx'
import Announcement from "/public/img/casual-life-3d-megaphone.png"
import { toast } from 'sonner'



export default function Index(props){
    const {data: products} = props.products;
    const {data, setData, post} = useForm({
        name: '',
        status: '',
    });
    const handleStatusProduct = (value) => {
        setData('status', value);
    }
    const submitProduct = (e) => {
        e.preventDefault();
        post(route('product.store'), {
            onSuccess: () => toast('Berhasil', {
                description: 'Data Pelanggan berhasil dibuat',
                action: {
                    label: 'Tutup'
                }
            })
        });

    }
    return <>
        <Head title="Produk Rata" />
        <Container className="flex flex-col space-y-3 transition-all lg:px-4">
            <header className="flex flex-col md:flex-row justify-between items-center w-full mb-3 py-4 lg:py-4 bg-graph-paper-[#020617]/5">
                <h3 className="text-2xl font-semibold tracking-tight mb-3">
                    &#128230; Produk Kami
                </h3>
                <section className='flex items-center gap-x-2'>
                    <Sheet>
                        <SheetTrigger asChild>
                            <Button className="flex items-center text-xs gap-2">
                            <span>
                                <PlusIcon className="w-4 h-4" />
                            </span>
                            <span>
                                Produk Baru
                            </span>
                            </Button>
                        </SheetTrigger>
                        <SheetContent>
                            <SheetHeader>
                                <SheetTitle>Form Produk Baru</SheetTitle>
                                <SheetDescription>
                                    Buat Produk baru di Rata business
                                </SheetDescription>
                            </SheetHeader>

                            <form onSubmit={submitProduct} className="flex flex-col space-y-6 mt-3 font-display">
                                <div className="flex flex-col gap-y-2">
                                    <Label htmlFor="name">
                                        Nama Produk
                                    </Label>
                                    <Input id="name" value={data.name} onChange={e => setData('name', e.target.value)} placeholder={"Web development"} />
                                </div>
                                <div className="flex flex-col gap-y-2">
                                    <Label htmlFor="username">
                                        Status
                                    </Label>
                                    <Select onValueChange={handleStatusProduct}>
                                        <SelectTrigger className="">
                                            <SelectValue placeholder="Status Produk" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            <SelectItem value="Aktif">Aktif</SelectItem>
                                            <SelectItem value="Draf">Draf</SelectItem>
                                        </SelectContent>
                                    </Select>
                                </div>

                                <div>

                                    <SheetClose asChild>
                                        <Button type="submit">Save changes</Button>
                                    </SheetClose>
                                </div>
                            </form>
                        </SheetContent>
                    </Sheet>
                    <Button variant={'outline'} className="flex items-center gap-x-2">
                        <span>Ekspor</span>
                        <i><Printer className={'w-4 h-4'} /> </i>
                    </Button>
                </section>
            </header>
            {products.length > 0 ? <Card>
                <CardHeader>
                    <CardTitle>
                        Produk yang tersedia
                    </CardTitle>
                    <CardDescription>
                        Berikut beberapa Produk yang ada pada Rata Business
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead>Name</TableHead>

                                <TableHead>Status</TableHead>
                                <TableHead>Slug</TableHead>
                                <TableHead>Aksi</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {products.map((product, i) => (
                                <TableRow key={i}>
                                    <TableCell className='text-sm'>&#128293; {product.name}</TableCell>
                                    <TableCell> <Badge variant={'outline'}>{product.status}</Badge> </TableCell>
                                    <TableCell>{product.slug}</TableCell>
                                    <TableCell>
                                        <Button variant="ghost" size="icon" className="mr-2">
                                            <Edit2 className="h-4 w-4" />
                                        </Button>
                                        <Button variant="ghost" size="icon">
                                            <Trash2 className="h-4 w-4" />
                                        </Button>
                                    </TableCell>
                                </TableRow>
                            ))}

                        </TableBody>
                    </Table>
                </CardContent>
            </Card> : <Card className="w-full h-96 flex items-center justify-center px-5">
                <CardContent className="pt-6 pb-4 text-center flex items-center justify-center rounded flex-col space-y-3 border border-dashed w-full h-auto ">
                    <img src={Announcement} alt={"Pengumuman"} className={'w-32 h-32'} />
                    <h2 className="text-2xl font-semibold tracking-tight mb-2 text-muted-foreground">Tidak ada produk</h2>
                    <p className="text-sm text-muted-foreground">
                        Sepertinya saat ini sedang tidak ada Produk
                    </p>
                </CardContent>

            </Card>}

        </Container>
    </>
}
Index.layout = (page) => <App title="Produk Rata" children={page} />
