import { createBrowserHistory } from "history";

const history = createBrowserHistory();
const navigate = to => history.push(to);

export { history, navigate };