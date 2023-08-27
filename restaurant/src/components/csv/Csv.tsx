import { CSVLink, CSVDownload } from "react-csv";
export default function Csv() {
  const csvData = [
    ["firstname", "lastname", "email"],
    ["Ahmed", "Tomi", "ah@smthing.co.com"],
    ["Raed", "Labes", "rl@smthing.co.com"],
    ["Yezzi", "Min l3b", "ymin@cocococo.com"],
  ];

  return (
    <>
      <CSVLink data={csvData}>Download me</CSVLink>
      {/* <CSVDownload data={csvData} target="_blank" /> */}
    </>
  );
}
