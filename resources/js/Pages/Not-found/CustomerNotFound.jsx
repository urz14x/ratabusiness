import { Button } from '@/Components/ui/button'
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/Components/ui/card'
import { Input } from '@/Components/ui/input'
import { Head, Link } from '@inertiajs/react'
import { UserX, Search, Users, CircleGauge } from 'lucide-react'

export default function CustomerNotFound() {
  return (
    <>
      <Head title="Tidak ada pelanggan" />
      <div className="min-h-screen flex items-center justify-center bg-background p-4">
        <Card className="w-full max-w-lg">
          <CardHeader>
            <CardTitle className=" text-2xl ">
              &#128531; Pelanggan Tidak Ditemukan
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <p className="text-muted-foreground">
            Mohon maaf, kami tidak dapat menemukan pelanggan yang Anda cari. Pelanggan tersebut mungkin telah dihapus dari sistem kami atau Anda mungkin memasukkan ID pelanggan yang salah.
            </p>
            <div className="space-y-2">
              <h3 className="text-sm font-medium">Apa yang dapat Anda lakukan:</h3>
              <ul className="list-disc list-inside text-sm text-muted-foreground">
                <li>Periksa ID Pelanggan kembali</li>
                <li>Kontak Ustami Rajib &#128526;</li>
              </ul>
            </div>

          </CardContent>
          <CardFooter className="flex justify-between">
            <Link href={route('order.list.index')}>
              <Button variant="outline">
                <Users className="mr-2 h-4 w-4" />
                Daftar Pesanan
              </Button>
            </Link>

            <Link href={route('dashboard')}>
              <Button className="flex items-center gap-1">
                <i>
                  <CircleGauge className="mr-1 h-4 w-4" />
                </i>
                <span>Dashboard</span>
              </Button>
            </Link>
          </CardFooter>
        </Card>
      </div>
    </>
  )
}
