import { colors } from "@mui/material";

export const getGradientTextStyle = {
    background: 'linear-gradient(to right, #003f56, #0077a2)',
    WebkitBackgroundClip: 'text',
    WebkitTextFillColor: 'transparent',
    display: 'inline-block',
    flexGrow: 1,
};

export const getInlineGradientTextStyle = {
    background: 'linear-gradient(to left, #003f56, #0178a3)',
    WebkitBackgroundClip: 'text',
    WebkitTextFillColor: 'transparent',
    display: 'inline-block',
    flexGrow: 1,
};

export const hoverStyle = {
    '&:hover': {
        backgroundColor: 'rgba(255, 255, 255, 0.1)', // Slight hover effect
    },
};