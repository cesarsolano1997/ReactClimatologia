import React, { useState, useEffect, useContext } from 'react'
import { v4 as uuidv4 } from 'uuid';
import CardLote from './CardLote';
import EvalContext from '../../../../context/evaluaciones/evaluacionesContext';
import {
    Box,
    Card,
    CardContent,
    makeStyles,
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableRow,
    TablePagination,
    TableContainer
} from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
    mes: {
        margin: theme.spacing(1),
        width: "20%"
    }
}));

const columns = [
    { id: 'name', label: 'Name', minWidth: 170 },
    { id: 'code', label: 'ISO\u00a0Code', minWidth: 100 },
    {
        id: 'population',
        label: 'Population',
        minWidth: 170,
        align: 'right',
        format: (value) => value.toLocaleString('en-US'),
    },
    {
        id: 'size',
        label: 'Size\u00a0(km\u00b2)',
        minWidth: 170,
        align: 'right',
        format: (value) => value.toLocaleString('en-US'),
    },
    {
        id: 'density',
        label: 'Density',
        minWidth: 170,
        align: 'right',
        format: (value) => value.toFixed(2),
    },
];

function createData(name, code, population, size) {
    const density = population / size;
    return { name, code, population, size, density };
}

const rows = [
    createData('India', 'IN', 1324171354, 3287263),
    createData('China', 'CN', 1403500365, 9596961),
    createData('Italy', 'IT', 60483973, 301340),
    createData('United States', 'US', 327167434, 9833520),
    createData('Canada', 'CA', 37602103, 9984670),
    createData('Australia', 'AU', 25475400, 7692024),
    createData('Germany', 'DE', 83019200, 357578),
    createData('Ireland', 'IE', 4857000, 70273),
    createData('Mexico', 'MX', 126577691, 1972550),
    createData('Japan', 'JP', 126317000, 377973),
    createData('France', 'FR', 67022000, 640679),
    createData('United Kingdom', 'GB', 67545757, 242495),
    createData('Russia', 'RU', 146793744, 17098246),
    createData('Nigeria', 'NG', 200962417, 923768),
    createData('Brazil', 'BR', 210147125, 8515767),
];

const CardTurno = ({ data, name }) => {

    const classes = useStyles();

    // Context
    const evalContext = useContext(EvalContext);
    const { meses } = evalContext;

    //State
    const [lotes, setLotes] = useState([]);

    // const [rows, setRows] = useState([]);
    // const [columns, setColumns] = useState([]);


    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(10);

    useEffect(() => {

        // Filtrado de lotes
        const ArrLote = data.map(dt => dt.Lote);

        const filterLotes = ArrLote.filter((valor, indice) => {
            return ArrLote.indexOf(valor) === indice;
        }
        );

        setLotes(filterLotes);


        // Asignación de 1.columnas y 2.filas

        //1.columnas
        // const dtColumn = [{ id: "LoteMes", label: "Lotes/Meses", minWidth: 170 }];

        // meses.map(mes => dtColumn.push({ id: mes, label: mes, minWidth: 170 }))
        // dtColumn.push({ id: "Opcion", label: "Opción", minWidth: 170 })

        // setColumns(dtColumn);

        // //2.filas

        // for (let i = 0; i < lotes.length; i++) {
        //     // setRows(...rows,Object.values(createRows(lotes[i])))
        //     // setRows({
        //     //     ...rows,
        //     //     "asd": Object.values(createRows(lotes[i]))
        //     // })
        //     rows.push(createRows(lotes[i]))
        // }


    }, [data]);

    //functions
    const createRows = (lote) => {

        let objRows = { "LoteMes": lote, 1: 0, 2: 0, 3: 0, 4: 0, 5: 0, 6: 0 };


        return objRows;
    }

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(+event.target.value);
        setPage(0);
    };

    console.log("Columnas", columns)
    console.log("Filas", rows)

    return (
        <>
            <Box>
                Turno: {name}

            </Box>
            <Box display="flex" flexDirection="row" flexWrap="wrap">
                <TableContainer>
                    <Table>
                        <TableHead>
                            <TableRow>
                                {columns.map((column) => (
                                    <TableCell
                                        key={column.id}
                                        align={column.align}
                                        style={{ minWidth: column.minWidth }}
                                    >
                                        {column.label}
                                    </TableCell>
                                ))}
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {rows.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((row, index) => {


                                return (
                                    <TableRow hover role="checkbox" tabIndex={-1} key={row.code}>
                                        {columns.map((column, index) => {
                                            const value = row[column.id];

                                            return (
                                                <TableCell key={column.id} align={column.align}>
                                                    { value}
                                                </TableCell>
                                            );
                                        })}
                                    </TableRow>
                                );


                            })}


                        </TableBody>
                    </Table>
                </TableContainer>
                <TablePagination
                    rowsPerPageOptions={[10, 25, 100]}
                    component="div"
                    count={rows.length}
                    rowsPerPage={rowsPerPage}
                    page={page}
                    onChangePage={handleChangePage}
                    onChangeRowsPerPage={handleChangeRowsPerPage}
                />

                {/* {

                    meses.map((option,index) =>
                        <CardLote
                            key={index}
                            mes={option}
                            data={data.filter(fl => fl.Mes === option)}
                        />

                    )
                } */}
            </Box>

        </>
    )
}

export default CardTurno
