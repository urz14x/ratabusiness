import { Head, Link, usePage } from '@inertiajs/react'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/Components/ui/dropdown-menu'
import { Avatar, AvatarFallback, AvatarImage } from '@/Components/ui/avatar'
import { BellIcon, DoorOpen, PlusCircleIcon, User } from 'lucide-react'
import { Button } from '@/Components/ui/button'
export default function Header({ title }) {
  const { auth } = usePage().props
  return (
    <div className="flex items-center justify-between w-full">
      <span className="font-semibold ml-3 md:ml-0">
        {title}
      </span>


        <div className="flex items-center gap-5">
            {/*Notification*/}
            <DropdownMenu>
                <DropdownMenuTrigger asChild>
                    <Button variant='outline' size='icon'>
                        <BellIcon className="h-4 w-4" />
                    </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className=" mt-3">
                    <DropdownMenuLabel>
                        Notifikasi Terbaru.
                    </DropdownMenuLabel>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem>
                        Ustami Rajib telah membayar Rp.500.000
                    </DropdownMenuItem>

                    <DropdownMenuSeparator />
                    <DropdownMenuItem>
                        Ustami Rajib telah membayar Rp.500.000
                    </DropdownMenuItem>

                    <DropdownMenuSeparator />
                </DropdownMenuContent>
            </DropdownMenu>


            <DropdownMenu>
                <DropdownMenuTrigger asChild>
                    <div className="flex items-center gap-2">
                        <Avatar>
                            <AvatarImage
                                src={`https://eu.ui-avatars.com/api/?name=${auth.user.name}&size=250`}
                            />
                            <AvatarFallback>CN</AvatarFallback>
                        </Avatar>
                        <Button variant="outline" className="hidden md:block">
                            <p className="text-sm">{auth.user.name}</p>
                        </Button>

                    </div>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-56 mr-3 mt-3">
                    <DropdownMenuLabel>
                        <p className="text-sm"> {auth.user.name}</p>
                    </DropdownMenuLabel>
                    <DropdownMenuLabel>
                        <p className="text-sm font-normal">{auth.user.email}</p>
                    </DropdownMenuLabel>

                    <DropdownMenuSeparator />
                    <DropdownMenuItem>
                        <Link href="" className="flex items-center gap-2">
                              <span>
                                <User width={15} h={15} />
                              </span>
                            <span>Profil</span>
                        </Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem>
                        <Link href="/" className="flex items-center gap-2">
                            <span>
                                <PlusCircleIcon width={15} h={15} />
                            </span>
                            <span>Buat Produk Baru</span>
                        </Link>
                    </DropdownMenuItem>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem>
                        <Link
                            href={route('logout')}
                            method="POST"
                            className="flex items-center gap-2"
                        >
              <span>
                <DoorOpen width={15} h={15} />
              </span>
                            <span>Keluar Akun</span>
                        </Link>
                    </DropdownMenuItem>
                </DropdownMenuContent>
            </DropdownMenu>
        </div>
    </div>
  )
}
