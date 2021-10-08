import { useTheme } from '@mui/material/styles';
import useMediaQuery from '@mui/material/useMediaQuery';
import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from './store';

export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector:TypedUseSelectorHook<RootState> = useSelector;

const theme = useTheme;
export const useXsDownMediaQuery = () => useMediaQuery(theme().breakpoints.only('xs'));
export const useMdDownMediaQuery = () => useMediaQuery(theme().breakpoints.down('md'));
export const useSmUpMediaQuery = () => useMediaQuery(theme().breakpoints.up('sm'));
export const useSmDownMediaQuery = () => useMediaQuery(theme().breakpoints.down('sm'));
export const useMdUpMediaQuery = () => useMediaQuery(theme().breakpoints.up('md'));
