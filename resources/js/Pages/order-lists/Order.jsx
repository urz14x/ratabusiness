import { Head, Link, router, useForm } from '@inertiajs/react'
import React, { useState } from 'react'
import App from '@/Layouts/App.jsx'
import Container from '@/Components/Container.jsx'
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from '@/Components/ui/card.jsx'
import {
  ChevronLeft,
  SaveIcon,
  ShoppingBagIcon,
  TrashIcon,
  User,
} from 'lucide-react'
import { Button } from '@/Components/ui/button.jsx'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/Components/ui/select.jsx'
import { Label } from '@/Components/ui/label.jsx'
import { Input } from '@/Components/ui/input.jsx'
import { Textarea } from '@/Components/ui/textarea'

export default function Order(props) {
  const { data, setData, post } = useForm({
    order_id: props?.order_id,
    product_id: 0,
    description: '',
    quantity: 1,
  })
  const [productLists, setProductLists] = useState([])
  const [selectedProduct, setSelectedProduct] = useState('')
  const deleteOrder = (id) => {
    router.delete(`/daftar-pesanan/${id}/batal`)
  }

  const handleProduct = (value) => {
    setProductLists([{ id: Number(value) }, ...productLists])
    setData('product_id', Number(value))
    setSelectedProduct(value)
  }
  const submitOrder = (e) => {
    e.preventDefault()
    post(route('order.list.single.create', props.order?.id))
  }

  return (
    <>
      <Head title={'Buat Pelanggan Baru'} />

      <Container className={'lg:px-4'}>
        <header className="flex flex-row justify-between w-full mb-3 py-4 lg:py-4 bg-graph-paper-[#020617]/5">
          <div className={'flex items-center mb-3 gap-2'}>
            <Button variant={'outline'} size={'icon'} asChild>
              <Link href={route('order.list.create')}>
                <ChevronLeft className={'w-4 h-4'} />
              </Link>
            </Button>
            <h3 className="text-2xl font-semibold tracking-tight">
              Orderan ID: #ORD{props?.order_id}
            </h3>
          </div>
          `
          <section className="flex items-center gap-x-2">
            <Button
              onClick={() => deleteOrder(props.order?.id)}
              variant={'destructive'}
              className={`flex items-center text-xs gap-2`}
            >
              <span>
                <TrashIcon className="w-4 h-4" />
              </span>
              <span>Batalkan Pesanan</span>
            </Button>
          </section>
        </header>
        <section className={'flex flex-col lg:flex-row gap-3'}>
          <div className={'w-full lg:w-3/5'}>
            <Card>
              <CardHeader>
                <CardTitle>Item Pemesanan</CardTitle>
              </CardHeader>
              <CardContent>
                <form onSubmit={submitOrder}>
                  <div className="flex flex-col w-full">
                    <div className="flex flex-row w-full gap-3">
                      <div className={'flex flex-col w-full'}>
                        <Label className="mb-2">Nama Produk</Label>
                        <Select onValueChange={handleProduct}>
                          <SelectTrigger className={'w-full'}>
                            <SelectValue placeholder="Pilih Produk" />
                          </SelectTrigger>
                          <SelectContent>
                            {props.product.length > 0 ? (
                              <>
                                {props.product.map((prod, i) => (
                                  <SelectItem key={i} value={`${prod.id}`}>
                                    {prod.name}
                                  </SelectItem>
                                ))}
                              </>
                            ) : (
                              <p className={'text-xs font-semibold'}>
                                Tidak ada Produk
                              </p>
                            )}
                          </SelectContent>
                        </Select>
                      </div>

                      <div className={'flex flex-col items-center w-1/2'}>
                        <Label className="mb-2">Quantity</Label>
                        <div className={'flex items-center gap-2'}>
                          <Button
                            type={'button'}
                            onClick={() =>
                              setData(
                                'quantity',
                                data.quantity > 0 ? data.quantity - 1 : null
                              )
                            }
                            variant={'outline'}
                          >
                            -
                          </Button>
                          <Input
                            type={'text'}
                            value={data.quantity}
                            className={'text-center'}
                            disabled
                          />
                          <Button
                            type={'button'}
                            variant={'default'}
                            onClick={() =>
                              setData('quantity', data.quantity + 1)
                            }
                          >
                            +
                          </Button>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className={'flex flex-col w-full mt-2'}>
                    <Label className="mb-2">Deskripsi Projek</Label>
                    <Textarea
                      value={data.description}
                      onChange={(e) => setData('description', e.target.value)}
                      placeholder="Masukan deskripsi project..."
                    />
                  </div>
                  <Button
                    type={'submit'}
                    variant={'default'}
                    className={`flex mt-3 items-center text-xs gap-2`}
                  >
                    <span>
                      <SaveIcon className="w-4 h-4" />
                    </span>
                    <span>Simpan</span>
                  </Button>
                </form>
              </CardContent>
            </Card>
          </div>
          <div className={'flex flex-col w-full lg:w-2/5 gap-3'}>
            <Card>
              <CardHeader>
                <CardTitle>Pelanggan</CardTitle>
              </CardHeader>
              <CardContent>
                <div className={'flex flex-col'}>
                  <div className={'flex items-center gap-2'}>
                    <User className={'w-4 h-4'} />
                    <p className={'text-sm'}>{props.order?.name}</p>
                  </div>
                  <div className={'flex items-center gap-2 mt-2'}>
                    <ShoppingBagIcon className={'w-4 h-4'} />
                    <p className={'text-sm'}>
                      {' '}
                      <data value={data.quantity}>{data.quantity}</data> Pesanan
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle>Detail Pemesanan</CardTitle>
              </CardHeader>
              <CardContent>
                <div>
                  <div>
                    <p>
                      Nama Produk :{' '}
                      {props.product.length > 0 ? (
                        <>
                          {selectedProduct ? (
                            props.product.map(
                              (prod, i) =>
                                prod.id === Number(selectedProduct) && (
                                  <span className=" font-semibold" key={i}>
                                    {prod.name} &#128187;
                                  </span>
                                )
                            )
                          ) : (
                            <span className=" font-semibold">Belum dipilih</span>
                          )}
                        </>
                      ) : (
                        <p className="text-xs font-semibold">
                          Tidak ada produk
                        </p>
                      )}{' '}
                    </p>
                  </div>
                  <div>
                    <p>Deskripsi Projek: <span className='font-semibold'>{data.description.length > 0 ? data.description : 'Belum ada deskripsi'}</span></p>

                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </section>
      </Container>
    </>
  )
}
Order.layout = (page) => <App children={page} title={'order produk'} />
