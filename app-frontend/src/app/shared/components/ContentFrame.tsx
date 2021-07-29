import { Box, CircularProgress } from '@material-ui/core';
import React from 'react';
import ScrollableBox from './ScrollableBox';
import { Add, ErrorOutline, Refresh, Archive } from '@material-ui/icons';
import InfoCardWithButton from './InfoCardWithButton';
import { lightBlue, lightGreen, red } from '@material-ui/core/colors';

function Load() {
    return (
        <Box flex="1" display="flex" alignItems="center" justifyContent="center" flexDirection="column">
            <CircularProgress color="secondary" size={50} thickness={2} />
        </Box>
    );
}

function EmptyList(props: { buttonCreateText?: string; buttonCreateIcon?: JSX.Element; onClick?: () => void }) {
    return (
        <Box flex="1" display="flex" alignItems="center" justifyContent="center" flexDirection="column">
            <InfoCardWithButton
                icon={<Archive />}
                buttonIcon={props.buttonCreateIcon ?? <Add />}
                buttonText={props.buttonCreateText ?? 'Criar'}
                description="Está Vazio"
                buttonColor={lightGreen}
                textColor={lightBlue}
                onClick={props.onClick}
            />
        </Box>
    );
}

function Error(props: { onClick?: () => void }) {
    return (
        <Box flex="1" display="flex" alignItems="center" justifyContent="center" flexDirection="column">
            <InfoCardWithButton
                icon={<ErrorOutline />}
                buttonIcon={<Refresh />}
                buttonText="Tentar Novamente"
                description="Não foi possível exibir os dados"
                textColor={red}
                buttonColor={lightBlue}
                onClick={props.onClick}
            />
        </Box>
    );
}

type Props = {
    list: any[] | null;
    load: boolean;
    children?: any;
    onCreateClick?: () => void;
    onTryAgainClick?: () => void;
    buttonCreateText?: string;
    buttonCreateIcon?: JSX.Element;
    disableScroll?: boolean;
};

export default function ContentFrame(props: Props) {
    if (props.load) {
        return <Load />;
    } else if (props.list === null) {
        return <Error onClick={props.onTryAgainClick} />;
    } else if (props.list.length === 0) {
        return (
            <EmptyList
                onClick={props.onCreateClick}
                buttonCreateText={props.buttonCreateText}
                buttonCreateIcon={props.buttonCreateIcon}
            />
        );
    } else {
        if (props.disableScroll) {
            return (
                <Box display="flex" flexDirection="column" flex={1} p={3}>
                    {props.children}
                </Box>
            );
        }

        return <ScrollableBox>{props.children}</ScrollableBox>;
    }
}
