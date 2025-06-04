module.exports = {
    content: ['./src/**/*.{js,ts,jsx,tsx}'],
    theme: {
        colors: {
            back: 'var(--back)',
            primary: 'var(--primary)',
            surface: 'var(--surface)',
            main: 'var(--main)',
            active: 'var(--active)',
            inactive: 'var(--inactive)',
            accent: 'var(--accent)',
            'accent-hover': 'var(--accent-hover)',
            success: 'var(--success)',
            error: 'var(--error)'
        },
        extend: {
            fontFamily: { 
                sans: ['var(--font-sans)', 'Helvetica', 'Arial', 'sans-serif'],
                quote: ['var(--font-quote)', 'serif']
            },
            backgroundImage: {
                'gradient-primary': 'linear-gradient(220deg, var(--back), var(--primary), var(--back))',
            }
        }
    },
    plugins: []
};