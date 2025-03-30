import React, { useState } from 'react'
import App from '@/Layouts/App'
import Container from '@/Components/Container'
import { Head, Link, router, useForm } from '@inertiajs/react'
import { Button } from '@/Components/ui/button.jsx'
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/Components/ui/card.jsx'
import { Badge } from '@/Components/ui/badge.jsx'
import { Input } from '@/Components/ui/input.jsx'
import { useFilter } from '@/hooks/useFilter.js'

import Announcement from '/public/img/casual-life-3d-megaphone.png'
import SimplePagination from '@/Components/ui/pagination'

export default function ChooseCustomer(props) {
  const { data: customers, meta, links } = props.customers
  const [params, setParams] = useState(props.state)

  useFilter({
    route: route('order.list.create'),
    values: params,
    only: ['customers'],
  })
  return (
    <>
      <Head title="Pesanan Baru!" />

      <Container className={'flex flex-col space-y-3 transition-all lg:px-4'}>
        <header className="flex flex-col md:flex-row justify-between items-center w-full mb-3 py-4 lg:py-4 bg-graph-paper-[#020617]/5">
          <h3 className="text-2xl font-semibold tracking-tight mb-3">
            &#128512; Pilih dulu pelanggan-nya?
          </h3>
        </header>
        <Card>
          <CardHeader>
            <CardTitle>Silahkan pilih terlebih dahulu pelanggan.</CardTitle>
            <CardDescription>
              <div className="flex flex-col">
                <Input
                  type={'text'}
                  value={params?.search}
                  onChange={(e) =>
                    setParams((prev) => ({
                      ...prev,
                      search: e.target.value,
                    }))
                  }
                  placeholder={'Cari Nama Pelanggan'}
                  className={'w-full md:w-96'}
                />
                <SimplePagination links={links} meta={meta} />
              </div>
            </CardDescription>
          </CardHeader>
          <CardContent>
            {customers.length > 0 ? (
              <div className={'grid grid-cols-1'}>
                <div
                  className={
                    'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-2 w-full'
                  }
                >
                  {customers.map((customer, i) => (
                    <Card key={i}>
                      <CardHeader>
                        <div className="flex flex-row gap-x-3 items-center">
                          <img
                            src={`https://eu.ui-avatars.com/api/?name=${customer.name}&size=45`}
                            className={'rounded-full'}
                            alt={customer.name}
                          />
                          <div className={'flex flex-col gap-y-1'}>
                            <CardTitle>{customer.name}</CardTitle>
                            <CardTitle className={'font-normal text-sm'}>
                              #CUST{customer.id}{' '}
                              {customer.order_status === 'draf' ? (
                                <Badge variant={'outline'}>
                                  {customer?.order_status}
                                </Badge>
                              ) : '' || customer?.order_status === 'Terisi' ? (
                                <Badge
                                  className={'rounded-full'}
                                  variant={'default'}
                                >
                                  {customer?.order_status}
                                </Badge>
                              ) : (
                                ''
                              )}{' '}
                            </CardTitle>
                          </div>
                        </div>
                      </CardHeader>
                      <CardContent>
                        <div
                          className={
                            'grid grid-cols-1 overflow-hidden lg:grid-cols-2 items-center justify-center text-xs gap-5 px-3'
                          }
                        >
                          <div className={'flex flex-col'}>
                            <h5 className={'text-foreground/50'}>
                              Nama Pelanggan
                            </h5>
                            <p className={'font-semibold'}>{customer.name}</p>
                          </div>
                          <div className={'flex flex-col'}>
                            <h5 className={'text-foreground/50'}>Email</h5>
                            <p className={'font-semibold'}>{customer.email}</p>
                          </div>
                          <div className={'flex flex-col'}>
                            <h5 className={'text-foreground/50'}>
                              Kontak/Whatsapp
                            </h5>
                            <p className={'font-semibold'}>{customer.phone}</p>
                          </div>
                          <div className={'flex flex-col'}>
                            <h5 className={'text-foreground/50'}>
                              Jenis Kelamin
                            </h5>
                            <p className={'font-semibold'}>{customer.gender}</p>
                          </div>
                        </div>
                      </CardContent>
                      <CardFooter>
                        <Button
                          variant={'outline'}
                          className={'w-full'}
                          asChild
                        >
                          <Link
                            href={
                              customer.order_status === 'Terisi'
                                ? '/detail-order'
                                : route('order.list.single', customer.id)
                            }
                          >
                            {customer.order_status == 'Terisi'
                              ? 'Detail'
                              : 'Pilih' || customer.order_status == 'Draf'
                              ? 'Lanjutkan'
                              : 'Lanjutkan'}
                          </Link>
                        </Button>
                      </CardFooter>
                    </Card>
                  ))}
                </div>
              </div>
            ) : (
              <Card className="w-full h-96 flex items-center justify-center px-5">
                <CardContent className="pt-6 pb-4 text-center flex items-center justify-center rounded flex-col space-y-3 border border-dashed w-full h-auto ">
                  <img
                    src={Announcement}
                    alt={'Pengumuman'}
                    className={'w-32 h-32'}
                  />
                  <h2 className="text-2xl font-semibold tracking-tight mb-2 text-muted-foreground">
                    Pelanggan Tidak ada
                  </h2>
                  <p className="text-sm text-muted-foreground">
                    Sepertinya saat ini tidak ada pelanggan
                  </p>
                </CardContent>
              </Card>
            )}
          </CardContent>
        </Card>
      </Container>
    </>
  )
}
ChooseCustomer.layout = (page) => (
  <App title="Pilih Pelanggan" children={page} />
)
