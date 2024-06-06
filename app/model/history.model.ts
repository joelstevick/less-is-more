export interface History {
    id: number,
    userId: string,
    story: string,
    summary?:string,
    poll?: string
}