class Activities {
    
    constructor(){

        this.cacheDom();
        this.bindEvents();
        this.evalTasklist();

    }

    cacheDom(){

		this.taskInput = document.getElementById("input-task"); //Define que taskInput equivale ao elemento do HTML com o ID input-task
		this.addBtn = document.getElementById("add-task-btn"); //Define que addBtn equivale ao elemento do HTML com o ID add-task-btn
		this.tasklist = document.getElementById("tasks"); //Define que tasklist equivale ao elemento do HTML com o ID tasks
		this.tasklistChildren = this.tasklist.children; //Define tasklistChildren e retorna os elementos filhos do tasklist
		this.errorMessage = document.getElementById("error"); //Define que errorMessage equivale ao elemento do HTML com o ID error
    }

    bindEvents(){

        this.addBtn.onclick = this.addTask.bind(this);///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
        this.taskInput.onkeypress = this.enterKey.bind(this);////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    }

    evalTasklist(){

        var i, chkBox, delBtn;
		
		for (i = 0; i < this.tasklistChildren.length; i += 1) { // Começa com i = 0, quando i for menor que o numero de elementos em tasklistChildren i ira almentar 1
			//Adciona evento click nas checkbox
			chkBox = this.tasklistChildren[i].getElementsByTagName("input")[0]; // Cria uma variavel que é referente ao elemento pego com o nome da tag input na li  criada
			chkBox.onclick = this.completeTask.bind(this, this.tasklistChildren[i], chkBox); ////////////////////////////////////////////////////////////////////////////////////////////////////
			//Adciona evento click nos botoes de deletar
			delBtn = this.tasklistChildren[i].getElementsByTagName("button")[0]; // Cria uma variavel referente ao elemento pego com o nome button na li criada
			delBtn.onclick = this.delTask.bind(this, i); ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
		}
    }
    

    addLine(){

        var taskLi, taskChkbx, taskVal, taskBtn;

        taskLi = document.createElement("li"); // Cria um elemento node li e define a variavel taskLi como sendo esse elemento
        taskLi.setAttribute("class", "task");  // Da o atributo classe = task ao elemento criado

        taskChkbx = document.createElement("input"); // Cria um elemento de node com tipo e nome da tag input
        taskChkbx.setAttribute("type", "checkbox"); // Define este elemento como sendo do tipo checkbox

        taskVal = document.createTextNode(this.taskInput.value);  // Cria um node texto com o valor do que foi digitado no input

        taskBtn = document.createElement("button");  // Cria um botão
        taskBtn.innerHTML = "x"; // Defie o texto que aparecera no botão criado

        taskLi.appendChild(taskChkbx); // Acrescenta no node li criado o checkbox
        taskLi.appendChild(taskVal); // Acrescenta no node li criado o valor digitado no input
        taskLi.appendChild(taskBtn); // Acrescenta no node li criado o botão de deletar
			
        this.tasklist.appendChild(taskLi); // Acrescenta o node li a ul definida no HTML

    }

    completeTask (i, chkBox) {
        if (chkBox.checked) {
            i.className = "task completed"; // Se o checkbox estiver marcado define o nome da classe como task complete
        } else {
            this.incompleteTask(i); // Caso não esteja marcado o campo checkbox realiza a função incompleteTask para o indice selecionado
        }
    }

    incompleteTask(i) {
        i.className = "task"; // define o nome da classe para task no indice em que esta sendo realizado
    }

    enterKey(event) {
        if (event.keyCode === 13 || event.which === 13) {// A tecla com valor 13 é o enter, quando ela for pressionada ira realizar o codigo addTask
            this.addTask();// Verifica se tem valor digitado, caso não exista da erro carro exista roda o codigo addLine, taskInput e evalTasklist
        }
    }

    addTask() {
        var value = this.taskInput.value; //Define a variavel value com o valor digitado na taskInput
        this.errorMessage.style.display = "none"; // Faz a mensagem de erro desaparecer apos digitar algo e enviar

        if (value === ""){

            this.error(); // Se não for digitado nada no input dara a mensagem de erro definida na função error
        } else {

            this.addLine(); // Caso seja digitado algo ira realizar a função addLine, que ira criar uma task e adicionar na linda de baixo
            this.taskInput.value = ""; // Faz o valor voltar a ser nulo no input
            this.evalTasklist(); // Executa o metodo evalTasklist
        }
    }

    delTask(i) {
        this.tasklist.children[i].remove(); // Remove o elemento filho da tasklist com o index i selecionado 
        this.evalTasklist(); // Executa o metodo evalTasklist
    }

    error(){

        this.errorMessage.style.display = "block"; //Faz aparecer a mensagem definida de erro no HTML 
    }

}
