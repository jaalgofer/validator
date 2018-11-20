
	/*Objeto para validar los datos del formulario*/
	/*
		varificar => parametros = array[objects] ===> array de objetos
				obj ===> {
					tipo:      ===> string del tipo de input (text, radio, checkbox, etc.)
										   NOTA: si es otro tipo de validacion parsarle como valor "other"
					IdInput:   ===> string del Id del input o del name del input radio
					verificar: ===> string del tipo de metodo a verificar (DNI, Fecha, AlfaNum, etc..)
					mensaje:   ===> string Mensaje que se mostrara al no pasar la verificacion
				}
	
		regEx => params:
			_Value: string ====> valor que se obtiene del input
			type  : string ====> tipo de metodo a validar ese valor.
	*/

const Validator = {

	verificar(array){

		const _lengthArray = array.length;

		let _return = true;

		for (let i = 0; i < _lengthArray; i++) {

			const _tipo = array[i].tipo,
				_element = _tipo !== "radio" ? document.getElementById(array[i].IdInput) : "",
				_value = _tipo !== "radio" ? _element.value : array[i].IdInput,
				_verificar = array[i].verificar,
				_mensaje = array[i].mensaje;

			if (this.regEx(_value, _verificar)) {

				alert(_mensaje);
				if (_tipo !== "radio") _element.focus();
				_return = false;
				break;

			}

		}

		return _return;
	},

	regEx(_Value, type) {
		const Alfa = /^[a-zA-ZáéíóúàèìòùÀÈÌÒÙÁÉÍÓÚñÑüÜ._\s]+$/, Num = /^[0-9]+$/,
			AlfaNum = /^[a-zA-Z0-9áéíóúàèìòùÀÈÌÒÙÁÉÍÓÚñÑüÜ._\s]+$/,
			Email = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
			Fecha = /^\d{4}\-\d{1,2}\-\d{1,2}$/, Mobil = /^[0-9-()+]{3,20}/,
			empty = _Value.toString().trim().length;
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
			case "Email":
				result = empty === 0 || _Value === null || _Value === undefined || Email.test(_Value) !== true;
				break;
			case "Fecha":
				result = empty === 0 || _Value === null || _Value === undefined || Fecha.test(_Value) !== true;
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
