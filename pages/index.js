import fetchMovie from '@/functions/fetchMovie';
import Head from 'next/head'
import Image from 'next/image'
import { useEffect } from 'react';

export default function Home() {
  useEffect(() => {
    fetchMovie(["Avatar", "Forrest Gump"])
  }, [])

  return (
    <>
      <Head>
        <title>Create Next App</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main>

      </main>
    </>
  )
}
