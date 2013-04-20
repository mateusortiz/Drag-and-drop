!function (window, undefined){
	"use strict";

	var _startX = 0; //posição inicial do mouse
	var _startY = 0;
	var _offsetX = 0; //estado corrente do elemento offset
	var _offsetY = 0; 
	var _dragElement; //é necessário ser passado a partir de OnMouseDown para OnMouseMove
	var _oldZIndex; // precisamos, temporariamente, aumentar o índice z durante arrasto
	
	window.onload = function() {

		var square = document.getElementById('square');
		square.style.display = "block";
		square.style.background = "#00A093";
		document.onmousedown = OnMouseDown;
		document.onmouseup = OnMouseUp;
	}

	function OnMouseDown(e) {
		// O IE não passa o objeto evento
		if(e == null){
			e = window.event;
		}

		var target = e.target != null ? e.target : e.srcElement;

		if((e.button == 1 && window.event != null || e.button == 0)) {

			//pegando as posições
			_startX = e.clientX;
			_startY = e.clientY;

			// pegando o a posição dos elementos clicados
			_offsetX = ExtractNumber(target.style.left);
			_offsetY = ExtractNumber(target.style.top);

			//trazer o elemento clicado para frente enquanto 
			//está sendo movimentado com o mouse
			_oldZIndex = target.style.zIndex;
			target.style.zIndex = 1000;

			//precisamos acessar o elemento da função OnMouseMove
			_dragElement = target;

			//chamando o codigo que ira fazer o movimento do elemento com o mouse
			document.onmousemove = OnMouseMove;

			//cancelamento de qualquer texto selecionado
			document.body.focus();

			//previne texto selecionado no ie
			document.onselectstart = function() {
				return false;
			};

			//previne o ie de draguear uma 
			target.ondragstart = function() {
				return false;
			}

			//previne a seleção de texto (exceto no ie)
			return false;


		}

	}

	function OnMouseUp() {
		if (_dragElement != null) {
			_dragElement.style.zIndex = _oldZIndex;

			//Os eventos ocorrerão até o próximo OnMouseDown
			document.onmousemove = null;
			document.onselectstart = null;
			_dragElement.ondragstart = null;

			_dragElement = null;
		}
	}

	function OnMouseMove(e) {
		if(e == null) {
			var e = window.event;
		}

		//Este é o atual "código do drag and drop"
		_dragElement.style.left = (_offsetX + e.clientX - _startX) + 'px';
		_dragElement.style.top = (_offsetY + e.clientY - _startY) + 'px';
	}

	function ExtractNumber(value) {
		var n = parseInt(value);

		return n==null || isNaN(n) ? 0:n;
	}


}(this);
