const INITIAL_STATE = {listImport: []}

export default function (state = INITIAL_STATE, action){

    try{

        switch (action.type) {
            case 'LIST_IMPORTS_FETCHED':
                    return {...state, listImport: Object.values(action.payload.data.results)}
            default:
                return state
        }

    }catch(e){
        return state
    }
   

}