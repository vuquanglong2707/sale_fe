import React from 'react'
import * as FileSaver from 'file-saver';
import * as XLSX from 'xlsx';
import { Button } from 'antd';

 const ExportCSV = ({csvData, fileName}: any) => {

    const fileType = 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8';
    const fileExtension = '.xlsx';

    const exportToCSV = (csvData: any, fileName: any) => {
      // const ws = XLSX.utils.json_to_sheet(csvData);
        const ws = XLSX.utils.json_to_sheet(csvData, {skipHeader:true});
        const wb = { Sheets: { 'data': ws }, SheetNames: ['data'] };
        const excelBuffer = XLSX.write(wb, { bookType: 'xlsx', type: 'array' });
        const data = new Blob([excelBuffer], {type: fileType});
        FileSaver.saveAs(data, fileName + fileExtension);
    }

    return (
        <Button type="primary" onClick={() => exportToCSV(csvData,fileName)} >Xuất file excel</Button>
    )
}

export default ExportCSV;