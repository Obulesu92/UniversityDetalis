const TableBody = ({ tableData, columns }) => {

    return (
        <tbody>
            {tableData.map((data,index) => {
                return (
                    <tr key={index}>
                        {columns.map(({ accessor }) => {
                            const tData = data[accessor] ? data[accessor] : "_";
                            return <td key={accessor}>{tData}</td>
                        })}
                    </tr>
                );
            })}
        </tbody>
    );
};

export default TableBody;