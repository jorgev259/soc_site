import Head from 'next/head'

const MetadataTags = () => (
  <Head>
    <meta property="og:type" content="website" />
    <meta property="og:site_name" content="Sitting on Clouds" />
    <meta key='color' name="theme-color" content="#ffffff"></meta>
    <meta key='url' property='og:url' content='/' />
    <meta key='image' property='og:image' content='/img/assets/clouds_thumb.png' />
  </Head>
)

export const metadata = {
  title: 'Sitting on Clouds',
  description: 'Largest Video Game & Animation Soundtrack サウンドトラック Archive'
}

export default function Page () {
  return (
    <>
      <MetadataTags />
      <div />
    </>
  )
}
