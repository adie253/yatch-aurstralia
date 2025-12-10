/** @type {import('tailwindcss').Config} */
export default {
    content: [
        "./index.html",
        "./src/**/*.{js,ts,jsx,tsx}",
    ],
    theme: {
        extend: {
            colors: {
                primary: '#ffffff', // White Background
                secondary: '#f8f9fa', // Light Gray Section Background
                accent: '#c5a059',  // Gold Accents
                'text-main': '#0f172a', // Navy/Slate for body text
                'text-light': '#64748b', // Slate for secondary text
                'navy-rich': '#0b131e', // Dark Navy for contrast elements/Footer
            },
            fontFamily: {
                sans: ['Lato', 'sans-serif'],
                serif: ['Playfair Display', 'serif'],
            },
            backgroundImage: {
                'hero-pattern': "url('https://images.unsplash.com/photo-1540946485063-a40da27545f8?auto=format&fit=crop&q=80&w=1600')",
            }
        },
    },
    plugins: [],
}
