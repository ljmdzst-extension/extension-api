export default interface ITransaction {
    commit() : Promise<any>;
    rollback()  : Promise<any>;
    afterCommit() : any;
    LOCK : any;
}