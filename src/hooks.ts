import useMediaQuery from '@material-ui/core/useMediaQuery';
import { useTheme } from '@material-ui/core/styles';
import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from './store';

export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector:TypedUseSelectorHook<RootState> = useSelector;

const theme = useTheme;
export const useXsDownMediaQuery = () => useMediaQuery(theme().breakpoints.down('xs'));
export const useMdDownMediaQuery = () => useMediaQuery(theme().breakpoints.down('md'));
export const useSmUpMediaQuery = () => useMediaQuery(theme().breakpoints.up('sm'));
