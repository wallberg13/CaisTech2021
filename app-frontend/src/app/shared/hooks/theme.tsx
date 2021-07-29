import React from 'react';
import { createMuiTheme, ThemeProvider as MuiThemeProvider, Theme } from '@material-ui/core/styles';

import { useTheme } from '@material-ui/core/styles';

interface ThemeProviderProps {
    children: React.ReactNode;
    theme: Theme;
}

const ThemeDispatchContext = React.createContext<any>(null);

// eslint-disable-next-line react/prop-types
const ThemeProvider: React.FC<ThemeProviderProps> = ({ children, theme }) => {
    const themeInitialOptions = {
        paletteType: 'dark',
    };

    const [themeOptions, dispatch] = React.useReducer((state: any, action: any) => {
        switch (action.type) {
            case 'changeTheme':
                return {
                    ...state,
                    paletteType: action.payload,
                };
            default:
                throw new Error();
        }
    }, themeInitialOptions);

    const memoizedTheme = React.useMemo(() => {
        return createMuiTheme({
            ...theme,
            palette: {
                type: themeOptions.paletteType,
                primary: {
                    main: '#00264B',
                },
                secondary: {
                    main: '#0090FF',
                },
                background: {
                    default: themeOptions.paletteType === 'dark' ? '#141414' : '#fafafa',
                    paper: themeOptions.paletteType === 'dark' ? '#1B1B1B' : '#fff',
                },
            },
        });
    }, [theme, themeOptions.paletteType]);

    return (
        <MuiThemeProvider theme={memoizedTheme}>
            <ThemeDispatchContext.Provider value={dispatch}>{children}</ThemeDispatchContext.Provider>
        </MuiThemeProvider>
    );
};

export default ThemeProvider;

export const useChangeTheme = () => {
    const dispatch = React.useContext(ThemeDispatchContext);
    const theme = useTheme();
    const changeTheme = React.useCallback(
        () =>
            dispatch({
                type: 'changeTheme',
                payload: theme.palette.type === 'light' ? 'dark' : 'light',
            }),
        [theme.palette.type, dispatch],
    );

    return changeTheme;
};
