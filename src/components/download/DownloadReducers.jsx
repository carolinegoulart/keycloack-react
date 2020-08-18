const INITIAL_STATE = { file: [] }

export default function (state = INITIAL_STATE, action) {

    switch (action.type) {
        case 'FILE_PADRAO_FETCHED':

            return { ...state, listImport: Object.values(action.payload.data.results) }

        default:
            return state
    }

}