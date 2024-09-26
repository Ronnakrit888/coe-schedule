import localfont from "next/font/local";

export const morKhor = localfont({
    src: [
        {
            path: "./MorKhor.ttf",
            weight: '200',
        },
    ],
    variable: "--font-MorKhor",
});

export const poppins = localfont({
    src: [
        {
            path: "./Poppins.ttf", 
            weight: '200',
        },
    ],
    variable: "--font-Poppins",
});
