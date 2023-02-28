import "@/styles/tailwind.css"
import "@/styles/fonts.css"
import type { AppProps } from "next/app"
import { DescribeRoute } from "@/components/Meta/DescribeRoute"
import { AuthProvider } from "@/lib/auth"
function MyApp({ Component, pageProps }: AppProps) {
  return (
    <DescribeRoute
      title="Law Chula Open House 2023"
      description="April 9th at Faculty of Law Chulalongkorn University"
      imgURL="/assets/meta/banner.png"
    >
      <AuthProvider>
        <Component {...pageProps} />
      </AuthProvider>
    </DescribeRoute>
  )
}

export default MyApp
