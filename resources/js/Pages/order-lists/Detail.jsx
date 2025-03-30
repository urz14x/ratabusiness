import React from 'react'
import Container from '@/Components/Container'
import App from '@/Layouts/App'
import { Head, Link, router, useForm } from '@inertiajs/react'
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

import { Printer } from 'lucide-react'
import { Button } from '@/Components/ui/button'
export default function Detail({ order }) {
  const handlePrintInvoice = () => {
    window.location.href = `/cetak-faktur/${order.id}`
  }
  return (
    <>
      <Head title={`Pesanan ${order.customer.name}`} />

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
                Detail Pembayaran
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
                    <h4 className="text-sm">Tipe Pembayaran </h4>
                    <p className="font-semibold">{order.payment_type}</p>
                  </div>
                  <div className="flex items-center justify-between py-2 px-2">
                    <h4 className="text-sm">Status Pembayaran </h4>
                    <Badge className={'rounded-full success text-md'}>
                      {order.payment_status}
                    </Badge>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
          <div className="w-1/4 h-64 flex flex-col gap-4">
            <Card>
              <CardHeader>
                <CardTitle className="text-base border-b py-2 px-2 tracking-wide">
                  Ringkasan Pesanan
                  <span className="ml-3 text-zinc-300">#ORD{order.id}</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="flex flex-col">
                <div className="py-1 px-3 flex flex-col gap-2 text-sm">
                  <p className="text text-zinc-500">Kategori Pesanan</p>
                  <p className="font-semibold border-b py-2">
                    {order.order_category}
                  </p>
                  <div className="flex items-center justify-between">
                    <p className="font-semibold">Total</p>
                    <h4 className="text-base font-semibold mb-3">
                      {new Intl.NumberFormat('id-ID', {
                        style: 'currency',
                        currency: 'IDR',
                        maximumSignificantDigits: 3,
                      }).format(order.amount)}
                    </h4>
                  </div>

                  <Button
                    onClick={handlePrintInvoice}
                    className="flex flex-row bg-green-700 gap-2"
                  >
                    <span>Cetak Faktur</span>
                    <Printer className="w-4 h-4" />
                  </Button>
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle className="text-base border-b py-2 px-2 tracking-wide">
                  Barcode
                  <span className="ml-3 text-zinc-300">#ORD{order.id}</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="flex items-center justify-center h-44">
                <img
                  src="https://upload.wikimedia.org/wikipedia/commons/d/d0/QR_code_for_mobile_English_Wikipedia.svg"
                  className="w-44 h-44"
                  alt="QR CODE"
                />
              </CardContent>
            </Card>
          </div>
        </div>
      </Container>
    </>
  )
}
Detail.layout = (page) => <App title={`Rincian Pesanan `} children={page} />
