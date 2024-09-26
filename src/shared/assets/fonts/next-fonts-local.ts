import localfont from "next/font/local";

export const morKhor = localfont({
    src : [
        {
            path : "./MorKhor.ttf",
            weight : '200',
        },
    ],
    variable : "--font-MorKhor",
})