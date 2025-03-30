import React from 'react'
import App from '@/Layouts/App'
import { Head } from '@inertiajs/react'
import Container from '@/Components/Container'

export default function Index() {
  return (
    <>
      <Head title="Pengaturan" />
      <Container>Settings page</Container>
    </>
  )
}
Index.layout = (page) => <App title="Pengaturan" children={page} />
