import HttpClient from '../services/HttpClient';


export const GetCamposAgricolas = async (Id, Consulta) => {
    const resultado = await HttpClient.get("evaluaciones/campoagricola", {
       params: {
           Id,
           Consulta
       }
    });

    return resultado;
}