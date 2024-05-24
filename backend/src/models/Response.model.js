// ce fichier contient une classe pour structurer les réponses


export class ResponseStructure {
    message = "";
    code = 200;
    constructor(message, code) {
        this.message = message;
        this.code = code;
    }
}
