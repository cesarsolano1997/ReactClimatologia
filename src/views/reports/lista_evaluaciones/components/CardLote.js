import React from 'react'
import { Typography, Card, CardContent, makeStyles, Table, TableHead, TableRow, TableCell, TableBody } from '@material-ui/core';
import { GetAllMonth } from '../../../../utils/utils';

const useStyles = makeStyles((theme) => ({

    card: {
        margin: theme.spacing(3),
        transition: "0.3s",
        "&:hover": {
            boxShadow: "10px 10px 5px 0px rgba(184,184,184,1)"
        },
        border: "1px solid black",
        width: '300px'
    }
}));

const CardLote = ({ mes, data }) => {

    const classes = useStyles();

    return data.length > 0 ? (
        // <Card className={classes.card} >
        //     <CardContent>
        //         <Typography variant="h6">{GetAllMonth(mes)}</Typography>
        //         <Table>
        //             <TableHead>
        //                 <TableRow>
        //                     <TableCell>Lote</TableCell>
        //                     <TableCell>Conteo</TableCell>
        //                     <TableCell>Detalle</TableCell>
        //                 </TableRow>
        //             </TableHead> 
        //             <TableBody>
        //                 {data.map((dt, index) =>
        //                     <TableRow key={index} >
        //                         <TableCell>{dt.Lote}</TableCell>
        //                         <TableCell>{dt.Conteo}</TableCell>
        //                         <TableCell><a href="#">Ver detalle</a></TableCell>
        //                     </TableRow>
        //                 )}
        //             </TableBody>
        //         </Table>
        //     </CardContent>
        // </Card>
        <Table>
            <TableHead>
                <TableRow>
                    <TableCell>Lote</TableCell>
                    <TableCell>Conteo</TableCell>
                    <TableCell>Detalle</TableCell>
                </TableRow>
            </TableHead>
        </Table>
    ) : null;
}

export default CardLote;
