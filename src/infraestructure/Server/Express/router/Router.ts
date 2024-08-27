
import {ServerExpress} from '..';


export default interface IRouter {
 usar( server : ServerExpress.Server  ) : Promise<void>
}
