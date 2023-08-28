import "./globals.css";
import Navbar from "@/components/Navbar";
import SessionProvid from "@/components/SessionProvid";
import Footer from "@/components/Footer";
import Share from "@/components/Share";
export const metadata = {
  title: "Next.js",
  description: "Generated by Next.js",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <link rel="icon" href="/favicon.ico" />
      </head>
      <body className="text-text-dark  overflow-x-hidden bg-primary-dark">
        <div className="bg-background-dark ">
          <div className="w-[300px] h-[300px] rounded-full bg-primary-dark absolute top-[450px] right-[450px]"></div>
          <div className="w-56 h-56 rounded-full bg-primary-dark absolute top-[500px] right-[250px]"></div>
          <div className="w-[300px] h-[300px] rounded-full bg-primary-dark absolute top-[275px] right-[300px] "></div>
          <div className="backdrop-filter min-h-[1440px] backdrop-blur-3xl ">
            <div className="backdrop-filter min-h-[1440px] bg-black backdrop-blur-3xl bg-opacity-5">
              <SessionProvid>
                <Share></Share>
                <Navbar></Navbar>
                <div className="flex justify-center flex-wrap p-10 pb-36">
                  {children}
                </div>

                <Footer></Footer>
              </SessionProvid>
            </div>
          </div>
        </div>
        <script src="https://cdnjs.cloudflare.com/ajax/libs/flowbite/1.8.0/flowbite.min.js"></script>
      </body>
    </html>
  );
}
