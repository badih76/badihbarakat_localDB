export interface IAPIResponse {
    returnedStatus: number,
    internalStatus: number,
    error: string | null,
    data: any
}