const form = document.querySelector(".validate");

let validate = {
    resetError: () => {
        document.querySelectorAll("input.error").forEach( item => item.classList.remove("error") )
        document.querySelectorAll(".error-helper").forEach( item => item.remove() );
    },
    sendError: (item, message) => {
        item.classList.add("error");
        item.parentElement.innerHTML += `<div class="error-helper">${message}</div>`;
    },
    doValidation: () => {
        validate.resetError();
        let inputs = form.querySelectorAll("[data-validate]").forEach( (item) => {
            let rules = item.getAttribute("data-validate").split("|");
            for (let r of rules) {
                let rule = r.split(":");
                switch (rule[0]) {
                    case "required":
                        if (item.value === "") {
                            validate.sendError(item, "Este campo é obrigatório");
                            return false;
                        }
                        break;
        
                    case "min":
                        if (!item.value !== '') {
                            if (item.value.length < rule[1]) {
                                validate.sendError(item, `Este campo deve possuir ao menos ${rule[1]} caracteres` )
                                return false;
                            }
                        }
                        break;
        
                    case "max":
                        if (!item.value !== '') {
                            if (item.value.length > rule[1]) {
                                validate.sendError(item, `Este campo deve possuir no máximo ${rule[1]} caracteres`);
                                return false;
                            }
                        }
                        break;
        
                    case "email":
                        if (!item.value !== '') {
                            if (!item.value.match(/^\D[a-z\.\_\d]+@[a-z]+[\.a-z]*\.[a-z]{2,5}$/)) {
                                validate.sendError(item, "Informe um email válido");
                                return false;
                            }
                        }
                        break;

                    case "phone":
                        if (!item.value === '') {
                            if (!item.value.match(/aa/)) {
                                validate.sendError(item, "Informe um email válido");
                                return false;
                            }
                        }
                        break;
                }
            }
    
            return true;
        })
    }
}

form.addEventListener("submit", (event) => {
    event.preventDefault();

    if (validate.doValidation()) {
        form.submit();
    }

})