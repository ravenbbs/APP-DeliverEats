import Header from '@/components/layout/Header'
import  AppProvider  from '@/components/AppContext'
import { Roboto } from 'next/font/google'
import './globals.css'


const roboto = Roboto({ subsets: ['latin'], weight: ['400', '500', '700'] })

export const metadata = {
  title: 'Create Next App',
  description: 'Generated by create next app',
}

export default function RootLayout({children}) {
  return (
    <html lang="en">
      <body className={roboto.className}>
        <main className='max-w-4xl mx-auto p-2'>
          <AppProvider> 
              <Header />
              {children}
            <footer className='font-normal text-gray-600 p-4 border-t'>
              <p className='text-center'>
                &copy; 2023 All rights reserved
              </p>
              <p className='text-center'>
                Designed by <a className='hover:text-fuchsia-500 transition-colors font-bold' href="https://github.com/ravenbbs" target='_blank'> ravenbbs </a>
              </p>
            </footer>
            </AppProvider>
            </main>
      </body>
    </html>
  )
}
