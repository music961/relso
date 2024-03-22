import { signal } from "@preact/signals"

export const sigRelso = signal<any>({})

export const sigEntryWrite = signal<any>({
    relso : {},
    entry : {},
    novel : ''
})