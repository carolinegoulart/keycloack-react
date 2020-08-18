import { combineReducers } from 'redux';

import TableReducer from '../components/table/TableReducers';
import UploadReducer from '../components/upload/UploadReducers';
import DownloadPadraoReducer from '../components/download/DownloadReducers';

const rootReducer = combineReducers({
  table: TableReducer,
  upload: UploadReducer,
  downloadPadrao: DownloadPadraoReducer,
});

export default rootReducer;
