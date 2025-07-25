interface dictType {
    label: string,
    value: number | null,
    type: 'primary' | 'success' | 'info' | 'warning' | 'danger',
    closable: boolean,
    hit: boolean,
    color: string,
    size: 'large' | 'default' | 'small',
    effect: 'dark' | 'light' | 'plain',
    round: boolean,
}

export type {
    dictType
}