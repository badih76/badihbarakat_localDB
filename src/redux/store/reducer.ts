import { SET_VISITS, SET_STATISTICS } from './actions';

export interface IPageStats {
    visits: number,
    likes: number,
    pageName: string
}

interface IAction {
    type: string,
    payload: any
}

interface IState {
    pageStats: IPageStats[]
}

const initialState: IState = {
    pageStats: []
}


const reducer = (state: IState = initialState, 
                action: IAction) => {
    switch(action.type) {
        case SET_VISITS: return {
                ...state,
                visits: action.payload
            }

        case SET_STATISTICS: 
            let found = state.pageStats.findIndex((ps: IPageStats) => {
                return ps.pageName == action.payload.pageName;
            });

            if(found != -1) state.pageStats[found] = {...action.payload}
            else state.pageStats.push(action.payload);
        
            return {
                ...state
            }
        
        default: return state;
    }
}

export default reducer;