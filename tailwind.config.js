module.exports = {
  purge: {
    content: ['./src/**/*.html', './src/**/*.md']
  },
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      typography: {
        DEFAULT: {
          css: [
            {
            code: {
                color: '#cb4040',
                background: '#f9f2f4',
                borderRadius: '3px',
                padding: '2px 4px',
                fontSize: '90%'
            },
            'code::before': {
              content:'none',
            },
            'code::after': {
              content:'none',
            }
        }
        ],
        },
      },
    },
  },
  variants: {},
  plugins: [
    require('@tailwindcss/typography'),
  ],
}