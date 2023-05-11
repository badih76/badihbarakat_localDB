export const SET_VISITS = 'SET_VISITS';
export const SET_STATISTICS = 'SET_STATISTICS';

interface IStatistics {
    visits: number,
    likes: number,
    pageName: string
}

export function setVisits(visits: number) {
    return {
        type: SET_VISITS,
        payload: visits
    }
}


export function setStatistics(statistics: IStatistics) {
    return {
        type: SET_STATISTICS,
        payload: statistics
    }
}