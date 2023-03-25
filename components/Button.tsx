import { JSX } from "preact"
import { IS_BROWSER } from "$fresh/runtime.ts"

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

export function ButtonLink(props: {
  data: Record<string, unknown>;
  url: string;
  children?: unknown;
}) {
  const { data, url, ...buttonProps } = props;

  const handleClick = () => {
    try {
      fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      }).then(() => {
        // 데이터 전송 후 페이지 이동
        window.location.href = url
      });
    } catch (error) {
      console.error(error)
    }
  }

  return (
    <button
      {...buttonProps}
      onClick={handleClick}
      disabled={!IS_BROWSER || buttonProps.disabled}
      className="px-2 py-1 border(gray-100 2) hover:bg-gray-200"
    />
  );
}



