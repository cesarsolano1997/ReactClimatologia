import React, {useState} from 'react';
import {
    TextField
} from '@material-ui/core';
import Autocomplete from '@material-ui/lab/Autocomplete';

const useCombobox = (label,stateIncial, opciones, fn) => {

    const [state, actualizarState] = useState(stateIncial);
    
    const Combo = () => (
        <Autocomplete
            disableCloseOnSelect
            options={opciones}
            getOptionLabel={(option) => option.DESCRIPCION ? option.DESCRIPCION : option}
            onChange={(event, newValue) => {
                actualizarState(newValue);
            }}
            getOptionSelected={(option, value) => option.DESCRIPCION === value.DESCRIPCION }
            value={state}
            style={{ width: 300 }}
            renderInput={(params) => <TextField {...params} label={label} variant="outlined" />}
        />
    )

    return [state, Combo, actualizarState]
}

export default useCombobox
