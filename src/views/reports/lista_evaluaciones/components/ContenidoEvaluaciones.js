import React, { useEffect, useContext } from 'react';
import EvalContext from '../../../../context/evaluaciones/evaluacionesContext';
import CardFiltrado from './CardFiltrado';

const ContenidoEvaluaciones = () => {

    const evalContext = useContext(EvalContext);
    const { evaluaciones, filtrados } = evalContext;

    useEffect(() => {
     
    }, [filtrados])

    return (
        <div>
            {
                filtrados.map(fl => (
                    <CardFiltrado
                        key={fl}
                        name={fl}
                        data={evaluaciones.filter(ev => ev.Filtrado === fl)}
                    />
                ))

            }
        </div>
    )
}

export default ContenidoEvaluaciones;
