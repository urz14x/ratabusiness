import React from 'react'
import { Link, usePage } from '@inertiajs/react'
import {
    Blocks,
    Bolt,
    CircleGauge,
    Clipboard,
    Handshake,
    Layers3,
    LucideMenu, PackageSearch, ShieldCheck, UserRound, UsersRound,
} from 'lucide-react'
import Container from '@/Components/Container'

import Header from './Header'
import { Label } from '@/Components/ui/label'
import ApplicationLogo from '@/Components/ApplicationLogo'
import { Button } from '@/Components/ui/button'
import {
    Sheet,
    SheetClose,
    SheetContent, SheetHeader, SheetTitle,
    SheetTrigger,
} from '@/Components/ui/sheet'
import { Badge } from '@/Components/ui/badge.jsx'


export default function Sidebar({title}) {
  const { url } = usePage()
  const sidebar_items = [
    {
      title: 'Dashboard',
      link: route('dashboard'),
      icon: <CircleGauge className="mr-1 h-4 w-4" />,
    },
      {
          title: 'Pelanggan', link: route('customer.index'),
          icon: <UsersRound className="mr-1 h-4 w-4" />,
      },
    {
      title: 'Daftar Pemesanan',
      link: route('order.list.index'),
      icon: <Clipboard className="mr-1 h-4 w-4" />,
    },

    {
      title: 'Transaksi',
      link: route('payment.index'),
      icon: <Handshake className="mr-1 h-4 w-4" />,
    },

  ]
  return (
    <nav className="flex justify-start font-display">
      <header className="fixed top-0 left-0 z-50 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 border-b flex items-center w-screen px-5 ">
        <div
          className={`flex items-center ml-0 md:ml-60 justify-between w-full py-2`}
        >
          <div className="block md:hidden lg:hidden">
            <Sheet>
              <SheetTrigger asChild>
                <Button size="icon" variant="outline">
                  <LucideMenu className="w-4 h-4" />
                </Button>
              </SheetTrigger>
              <SheetContent
                side="left"
                className="flex flex-col justify-between"
              >
                  <SheetHeader>
                      <SheetTitle>
                          <nav className="grid gap-2 text-lg font-sm font-display">
                              <Link
                                  href={route('dashboard')}
                                  className="flex items-center gap-2 py-2 text-xs px-3 font-semibold"
                              >
                                  <ApplicationLogo className="h-8 w-8" />
                                  <span className="sr-only">Rata Business</span>
                              </Link>
                              {sidebar_items.map((item, i) => (
                                  <SheetClose key={i} asChild>
                                      <Link
                                          href={item.link}
                                          className="flex items-center font-semibold text-sm px-3 hover:bg-foreground/5 w-full py-3 rounded-md hover:text-foreground"
                                      >
                                          <i>{item.icon}</i>
                                          {item.title}
                                      </Link>
                                  </SheetClose>
                              ))}
                          </nav>
                      </SheetTitle>

                  </SheetHeader>

                  <nav>
                      <Link
                          as="button"
                          href={route('setting.index')}
                          className="flex font-display items-center text-sm px-3 hover:bg-foreground/5 w-full py-3 rounded-md hover:text-foreground"
                      >
                    <span>
                      <Bolt className="mr-2 w-4 h-4" />
                    </span>
                          <span>Pengaturan</span>
                      </Link>
                  </nav>
              </SheetContent>
            </Sheet>
          </div>

            <Header title={title} />
        </div>
      </header>

        <aside>
            <nav
                className={`w-[240px] fixed top-0 left-0 transform hidden transition-all max-w-[300px] border-r min-h-screen h-full bg-white md:flex flex-col justify-between items-start text-foreground z-50`}
            >
                <header className="w-full h-auto mb-5 mt-2">
                    <Container className="flex flex-row justify-center py-2.5 gap-x-2 items-start border-b mb-5">
                      <ApplicationLogo className="w-6 h-6" />
                      <h4 className="text-lg font-semibold">
                          Rata Business
                      </h4>
                  </Container>
                  <ul className="w-full flex flex-col gap-1 px-3">
                      <li>
                          <Label className="px-3 text-foreground/30"> Menu Utama </Label>
                      </li>

                      <li>
                          <Link
                              href={route('dashboard')}
                              as="button"
                              className={`flex ${url === '/dashboard' ? 'bg-foreground/5' : ''} tracking-wide items-center text-xs px-3 hover:bg-foreground/5 w-full py-2 rounded-md hover:text-foreground`}
                          >
                              <span><CircleGauge className="mr-1 h-4 w-4" /></span>
                              <span>Dashboard</span>
                          </Link>
                      </li>
                      <li>
                          <Link
                              href={route('customer.index')}
                              as="button"
                              className={`flex ${url === '/pelanggan' ? 'bg-foreground/5' : ''} tracking-wide items-center text-xs px-3 hover:bg-foreground/5 w-full py-2 rounded-md hover:text-foreground`}
                          >
                              <span><UsersRound className="mr-1 h-4 w-4" /></span>
                              <span>Pelanggan</span>
                          </Link>
                      </li>
                      <li>
                          <Link
                              href={route('order.list.index')}
                              as="button"
                              className={`flex ${url === '/daftar-pesanan' ? 'bg-foreground/5' : ''} tracking-wide items-center text-xs px-3 hover:bg-foreground/5 w-full py-2 rounded-md hover:text-foreground`}
                          >
                              <span><Clipboard className="mr-1 h-4 w-4" /></span>
                              <span>Daftar Pemesanan</span>
                          </Link>
                      </li>
                      <li>
                          <Link
                              href={route('payment.index')}
                              as="button"
                              className={`flex ${url === '/transaksi' ? 'bg-foreground/5' : ''} tracking-wide items-center text-xs px-3 hover:bg-foreground/5 w-full py-2 rounded-md hover:text-foreground`}
                          >
                              <span><Handshake className="mr-1 h-4 w-4" /></span>
                              <span>Transaksi</span>
                          </Link>
                      </li>
                      <li>
                          <Label className="px-3 text-foreground/30"> Alat </Label>
                      </li>
                      <li>
                          <Link
                              href={route('product.index')}
                              as="button"
                              className={`flex ${url === '/produk' ? 'bg-foreground/5' : ''} tracking-wide items-center text-xs px-3 hover:bg-foreground/5 w-full py-2 rounded-md hover:text-foreground`}
                          >
                              <span><PackageSearch className="mr-1 h-4 w-4" /></span>
                              <span>Produk</span>
                          </Link>
                      </li>
                      <li className={'flex flex-row justify-between'}>
                          <Link
                              href={route('product.index')}
                              as="button"
                              className={`flex ${url === '/invoice' ? 'bg-foreground/5' : ''} tracking-wide items-center text-xs px-3 hover:bg-foreground/5 w-full py-2 rounded-md hover:text-foreground`}
                          >
                              <span><Blocks className="mr-1 h-4 w-4" /></span>
                              <span>Integrasi</span>
                              <Badge variant={'outline'} className={'text-xs rounded-full ml-2'}>Baru</Badge>
                          </Link>

                      </li>
                      <li>
                          <Link
                              href={route('product.index')}
                              as="button"
                              className={`flex ${url === '/invoice' ? 'bg-foreground/5' : ''} tracking-wide items-center text-xs px-3 hover:bg-foreground/5 w-full py-2 rounded-md hover:text-foreground`}
                          >
                              <span><ShieldCheck className="mr-1 h-4 w-4" /></span>
                              <span>Faktur</span>
                          </Link>
                      </li>

                  </ul>
              </header>
              <ul className="w-full">
                  <li>
                      <Link
                          as="button"
                          href={route('setting.index')}
                          className={`flex ${url === '/pengaturan' ? 'bg-foreground/5' : ''} items-center text-xs px-6 hover:bg-foreground/5 w-full py-3 rounded-md hover:text-foreground`}
                      >
                <span>
                  <Bolt className="mr-2 w-4 h-4" />
                </span>
                          <span>Pengaturan</span>
                      </Link>
                  </li>
              </ul>
          </nav>
      </aside>
    </nav>
  )
}
