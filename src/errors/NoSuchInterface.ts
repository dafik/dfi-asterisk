import QueueMember from "../models/queues/QueueMemberModel";

class NoSuchInterface extends Error {
    public member;

    constructor(message: string, member?: QueueMember) {
        super(message);
        this.message = message;
        this.name = "NoSuchInterface";

        this.member = member;
    }
}
export default NoSuchInterface;
