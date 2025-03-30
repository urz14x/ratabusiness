import React from 'react'
import App from '@/Layouts/App'
import { Head } from '@inertiajs/react'
import Container from '@/Components/Container'


export default function Index() {
  return (
    <>
    <Head title="Kategori Pesanan" />
    <Container>
        <h1>Categori pesanan</h1>
    </Container>
    </>
  )
}
Index.layout = (page) => <App title="Kategori Pesanan" children={page} />
