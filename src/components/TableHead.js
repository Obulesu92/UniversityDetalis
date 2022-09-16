
import { useState } from "react";

const TableHead = ({ columns, handleSorting,sortable }) => {

    const [sortField, setSortField] = useState("");
    const [order, setOrder] = useState("asc");
    // const [selectCountry, setSelectCountry] =useState('Country');

    const handleSortingChange =(accessor)=> {
        const sortOrder=
        accessor=== sortField && order ==="asc"?"desc":"asc";
        setSortField(accessor);
        setOrder(sortOrder);
        handleSorting(accessor,sortOrder)
    }

    // const handleCountryChange = (e)=>{
    //     setSelectCountry(e.target.value)
    // }

    return (
        <thead>
            <tr>
                {columns.map(({ label, accessor, sortable }) => {
                    return (
                    <th
                    key={accessor} 
                    onClick={sortable ? () => handleSortingChange(accessor):null}
                    
                    >
                        {label}
                    </th>
                    );
                })}
            </tr>
        </thead>
    );
};

export default TableHead;
