import React, { useState, useEffect } from 'react';
import TableBody from './TableBody';
import TableHead from './TableHead';
import Dropdown from './Dropdown';

const Table = () => {

    const [tableData, setTableData] = useState([]);

    useEffect(() => {
        fetch('http://universities.hipolabs.com/search?country=United+States')
            .then((res) => res.json())
            .then((res) => {
                setTableData(res)
                console.log(res);
            })
    }, [])

    const columns = [
        { label: "Name", accessor: "name", sortable: true, dropdown:false },
        { label: "Country", accessor: "country", sortable: true,  Column: () => {
            return <Dropdown {...tableData} />;
          } },
        { label: "Country Code", accessor: "alpha_two_code", sortable: true },
        { label: "Domains", accessor: "domains", sortable: true }
    ];

    //basic sort() function
        // const arr2 = ["z", "a", "b", "c"];

        // arr2.sort((a, b) => (a < b ? -1 : 1));
        // console.log(arr2); // ["a", "b", "c", "z"]

    const handleSorting = (sortField, sortOrder) => {
        if (sortField) {

            const sorted = [...tableData].sort((a, b) => {

                if (a[sortField] === null) return 1;
                if (b[sortField] === null) return -1;
                if (a[sortField] === null && b[sortField] === null) return 0;

                return (
                    a[sortField].toString().localeCompare(b[sortField].toString(), "en", {
                        numeric: true,
                    }) * (sortOrder === "asc" ? 1 : -1)
                );
            });

            setTableData(sorted);
        }
    }

    return (
        <>
            <table className='table'>
                <TableHead {...{ columns, handleSorting }} />
                <TableBody {...{ columns, tableData }} />
            </table>
        </>
    );
}

export default Table;