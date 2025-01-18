import React, { useState } from 'react';
import XLSX from 'xlsx';

const ExcelSortAndFilter = () => {
  const [data, setData] = useState([]);
  const headers = [
    "Client", "Group Code", "Mailing Code", "Mlg Desc", "Mail Date", "Offer", "Offer Desc", "Product", "Product Desc",
    "Category", "Source", "List", "Segment", "Ship Qty", "Mailed", "Net %", "Printing", "Lists", "Postage", "Lettershop", "DP", 
    "Misc", "Tot Mlg Cost", "Mail Orders", "Phone Orders", "Web Orders", "Gross Orders", "Gross %", "Net Orders", "Net %", "ac", 
    "Active Subs", "Inquirers", "Backorders", "B/O Amt", "% with B/O", "Prod Amt", "X-Sell Amt", "Misc Amt", "Non CC Amt", "CC Amt",
    "Auto-Ships", "Gross Sales", "Refunds", "Product Cost", "Call Ctr", "Merch Fee", "Royalties", "Total Cost", "Net P/L", "Net ROI",
    "% Breakeven", "BE Orders", "Net Per Piece", "Avg Order", "Avg w/Autoship", "Avg Turns", "Mlg Cost", "Product Cost", "Call Ctr",
    "Merch Fee", "Total Cost", "Net PL/Order", "Avg w/Autoship", "Mlg Cost", "Product Cost", "Call Ctr", "Merch Fee", "Total Cost",
    "Net PL/M", "NSF Count", "Days", "AOV", "BE AOV", "LT AOV", "Qty Mailed", "NTF Buyers", "FE Cost", "FE CPO", "FE Purch", "FE AOV",
    "FE ROI", "Subs %", "BE Orders", "BE Mlg Qty", "BE Cost", "BE CPO", "BE Purch", "BE AOV", "Tot Purch", "Tot Cost", "Net P/L", 
    "LT AOV", "LT ROI", "P/L Per Buyers", "Delta", "P/L per buyer Total", "Action"
  ];

  const parseExcelFile = (file) => {
    const reader = new FileReader();
    reader.onload = (e) => {
      const binaryString = e.target.result;
      const workbook = XLSX.read(binaryString, { type: 'binary' });
      const sheetName = workbook.SheetNames[0];
      const sheet = workbook.Sheets[sheetName];
      const data = XLSX.utils.sheet_to_json(sheet);
      setData(data);
    };
    reader.readAsBinaryString(file);
  };

  const sortData = (column, order = 'asc') => {
    const sortedData = [...data].sort((a, b) => {
      if (order === 'asc') {
        return a[column] > b[column] ? 1 : -1;
      } else {
        return a[column] < b[column] ? 1 : -1;
      }
    });
    setData(sortedData);
  };

  return (
    <div>
      <input type="file" accept=".xlsx" onChange={(e) => parseExcelFile(e.target.files[0])} />
      <table>
        <thead>
          <tr>
            {headers.map((header) => (
              <th key={header} onClick={() => sortData(header)}>
                {header}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {data.map((row, index) => (
            <tr key={index}>
              {headers.map((header) => (
                <td key={header}>{row[header]}</td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ExcelSortAndFilter;
