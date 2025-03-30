import { Head, Link, useForm } from '@inertiajs/react'
import App from '@/Layouts/App.jsx'
import Container from '@/Components/Container.jsx'
import Hero from "/public/gif/3d-casual-life-looking-through-resumes.webm"
import { Card, CardContent, CardHeader, CardTitle } from '@/Components/ui/card.jsx'
import { Label } from '@/Components/ui/label.jsx'
import { Input } from '@/Components/ui/input.jsx'
import { Button } from '@/Components/ui/button.jsx'
import { ChevronLeft, PlusIcon, Printer, SaveIcon } from 'lucide-react'
import { Skeleton } from '@/Components/ui/skeleton.jsx'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/Components/ui/select.jsx'
import React from 'react'

export default  function Create(){
    const {data, setData, post} = useForm({
        'name': '',
        'email': '',
        'phone': '',
        'gender': '',
        'address': ''
    });
    const handleName = (value) => {
        setData('gender', value)
    }
    const submitCustomer = (e) => {
        e.preventDefault();
        post(route('customer.store'));
    }
    return <>
        <Head title={'Buat Pelanggan Baru'} />
        <Container className={'lg:px-4'}>
            <header className="flex flex-col w-full mb-3 py-4 lg:py-4 bg-graph-paper-[#020617]/5">
                <h3 className="scroll-m-20 text-2xl font-semibold tracking-tight mb-3">
                    &#128195; Buat Pelanggan Baru!
                </h3>
               <p className={'text-sm px-1 text-foreground/50'}>Silahkan isi data pelanggan baru di bawah ini.</p>
            </header>
            <Card>
                <CardHeader>
                    <CardTitle>
                        Form Pelanggan Baru
                    </CardTitle>
                </CardHeader>
                <CardContent>
                    <div
                        className="flex flex-col md:flex-row  lg:h-full justify-between gap-x-5 gap-y-10 md:gap-y-0">
                        <form onSubmit={submitCustomer} className="w-full md:w-3/5 flex flex-col space-y-7 px-3">
                            <div className="flex flex-col gap-y-2 w-full">
                                <Label>Nama Pelanggan</Label>
                                <Input type="text" value={data.name} onChange={e => setData('name', e.target.value)}
                                       placeholder={'Rata Business'} />
                            </div>
                            <div className="flex flex-col gap-y-2 w-full">
                                <Label>Alamat Pelanggan</Label>
                                <Input type="text" value={data.address}
                                       onChange={e => setData('address', e.target.value)}
                                       placeholder={'Jl. Jakarta'} />
                            </div>
                            <div className="flex flex-col gap-y-2 w-full">
                                <Label>Email Pelanggan</Label>
                                <Input type="text" value={data.email} onChange={e => setData('email', e.target.value)}
                                       placeholder={'ratabusiness@gmail.com'} />
                            </div>
                            <div className="flex flex-col gap-y-2 w-full">
                                <Label>Jenis Kelamin</Label>
                                <Select onValueChange={handleName}>
                                    <SelectTrigger className="">
                                        <SelectValue placeholder="Jenis Kelamin" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="Pria">Pria</SelectItem>
                                        <SelectItem value="Wanita">Wanita</SelectItem>

                                    </SelectContent>
                                </Select>
                            </div>
                            <div className="flex flex-col gap-y-2 w-full">
                                <Label>Nomor Hp/Whatsapp</Label>
                                <Input type="text" value={data.phone} onChange={e => setData('phone', e.target.value)}
                                       placeholder={'+62'} />
                            </div>

                            <Button className={'flex items-center w-44 gap-2'}>
                                <i><SaveIcon className={'w-4 h-4'} /></i>
                                <span>Simpan</span>
                            </Button>
                        </form>
                        <section className="w-full md:w-2/5 h-96 flex">
                            <Card className={'w-full h-96'}>
                                <CardHeader>
                                    <CardTitle>Overview</CardTitle>
                                </CardHeader>
                                <CardContent className={'w-full'}>
                                    <div
                                        className={'flex flex-col space-y-2 px-5 py-4 transition-all relative bg-graph-paper-[#020617]/20'}>
                                        {/*<div className={'w-full h-16 bg-brand rounded-lg'}></div>*/}
                                        {data.name ?
                                            <img src={`https://eu.ui-avatars.com/api/?name=${data.name}&size=150`}
                                                 className={'w-16 h-16 rounded-full'} /> :
                                            <Skeleton className="h-16 w-16 rounded-full" />}
                                        <h3 className={'text-zinc-500 text-sm'}>Data Pelanggan</h3>
                                        {data.name ?
                                            <h1 className={'text-2xl font-semibold capitalize'}>{data.name}</h1> :
                                            <Skeleton className="h-4 w-full md:w-42" />}
                                        {data.address ?
                                            <h1 className={'text-sm font-semibold capitalize'}>{data.address}</h1> :
                                            <Skeleton className="h-4 w-full md:w-42" />}
                                        {data.gender ?
                                            <h1 className={'text-sm font-semibold capitalize'}>{data.gender}</h1> :
                                            <Skeleton className="h-4 w-full md:w-32" />}
                                        <h3 className={'text-zinc-500 text-sm'}>Kontak</h3>
                                        {data.email ?
                                            <h1 className={'text-sm font-normal'}>{data.email.toLowerCase()}</h1> :
                                            <Skeleton className="h-4 w-full md:w-52" />}
                                        {data.phone ? <h1 className={'text-sm font-normal'}>{data.phone}</h1> :
                                            <Skeleton className="h-4 w-64" />}

                                    </div>

                                </CardContent>
                            </Card>
                        </section>
                    </div>

                </CardContent>
            </Card>
        </Container>
    </>
}
Create.layout = page => <App title={'Menu Pelanggan'} children={page} />
