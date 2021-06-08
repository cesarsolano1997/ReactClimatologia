import moment from 'moment';
import 'moment/locale/es';

moment().locale('es')

export const GetAllMonth = (numbreMonth) => {

    const NameMonth = capitalizeFirstletter(moment().month(numbreMonth - 1).format("MMMM"));

    return NameMonth;
}

function capitalizeFirstletter(str) {
    return str.charAt(0).toUpperCase() + str.slice(1);
 }