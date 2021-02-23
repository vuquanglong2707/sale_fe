import * as ServicesActions from './serviceExtension/redux/action';
import * as Selection from './Selection/redux/action';
export default {
    ...ServicesActions,
    ...Selection
}
