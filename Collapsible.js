import React,{useState,useEffect} from 'react';
import Collapse from '@mui/material/Collapse';
import IconButton from '@mui/material/IconButton';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import AddCircleOutline from '@mui/icons-material/AddCircleOutline';
import RemoveCircleOutline from '@mui/icons-material/RemoveCircleOutline';
import JsonData from './data.json';

const Row = (props) => {
  const { row } = props;
  const [open, setOpen] = useState(false);
  const[jsonData1, setJsonData]= useState([]);

  const handleAddRow = (Id) => {
    setOpen(!open)
    fetchData(Id);
    
  };

  const fetchData = (id) => {
    fetch('http://localhost:3000/Data/'+`${id}`+'.json')
    .then((res) => res.json())
    .then((response) => {
      setJsonData(response);
    })
  }

  return (
    <React.Fragment>
      <TableRow >
        <TableCell>{row.Id}</TableCell>
        <TableCell><IconButton   onClick={() =>handleAddRow(row.Id)}>
            {open ? <RemoveCircleOutline/> : <AddCircleOutline/>}
          </IconButton>{row.CompanyName}</TableCell>
        <TableCell>{row.FilesProcessed}</TableCell>
        <TableCell>{row.LastReportedPeriod}</TableCell>
        <TableCell>{row.LastFileProcessingDate}</TableCell>
      </TableRow>
      <TableRow>
        <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={12}>
          <Collapse in={open}>
            <TableContainer component={Paper}>
              <Table>
                <TableHead>
                  <TableRow><th align="right">QA Pending</th></TableRow>      
                  <TableRow>
                    <TableCell>DocumentId</TableCell>
                    <TableCell>Name Of Filing</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {jsonData1.map((i,key) => (
                    i.QAPending.map((item) =>(
                      <TableRow key={key}>
                      <TableCell>
                        {item.DocumentId}
                      </TableCell>
                      <TableCell>{item.NameOfFiling}</TableCell>
                    </TableRow>
                      ))
                      
                  ))}
                </TableBody>
              </Table>   
              </TableContainer>    
          </Collapse>
        </TableCell>
      </TableRow>
    </React.Fragment>
  );
}

 const CollapsibleTable = () => {
  return (
    
      <TableContainer component={Paper}>
        <Table aria-label="collapsible table">
          <TableHead>
            <TableRow>
              <TableCell>Id</TableCell>
              <TableCell>Company Name</TableCell>
              <TableCell>Files Processed</TableCell>
              <TableCell>Last Reported Period</TableCell>
              <TableCell>Last File Processing Date</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {JsonData.map((row) => (
              <Row key={row.Id} row={row} />
            ))}
          
          </TableBody>
        </Table>
      </TableContainer>
     
  );
}
 
export default CollapsibleTable;