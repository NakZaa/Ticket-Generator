import "@/styles/tailwind.css"
import "@/styles/fonts.css"
import type { AppProps } from 'next/app'
import { DescribeRoute } from "@/components/Meta/DescribeRoute"
import { AuthProvider } from "@/lib/auth"

function MyApp({ Component, pageProps }: AppProps) {
  return (<DescribeRoute title="Law Chula Open House"
    description="Faculty of Law Chulalongkorn University is having an Open House event. Come join us!">
    <AuthProvider>
      <Component {...pageProps} />
    </AuthProvider>
  </DescribeRoute>
  )
}

export default MyApp