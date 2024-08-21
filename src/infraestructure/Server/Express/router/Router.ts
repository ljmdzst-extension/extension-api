
import ServerExpress from '../server/ServerExpress';


export default interface IRouter {
 usar( server : ServerExpress  ) : Promise<void>
}
