import Head from "next/head"

type MetaProps = {
  title: string,
  keywords: string,
  desc: string
}

const Meta = ({ title, keywords, desc }: MetaProps) => {
  return (
    <Head>
      <meta name="viewport" content="width=device-width, initial-scale=1"/>
      <meta name="keyword" content={keywords}/>
      <meta name="description" content={desc}/>
      <meta name="theme-color" content="#000000" />
      <meta charSet="utf-8"/>
      <link rel="icon" href="/favicon.ico" />
      <title>{title}</title>
    </Head>
  )
}

Meta.defaultProps = {
  title: 'Dressaholic',
  keywords: "web development, web dev, e-commerce, clothes",
  desc: 'demo e-commerce site created using Next.js'
}

export default Meta