import { useReducer, Reducer } from 'react';

import { createContainer } from 'react-tracked';
import { User } from '../model/user';

const initialState = {
    user: new User('', '', []),
};

type State = typeof initialState;

type Action = { type: 'setUser'; user: User };

const reducer: Reducer<State, Action> = (state, action) => {
    switch (action.type) {
        case 'setUser':
            return {
                ...state,
                user: action.user,
            };
        default:
            throw new Error('unknown action type');
    }
};

const useValue = () => useReducer(reducer, initialState);

export const { Provider, useTracked } = createContainer(useValue);
