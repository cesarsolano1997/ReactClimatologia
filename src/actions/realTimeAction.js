import HttpClient from '../services/HttpClient';
import moment from 'moment';

export const GetHumTemPre = async () => {
    const fecha = moment().format('YYYY-MM-DD')
    const resultado = await HttpClient.post('Clima/HumTemPre', {
        "Id": "25C45B81-8A29-4669-9A0F-2CECD045880A",
        "FechaInicio": fecha,
        "FechaFin": fecha
    });

    return resultado
}

export const GetDirecWind = async () => {
    const fecha = moment().format('YYYY-MM-DD')


    const resultado = await HttpClient.post('Clima/Wind', {
        "Id": "25C45B81-8A29-4669-9A0F-2CECD045880A",
        "FechaInicio": fecha,
        "FechaFin": fecha
    });

    return resultado;
}

export const GetRoseWind = async () => {

    const fecha = moment().format('YYYY-MM-DD')
    const resultado = await HttpClient.post('Clima/RoseWind', {
        "Id": "94928F88-DB18-4254-A5A4-74A573D45B06",
        "FechaInicio": fecha,
        "FechaFin": fecha
    });

    return resultado;
}