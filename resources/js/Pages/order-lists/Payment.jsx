import React from 'react'
import Container from '@/Components/Container'
import App from '@/Layouts/App'
import { Head, Link, useForm } from '@inertiajs/react'
import { Card, CardContent, CardHeader, CardTitle } from '@/Components/ui/card'
import { Badge } from '@/Components/ui/badge'
import { format } from 'date-fns'
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbSeparator,
} from '@/Components/ui/breadcrumb'

import { Input } from '@/Components/ui/input'
import { ArrowLeft, ShieldCheck, ShieldCheckIcon } from 'lucide-react'
import { Button } from '@/Components/ui/button'

import { toast } from 'sonner'
export default function Payment({ order }) {
  const { data, setData, put, processing, errors } = useForm({
    amount: '',
  })

  const handlePayment = (e) => {
    e.preventDefault()
    put(`/daftar-pesanan/pembayaran/${order.id}`, {
      onSuccess: () =>
        toast('Yeay! Pembayaran berhasil', {
          description: `Pesanan dari ${order.customer.name} berhasil dibayar`,
        }),
    })
  }
  return (
    <>
      <Head title="Pembayaran" />

      <Container>
        <Breadcrumb>
          <BreadcrumbList>
            <BreadcrumbItem>
              <BreadcrumbLink href={route('dashboard')}>Home</BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbLink href={route('order.list.index')}>
                Daftar Pemesanan
              </BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbLink href={route('order.list.create')}>
                Pembayaran
              </BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>{order.customer.email}</BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>
        <div className="flex justify-between mt-3 gap-4">
          <Card className="w-3/4">
            <CardHeader>
              <CardTitle className="text-2xl border-b py-2 px-3 tracking-wide">

                  Ringkasan Pembayaran
                  <span className="ml-3 text-zinc-300">#ORD{order.id}</span>

              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="py-2 px-3 flex flex-col gap-4 text-sm ">
                <p className="font-semibold">Informasi Pelanggan :</p>
                <div className="border border-zinc-200 rounded-md p-3 divide-y  divide-zinc-200 flex flex-col">
                  <div className="flex items-center justify-between py-2 px-2">
                    <h4 className="text-sm">Nama Pemesan </h4>
                    <p className="font-semibold">{order.customer.name}</p>
                  </div>
                  <div className="flex items-center justify-between py-2 px-2">
                    <h4 className="text-sm">E-mail </h4>
                    <p className="font-semibold">{order.customer.email}</p>
                  </div>
                  <div className="flex items-center justify-between py-2 px-2">
                    <h4 className="text-sm">Jenis kelamin</h4>
                    <p className="font-semibold">{order.customer.gender}</p>
                  </div>
                  <div className="flex items-center justify-between py-2 px-2">
                    <h4 className="text-sm">Nomor Handphone / Whatsapps</h4>
                    <p className="font-semibold">{order.customer.phone}</p>
                  </div>

                  <div className="flex items-center justify-between py-2 px-2">
                    <h4 className="text-sm">Dibuat </h4>
                    <p className="font-semibold">
                      {format(order.created_at, 'yyyy-MM-dd')}
                    </p>
                  </div>
                </div>

                {/* Pemesanan */}
                <p className="font-semibold">Informasi Pemesanan :</p>
                <div className="border border-zinc-200 rounded-md p-3 divide-y divide-zinc-200 flex flex-col">
                  <div className="flex items-center justify-between py-2 px-2">
                    <h4 className="text-sm">Kategori Pemesanan </h4>
                    <p className="font-semibold">{order.order_category}</p>
                  </div>
                  <div className="flex items-center justify-between py-2 px-2">
                    <h4 className="text-sm">Status Pembayaran </h4>
                    <Badge
                      variant="outline"
                      className="font-semibold text-xs rounded-full"
                    >
                      {order.payment_status}
                    </Badge>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card className="w-1/4 h-64">
            <CardHeader>
              <CardTitle className="text-base border-b py-2 px-2 tracking-wide">

                  Bayar
                  <span className="ml-3 text-zinc-300">#ORD{order.id}</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="py-2 px-3 flex flex-col gap-4 text-sm ">
                <h4 className="text-sm font-semibold tracking-wide">
                  Total Bayar :
                </h4>
                <p className="font-bold">
                  {new Intl.NumberFormat('id-ID', {
                    style: 'currency',
                    currency: 'IDR',
                    maximumSignificantDigits: 3,
                  }).format(data.amount)}
                </p>
                <form onSubmit={handlePayment}>
                  <Input
                    type="number"
                    value={data.amount}
                    className={`${errors.amount && 'border-red-600'}`}
                    onChange={(e) => setData('amount', e.target.value)}
                    placeholder="Rp."
                  />
                  <div className="flex items-center gap-2 mt-3">
                    <Link href={route('transaction.index')}><Button variant="outline" className="flex flex-row w-44">
                      <ArrowLeft className="w-4 h-4" />
                      <span>Kembali</span>
                    </Button></Link>

                    <Button className="flex flex-row bg-green-700 gap-2 w-44">
                      <span>Bayar</span>
                      <ShieldCheck className="w-4 h-4" />
                    </Button>
                  </div>
                </form>
              </div>
            </CardContent>
          </Card>
        </div>
      </Container>
    </>
  )
}
Payment.layout = (page) => <App children={page} />
