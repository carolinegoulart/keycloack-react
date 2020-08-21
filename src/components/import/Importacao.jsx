import React from 'react';

import UploadArquivo from '../../components/upload/Upload';
import DownloadArquivo from '../../components/download/Downalod';
import Table from '../../components/table/Table';

export default () => {
  return (
    <div>
      <div className="row wow fadeIn text-center">
        <DownloadArquivo />
        <UploadArquivo />
      </div>

      <Table />
    </div>
  );
};
