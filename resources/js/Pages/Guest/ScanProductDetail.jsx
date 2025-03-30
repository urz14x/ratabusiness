import { Head } from '@inertiajs/react'
import ApplicationLogo from '@/Components/ApplicationLogo.jsx'
import React from 'react'

export default function ScanProductDetail(){
    return (
        <>
            <Head title="Pesanan 1" />
            <main className={'font-display flex flex-col container mx-auto py-14 mt-5 w-[500px]'}>
                <section className={' border-dashed border-t-[15px] py-3'}>
                    <header>
                        <ApplicationLogo className="w-20 h-20" />
                        <h1>Rata Business</h1>

                        <p>Indonesia, Bandung, Jawa barat, 40395</p>
                    </header>
                </section>

                <section>
                    <img src={"https://kertas.smartlink.id/qr/ZUR241007094147359"} alt={"Barcode "} className={"w-52"} />
                    <p>ZUR241007094147359</p>
                </section>

                <section>
                    <h1>Detail Pelanggan</h1>
                </section>

            </main>
        </>

    )
}
