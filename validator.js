
/*Objeto para validar los datos del formulario*/
/*
    varificar => parametros = array[objects] ===> array de objetos
            obj ===> {
                tipo:      ===> string del tipo de input (text, radio, checkbox, etc.)
                                       NOTA: si es otro tipo de validacion parsarle como valor "other"
                IdInput:   ===> string del Id del input o del name del input radio
                attr:      ===> array[] ==> validar los N° atributos que tiene ese elemento ( ["editvalue", "date-time"] ), 
                            ejemplo: <input type="text" id="txtFilas" data-minfila="2">
                array:     ===> array[] ==> variable o array construido que sera puesto a validar
                verificar: ===> string del tipo de metodo a verificar (DNI, Fecha, AlfaNum, etc..)
                                        NOTA: en el caso de que se pase un array en el objeto se debe pasar en verificar una funcion con parametros a la vez que se debe retornar el resultado
                                            ( function (elementoTarget,[index, arrayTarget] <== opcional) { return condicion a tomar } || (elementoTarget, [index, arrayTarget] <== opcional) => condicional )
                                            ejemplo: barra => barra.IdBarra == 2 && barra.Borrado == false

                mensaje:   ===> string Mensaje que se mostrara al no pasar la verificacion
            }
	
    regEx => params:
        _Value: string ====> valor que se obtiene del input
        type  : string ====> tipo de metodo a validar ese valor.
                            NOTA: el formato de fecha de la variable regexDateFormatDDMMYY es valido tanto para formato 31/12/2017 como 12/31/2017
*/

const regexNum = /^[0-9.,]+$/,
    regexMobil = /^[0-9-()+]{3,20}/,
    regexDateFormatMMYY = /^\d{1,2}\-\d{4}$/,
    egexDateFormatDDMMYY = /^\d{1,2}\-\d{1,2}\-\d{4}$/,
    regexDateFormatYYMMDD = /^\d{4}\-\d{1,2}\-\d{1,2}$/,
    regexDNI = /^[a-zA-Z0-9áéíóúàèìòùÀÈÌÒÙÁÉÍÓÚñÑüÜ$-\s]+$/,
    regexText = /^[a-zA-ZáéíóúàèìòùÀÈÌÒÙÁÉÍÓÚñÑüÜ$-._\s\"\']+$/,
    regexEmail = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
    regexAlfaNum = /^[a-zA-Z0-9áéíóúàèìòùÀÈÌÒÙÁÉÍÓÚñÑüÜ$-._\s\"\']+$/;

const Validator = {

    verificar(array) {

        const _lengthArray = array.length;

        let _return = true;

        for (let i = 0; i < _lengthArray; i++) {


            const _tipo = array[i].tipo,
                _verificar = array[i].verificar,
                _mensaje = array[i].mensaje;

            if (_tipo == 'other') {

                if (array[i].array !== undefined) {

                    const _arrayTarget = array[i].array;
                    const result = _arrayTarget.some(array[i].verificar);

                    if (result) {
                        alert(_mensaje);
                        _return = false;
                        break;
                    }

                }
                else if (_verificar) {
                    alert(_mensaje);
                    if (array[i].IdInput != undefined || array[i].IdInput != null) document.getElementById(array[i].IdInput).focus();
                    _return = false;
                    break;
                }

            } else {

                const _element = _tipo !== "radio" ? document.getElementById(array[i].IdInput) : "";
                let _value = _tipo !== "radio" ? _element.value : array[i].IdInput;

                if (array[i].attr) {

                    const arrayAttr = array[i].attr,
                        attrLength = arrayAttr.length;

                    for (let j = 0; attrLength > j; i++) {

                        _value = _element.getAttribute(arrayAttr[j]);

                        if (this.regEx(_value, _verificar)) {
                            alert(_mensaje);
                            if (_tipo !== "radio") _element.focus();
                            _return = false;
                            break;
                        }
                    }

                } else {

                    if (this.regEx(_value, _verificar)) {

                        alert(_mensaje);
                        if (_tipo !== "radio") _element.focus();
                        _return = false;
                        break;
                    }
                }

            }


        }

        return _return;
    },

    regEx(_Value, type) {
        const empty = _Value.toString().trim().length;
        let result = null;

        switch (type) {
            case "Alfa":
                result = empty === 0 || _Value === null || _Value === undefined || Alfa.test(_Value) !== true;
                break;
            case "Num":
                result = empty === 0 || _Value === null || _Value === undefined || Num.test(_Value) !== true;
                break;
            case "AlfaNum":
                result = empty === 0 || _Value === null || _Value === undefined || AlfaNum.test(_Value) !== true;
                break;
            case "DNI":
                result = empty === 0 || _Value === null || _Value === undefined || regexDNI.test(_Value) !== true;
                break;
            case "Email":
                result = empty === 0 || _Value === null || _Value === undefined || Email.test(_Value) !== true;
                break;
            case "DateFormatYYMMDD":
                result = empty === 0 || _Value === null || _Value === undefined;
                break;
            case "DateFormatDDMMYY":
                result = empty === 0 || _Value === null || _Value === undefined;
                break;
            case "DateFormatMMYY":
                result = empty === 0 || _Value === null || _Value === undefined;
                break;
            case "Mobil":
                result = empty === 0 || _Value === null || _Value === undefined || Mobil.test(_Value) !== true;
                break;
            case "radio":
                result = true;

                const _InputRadio = document.querySelectorAll(`input[type='radio'][name=${CSS.escape(_Value)}]`),
                    _LengthRadio = _InputRadio.length;

                for (let i = 0; _LengthRadio > i; i++) {
                    if (_InputRadio[i].checked) {
                        result = false;
                        break;
                    }
                }

                break;
            case "select":
                result = _Value === "" || _Value === null || _Value === undefined;
                break;
            case "Empty":
                result = empty === 0;
                break;
        }

        return result;
    }

}
