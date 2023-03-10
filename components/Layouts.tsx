const layouts = ({children}:any) => {
    return (
      <body class="bg-black text-gray-200">
        <nav class="px-4 py-3 flex justify-center bg-green-800">
            <a class="mx-4 hover:underline" href="/">선언</a>
            <a class="mx-4 hover:underline" href="/admin/main">관리자</a>
        </nav>
        <div class="flex justify-center">
          {children}
        </div>
      </body>
    )
}

export default layouts