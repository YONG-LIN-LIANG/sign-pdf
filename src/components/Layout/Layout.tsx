import Header from "./Header"
const Layout = (props: any) => (
  <section className="flex flex-col min-h-screen">
    <Header />
    <main className="flex-grow mt-auto bg-[#BDBDBD]">{ props.children }</main>
  </section>
)

export default Layout