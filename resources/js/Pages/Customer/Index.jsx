import App from '@/Layouts/App.jsx'
import { Head, Link, router } from '@inertiajs/react'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/Components/ui/card.jsx'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/Components/ui/table.jsx'
import { Button } from '@/Components/ui/button.jsx'
import { Edit2, PlusCircle, PlusIcon, Printer, ShoppingBagIcon, Trash2, Users2 } from 'lucide-react'
import Container from '@/Components/Container.jsx'
import { Input } from '@/Components/ui/input.jsx'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/Components/ui/select.jsx'
import React, { useEffect, useState } from 'react'
import { useFilter } from '@/hooks/useFilter.js'
import SimplePagination from '@/Components/ui/pagination.jsx'
export default function Index(props){
    const [params, setParams] = useState(props.state)

    const {data: customers, meta, links} = props.customers
    useFilter({
        route: route('customer.index'),
        values: params,
        only: ['customers'],
    })
    const onChange = (value) => {
        setParams({...params, limit: value})
    }
    const deleteCustomer = (id) => {
        router.delete(`/pelanggan/${id}/hapus`)
    }
    return <>
        <Head title="Daftar Pelanggan" />
        <Container className="flex flex-col space-y-3 w-full transition-all lg:px-4">
            <header className="flex flex-col md:flex-row justify-between items-center w-full mb-3 py-4 lg:py-4 bg-graph-paper-[#020617]/5">
                <h3 className="text-2xl font-semibold tracking-tight mb-3">
                    &#128195; Daftar Pelanggan
                </h3>
                <section className='flex items-center gap-x-2'>
                    <Link href={route('customer.create')}>
                        <Button className="flex items-center text-xs gap-2">
                        <span>
                          <PlusIcon className="w-4 h-4" />
                        </span>
                        <span>
                          Pelanggan Baru
                        </span>
                        </Button>
                    </Link>
                    <Button variant={'outline'} className="flex items-center gap-x-2">
                        <span>Ekspor</span>
                        <i><Printer className={'w-4 h-4'} /> </i>
                    </Button>
                </section>
            </header>
            { customers.length > 0 ? <Card>
                <CardHeader>
                    <CardTitle>Seluruh Pelanggan ({props.count})</CardTitle>
                    <CardDescription>Berikut data seluruh Pelanggan Rata Business</CardDescription>
                    <CardDescription
                        className={'flex flex-col md:flex-row items-start md:items-center gap-4 w-full md:w-1/2'}>
                        <Input type={'text'} value={params?.search} onChange={(e) =>
                            setParams((prev) => ({
                                ...prev,
                                search: e.target.value,
                            }))
                        } placeholder={'Cari Pelanggan'} className={'w-full md:w-1/2'} />
                        <Select name='limit' onValueChange={onChange} className={'w-full md:w-1/4'}>
                            <SelectTrigger className={'w-[70px]'}>
                                <SelectValue placeholder={5} />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="5">5</SelectItem>
                                <SelectItem value="10">10</SelectItem>
                                <SelectItem value="20">20</SelectItem>
                            </SelectContent>
                        </Select>
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead className="w-[100px]">ID</TableHead>
                                <TableHead>Nama</TableHead>
                                <TableHead>Email</TableHead>
                                <TableHead>Gender</TableHead>
                                <TableHead>Bergabung</TableHead>
                                <TableHead>Aksi</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {customers.map((customer, i) => (
                                <TableRow key={i}>
                                    <TableCell className="font-medium">#CUST{customer.id}</TableCell>
                                    <TableCell> {customer.name}</TableCell>
                                    <TableCell>{customer.email}</TableCell>
                                    <TableCell>{customer.gender}</TableCell>
                                    <TableCell>{customer.joined}</TableCell>
                                    <TableCell>
                                        <Button variant="ghost" size="icon" className="mr-2">
                                            <Edit2 className="h-4 w-4" />
                                        </Button>
                                        <Button onClick={() => deleteCustomer(customer.id)} variant="ghost" size="icon">
                                            <Trash2 className="h-4 w-4" />
                                        </Button>
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                    <CardFooter className="border-t pt-6">
                        <SimplePagination links={links} meta={meta} />
                    </CardFooter>
                </CardContent>
            </Card> :
                <Card className="w-full h-96 flex items-center justify-center">
                    <CardContent className="pt-6 pb-4 text-center">
                        <Users2 className="mx-auto h-12 w-12 text-muted-foreground mb-4" />
                        <h2 className="text-2xl font-semibold tracking-tight mb-2">Tidak ada pelanggan &#128515;</h2>
                        <p className="text-sm text-muted-foreground">
                            Sepertinya tidak ada pelanggan disini.
                        </p>
                        <Link href={route('customer.create')} className={"flex items- mt-3 justify-center w-full"}>
                            <Button className={'text-xs'}  variant="outline">
                                Pelanggan Baru
                            </Button>
                        </Link>
                    </CardContent>

                </Card>
             }

        </Container>
    </>
}
Index.layout = (page) => <App title="Pelanggan" children={page} />
