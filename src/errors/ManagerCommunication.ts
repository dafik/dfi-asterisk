class ManagerCommunication extends Error {

    constructor(message: string) {
        super(message);
        this.message = message;
        this.name = "ManagerCommunication";
    }
}
export default ManagerCommunication;
