import { Head } from "$fresh/runtime.ts"
import Counter from "../islands/Counter.tsx"
import Layout from "../components/Layouts.tsx"

export default function Home() {
  return (
    <>
      <Head>
        <title>릴레이 선언 하는곳</title>
      </Head>
      <Layout>
        <div class="p-4 mx-auto max-w-screen-md">
          <p class="flex justify-center">
            릴레이를 선언하세요
          </p>
        </div>
      </Layout>
    </>
  );
}
