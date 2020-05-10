import { combineReducers } from "redux";
import { reducer as FormReducer } from "redux-form";
import testReducer from "../features/test/TestReducer";
import eventReducer from "../features/event/eventReducer";
import modalsReducer from "../features/modals/modalsReducer";
import authReducer from "../features/auth/authReducer";

const rootReducer = combineReducers({
    form: FormReducer,
    test: testReducer,
    events: eventReducer,
    modals: modalsReducer,
    auth: authReducer,
});

export default rootReducer;