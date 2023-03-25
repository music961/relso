import { JSX } from "preact"
import { IS_BROWSER } from "$fresh/runtime.ts"
import { Link } from 'preact-router'

export function Button(props: JSX.HTMLAttributes<HTMLButtonElement>) {
  return (
    <button
      {...props}
      disabled={!IS_BROWSER || props.disabled}
      class="px-2 py-1 border(gray-100 2) hover:bg-gray-200"
    />
  )
}

export function Input(props: JSX.HTMLAttributes<HTMLInputElement>) {
  return (
    <input
      {...props}
      disabled={!IS_BROWSER || props.disabled}
      class={`px-3 py-2 bg-black rounded border(gray-500 2) disabled:(opacity-50 cursor-not-allowed) ${
        props.class ?? ""
      }`}
    />
  )
}



export function ButtonLink(props: JSX.HTMLAttributes<HTMLButtonElement> & { to: string, data: Record<string, any> }) {
  const { to, data, children, ...rest } = props;
  const serializedData = encodeURIComponent(JSON.stringify(data));

  return (
    <Link {...rest} href={to + (data ? `?data=${serializedData}` : '')}>
      {children}
    </Link>
  )
}
