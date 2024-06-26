import "./globals.css";
import Navbar from "@/components/Navbar";
import SessionProvid from "@/components/SessionProvid";
import Footer from "@/components/Footer";
import Share from "@/components/Share";
export const metadata = {
  title: "Recipie",
  description: "Vytvářej, prohlížej a sdílej recepty s přáteli",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="bg-background-dark backdrop-blur-3xl ">
      <head>
        <link rel="icon" href="/favicon.ico" />
        <meta
          name="viewport"
          content="width=device-width, initial-scale=0.5"
        ></meta>
      </head>
      <body className="text-text-dark md:scale-100   overflow-x-hidden bg-primary-dark">
        <div className="bg-background-dark ">
          <div className="w-[300px] h-[300px] rounded-full bg-primary-dark absolute top-[450px] right-[450px]"></div>
          <div className="w-56 h-56 rounded-full bg-primary-dark absolute top-[500px] right-[250px]"></div>
          <div className="w-[300px] h-[300px] rounded-full bg-primary-dark absolute top-[275px] right-[300px] "></div>
          <div className="backdrop-filter min-h-[1440px] backdrop-blur-3xl ">
            <div className="backdrop-filter min-h-[1440px] bg-black backdrop-blur-3xl bg-opacity-5">
              <SessionProvid>
                <Navbar></Navbar>
                <div className="flex justify-center flex-wrap p-10 pb-36">
                  {children}
                </div>

                <Footer></Footer>
              </SessionProvid>
            </div>
          </div>
        </div>
      </body>
    </html>
  );
}
