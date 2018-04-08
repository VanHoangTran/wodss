import {Route} from 'react-router-dom';

class PrivateRoute extends Route {

    render() {
        return (<h1>Hallo Welt, MatchList here!</h1>);
    }

}

export default MatchList;