import { configureStore} from '@reduxjs/toolkit';
import rootReducer from './usersSlice';

const store = configureStore({
    reducer : {
        api : rootReducer
    }
});

export default store;
