import gluestackPlugin from '@gluestack-ui/nativewind-utils/tailwind-plugin';

export default {
  darkMode: 'media',
  content: [
    'index.{tsx,jsx,ts,js}',
    'src/**/*.{tsx,jsx,ts,js}',
    'app/**/*.{tsx,jsx,ts,js}',
    'components/**/*.{tsx,jsx,ts,js}',
  ],
  presets: [require('nativewind/preset')],
  safelist: [
    {
      pattern:
        /(bg|border|text|stroke|fill)-(primary|secondary|tertiary|error|success|warning|info|typography|outline|background|indicator)-(0|50|100|200|300|400|500|600|700|800|900|950|white|gray|black|error|warning|muted|success|info|light|dark|primary)/,
    },
  ],
  theme: {
    extend: {
      screens: {
        "base": "0px"
      },

      colors: {
        primary: {
          0: 'rgb(var(--color-primary-0)/<alpha-value>)',
          50: 'rgb(var(--color-primary-50)/<alpha-value>)',
          100: 'rgb(var(--color-primary-100)/<alpha-value>)',
          200: 'rgb(var(--color-primary-200)/<alpha-value>)',
          300: 'rgb(var(--color-primary-300)/<alpha-value>)',
          400: 'rgb(var(--color-primary-400)/<alpha-value>)',
          500: 'rgb(var(--color-primary-500)/<alpha-value>)',
          600: 'rgb(var(--color-primary-600)/<alpha-value>)',
          700: 'rgb(var(--color-primary-700)/<alpha-value>)',
          800: 'rgb(var(--color-primary-800)/<alpha-value>)',
          900: 'rgb(var(--color-primary-900)/<alpha-value>)',
          950: 'rgb(var(--color-primary-950)/<alpha-value>)',
        },

        secondary: {
          0: 'rgb(var(--color-secondary-0)/<alpha-value>)',
          50: 'rgb(var(--color-secondary-50)/<alpha-value>)',
          100: 'rgb(var(--color-secondary-100)/<alpha-value>)',
          200: 'rgb(var(--color-secondary-200)/<alpha-value>)',
          300: 'rgb(var(--color-secondary-300)/<alpha-value>)',
          400: 'rgb(var(--color-secondary-400)/<alpha-value>)',
          500: 'rgb(var(--color-secondary-500)/<alpha-value>)',
          600: 'rgb(var(--color-secondary-600)/<alpha-value>)',
          700: 'rgb(var(--color-secondary-700)/<alpha-value>)',
          800: 'rgb(var(--color-secondary-800)/<alpha-value>)',
          900: 'rgb(var(--color-secondary-900)/<alpha-value>)',
          950: 'rgb(var(--color-secondary-950)/<alpha-value>)',
        },

        tertiary: {
          50: 'rgb(var(--color-tertiary-50)/<alpha-value>)',
          100: 'rgb(var(--color-tertiary-100)/<alpha-value>)',
          200: 'rgb(var(--color-tertiary-200)/<alpha-value>)',
          300: 'rgb(var(--color-tertiary-300)/<alpha-value>)',
          400: 'rgb(var(--color-tertiary-400)/<alpha-value>)',
          500: 'rgb(var(--color-tertiary-500)/<alpha-value>)',
          600: 'rgb(var(--color-tertiary-600)/<alpha-value>)',
          700: 'rgb(var(--color-tertiary-700)/<alpha-value>)',
          800: 'rgb(var(--color-tertiary-800)/<alpha-value>)',
          900: 'rgb(var(--color-tertiary-900)/<alpha-value>)',
          950: 'rgb(var(--color-tertiary-950)/<alpha-value>)',
        },

        error: {
          0: 'rgb(var(--color-error-0)/<alpha-value>)',
          50: 'rgb(var(--color-error-50)/<alpha-value>)',
          100: 'rgb(var(--color-error-100)/<alpha-value>)',
          200: 'rgb(var(--color-error-200)/<alpha-value>)',
          300: 'rgb(var(--color-error-300)/<alpha-value>)',
          400: 'rgb(var(--color-error-400)/<alpha-value>)',
          500: 'rgb(var(--color-error-500)/<alpha-value>)',
          600: 'rgb(var(--color-error-600)/<alpha-value>)',
          700: 'rgb(var(--color-error-700)/<alpha-value>)',
          800: 'rgb(var(--color-error-800)/<alpha-value>)',
          900: 'rgb(var(--color-error-900)/<alpha-value>)',
          950: 'rgb(var(--color-error-950)/<alpha-value>)',
        },

        success: {
          0: 'rgb(var(--color-success-0)/<alpha-value>)',
          50: 'rgb(var(--color-success-50)/<alpha-value>)',
          100: 'rgb(var(--color-success-100)/<alpha-value>)',
          200: 'rgb(var(--color-success-200)/<alpha-value>)',
          300: 'rgb(var(--color-success-300)/<alpha-value>)',
          400: 'rgb(var(--color-success-400)/<alpha-value>)',
          500: 'rgb(var(--color-success-500)/<alpha-value>)',
          600: 'rgb(var(--color-success-600)/<alpha-value>)',
          700: 'rgb(var(--color-success-700)/<alpha-value>)',
          800: 'rgb(var(--color-success-800)/<alpha-value>)',
          900: 'rgb(var(--color-success-900)/<alpha-value>)',
          950: 'rgb(var(--color-success-950)/<alpha-value>)',
        },

        warning: {
          0: 'rgb(var(--color-warning-0)/<alpha-value>)',
          50: 'rgb(var(--color-warning-50)/<alpha-value>)',
          100: 'rgb(var(--color-warning-100)/<alpha-value>)',
          200: 'rgb(var(--color-warning-200)/<alpha-value>)',
          300: 'rgb(var(--color-warning-300)/<alpha-value>)',
          400: 'rgb(var(--color-warning-400)/<alpha-value>)',
          500: 'rgb(var(--color-warning-500)/<alpha-value>)',
          600: 'rgb(var(--color-warning-600)/<alpha-value>)',
          700: 'rgb(var(--color-warning-700)/<alpha-value>)',
          800: 'rgb(var(--color-warning-800)/<alpha-value>)',
          900: 'rgb(var(--color-warning-900)/<alpha-value>)',
          950: 'rgb(var(--color-warning-950)/<alpha-value>)',
        },

        info: {
          0: 'rgb(var(--color-info-0)/<alpha-value>)',
          50: 'rgb(var(--color-info-50)/<alpha-value>)',
          100: 'rgb(var(--color-info-100)/<alpha-value>)',
          200: 'rgb(var(--color-info-200)/<alpha-value>)',
          300: 'rgb(var(--color-info-300)/<alpha-value>)',
          400: 'rgb(var(--color-info-400)/<alpha-value>)',
          500: 'rgb(var(--color-info-500)/<alpha-value>)',
          600: 'rgb(var(--color-info-600)/<alpha-value>)',
          700: 'rgb(var(--color-info-700)/<alpha-value>)',
          800: 'rgb(var(--color-info-800)/<alpha-value>)',
          900: 'rgb(var(--color-info-900)/<alpha-value>)',
          950: 'rgb(var(--color-info-950)/<alpha-value>)',
        },

        typography: {
          0: 'rgb(var(--color-typography-0)/<alpha-value>)',
          50: 'rgb(var(--color-typography-50)/<alpha-value>)',
          100: 'rgb(var(--color-typography-100)/<alpha-value>)',
          200: 'rgb(var(--color-typography-200)/<alpha-value>)',
          300: 'rgb(var(--color-typography-300)/<alpha-value>)',
          400: 'rgb(var(--color-typography-400)/<alpha-value>)',
          500: 'rgb(var(--color-typography-500)/<alpha-value>)',
          600: 'rgb(var(--color-typography-600)/<alpha-value>)',
          700: 'rgb(var(--color-typography-700)/<alpha-value>)',
          800: 'rgb(var(--color-typography-800)/<alpha-value>)',
          900: 'rgb(var(--color-typography-900)/<alpha-value>)',
          950: 'rgb(var(--color-typography-950)/<alpha-value>)',
          white: '#FFFFFF',
          gray: '#D4D4D4',
          black: '#181718',
        },

        outline: {
          0: 'rgb(var(--color-outline-0)/<alpha-value>)',
          50: 'rgb(var(--color-outline-50)/<alpha-value>)',
          100: 'rgb(var(--color-outline-100)/<alpha-value>)',
          200: 'rgb(var(--color-outline-200)/<alpha-value>)',
          300: 'rgb(var(--color-outline-300)/<alpha-value>)',
          400: 'rgb(var(--color-outline-400)/<alpha-value>)',
          500: 'rgb(var(--color-outline-500)/<alpha-value>)',
          600: 'rgb(var(--color-outline-600)/<alpha-value>)',
          700: 'rgb(var(--color-outline-700)/<alpha-value>)',
          800: 'rgb(var(--color-outline-800)/<alpha-value>)',
          900: 'rgb(var(--color-outline-900)/<alpha-value>)',
          950: 'rgb(var(--color-outline-950)/<alpha-value>)',
        },

        background: {
          0: 'rgb(var(--color-background-0)/<alpha-value>)',
          50: 'rgb(var(--color-background-50)/<alpha-value>)',
          100: 'rgb(var(--color-background-100)/<alpha-value>)',
          200: 'rgb(var(--color-background-200)/<alpha-value>)',
          300: 'rgb(var(--color-background-300)/<alpha-value>)',
          400: 'rgb(var(--color-background-400)/<alpha-value>)',
          500: 'rgb(var(--color-background-500)/<alpha-value>)',
          600: 'rgb(var(--color-background-600)/<alpha-value>)',
          700: 'rgb(var(--color-background-700)/<alpha-value>)',
          800: 'rgb(var(--color-background-800)/<alpha-value>)',
          900: 'rgb(var(--color-background-900)/<alpha-value>)',
          950: 'rgb(var(--color-background-950)/<alpha-value>)',
          error: 'rgb(var(--color-background-error)/<alpha-value>)',
          warning: 'rgb(var(--color-background-warning)/<alpha-value>)',
          muted: 'rgb(var(--color-background-muted)/<alpha-value>)',
          success: 'rgb(var(--color-background-success)/<alpha-value>)',
          info: 'rgb(var(--color-background-info)/<alpha-value>)',
          light: '#FBFBFB',
          dark: '#181719',
        },

        indicator: {
          primary: 'rgb(var(--color-indicator-primary)/<alpha-value>)',
          info: 'rgb(var(--color-indicator-info)/<alpha-value>)',
          error: 'rgb(var(--color-indicator-error)/<alpha-value>)',
        },

        rose: {
          50: "rgb(var(--color-rose-50)/<alpha-value>)",
          100: "rgb(var(--color-rose-100)/<alpha-value>)",
          200: "rgb(var(--color-rose-200)/<alpha-value>)",
          300: "rgb(var(--color-rose-300)/<alpha-value>)",
          400: "rgb(var(--color-rose-400)/<alpha-value>)",
          500: "rgb(var(--color-rose-500)/<alpha-value>)",
          600: "rgb(var(--color-rose-600)/<alpha-value>)",
          700: "rgb(var(--color-rose-700)/<alpha-value>)",
          800: "rgb(var(--color-rose-800)/<alpha-value>)",
          900: "rgb(var(--color-rose-900)/<alpha-value>)"
        },

        pink: {
          50: "rgb(var(--color-pink-50)/<alpha-value>)",
          100: "rgb(var(--color-pink-100)/<alpha-value>)",
          200: "rgb(var(--color-pink-200)/<alpha-value>)",
          300: "rgb(var(--color-pink-300)/<alpha-value>)",
          400: "rgb(var(--color-pink-400)/<alpha-value>)",
          500: "rgb(var(--color-pink-500)/<alpha-value>)",
          600: "rgb(var(--color-pink-600)/<alpha-value>)",
          700: "rgb(var(--color-pink-700)/<alpha-value>)",
          800: "rgb(var(--color-pink-800)/<alpha-value>)",
          900: "rgb(var(--color-pink-900)/<alpha-value>)"
        },

        fuchsia: {
          50: "rgb(var(--color-fuchsia-50)/<alpha-value>)",
          100: "rgb(var(--color-fuchsia-100)/<alpha-value>)",
          200: "rgb(var(--color-fuchsia-200)/<alpha-value>)",
          300: "rgb(var(--color-fuchsia-300)/<alpha-value>)",
          400: "rgb(var(--color-fuchsia-400)/<alpha-value>)",
          500: "rgb(var(--color-fuchsia-500)/<alpha-value>)",
          600: "rgb(var(--color-fuchsia-600)/<alpha-value>)",
          700: "rgb(var(--color-fuchsia-700)/<alpha-value>)",
          800: "rgb(var(--color-fuchsia-800)/<alpha-value>)",
          900: "rgb(var(--color-fuchsia-900)/<alpha-value>)"
        },

        purple: {
          50: "rgb(var(--color-purple-50)/<alpha-value>)",
          100: "rgb(var(--color-purple-100)/<alpha-value>)",
          200: "rgb(var(--color-purple-200)/<alpha-value>)",
          300: "rgb(var(--color-purple-300)/<alpha-value>)",
          400: "rgb(var(--color-purple-400)/<alpha-value>)",
          500: "rgb(var(--color-purple-500)/<alpha-value>)",
          600: "rgb(var(--color-purple-600)/<alpha-value>)",
          700: "rgb(var(--color-purple-700)/<alpha-value>)",
          800: "rgb(var(--color-purple-800)/<alpha-value>)",
          900: "rgb(var(--color-purple-900)/<alpha-value>)"
        },

        violet: {
          50: "rgb(var(--color-violet-50)/<alpha-value>)",
          100: "rgb(var(--color-violet-100)/<alpha-value>)",
          200: "rgb(var(--color-violet-200)/<alpha-value>)",
          300: "rgb(var(--color-violet-300)/<alpha-value>)",
          400: "rgb(var(--color-violet-400)/<alpha-value>)",
          500: "rgb(var(--color-violet-500)/<alpha-value>)",
          600: "rgb(var(--color-violet-600)/<alpha-value>)",
          700: "rgb(var(--color-violet-700)/<alpha-value>)",
          800: "rgb(var(--color-violet-800)/<alpha-value>)",
          900: "rgb(var(--color-violet-900)/<alpha-value>)"
        },

        indigo: {
          50: "rgb(var(--color-indigo-50)/<alpha-value>)",
          100: "rgb(var(--color-indigo-100)/<alpha-value>)",
          200: "rgb(var(--color-indigo-200)/<alpha-value>)",
          300: "rgb(var(--color-indigo-300)/<alpha-value>)",
          400: "rgb(var(--color-indigo-400)/<alpha-value>)",
          500: "rgb(var(--color-indigo-500)/<alpha-value>)",
          600: "rgb(var(--color-indigo-600)/<alpha-value>)",
          700: "rgb(var(--color-indigo-700)/<alpha-value>)",
          800: "rgb(var(--color-indigo-800)/<alpha-value>)",
          900: "rgb(var(--color-indigo-900)/<alpha-value>)"
        },

        blue: {
          50: "rgb(var(--color-blue-50)/<alpha-value>)",
          100: "rgb(var(--color-blue-100)/<alpha-value>)",
          200: "rgb(var(--color-blue-200)/<alpha-value>)",
          300: "rgb(var(--color-blue-300)/<alpha-value>)",
          400: "rgb(var(--color-blue-400)/<alpha-value>)",
          500: "rgb(var(--color-blue-500)/<alpha-value>)",
          600: "rgb(var(--color-blue-600)/<alpha-value>)",
          700: "rgb(var(--color-blue-700)/<alpha-value>)",
          800: "rgb(var(--color-blue-800)/<alpha-value>)",
          900: "rgb(var(--color-blue-900)/<alpha-value>)"
        },

        lightBlue: {
          50: "rgb(var(--color-lightBlue-50)/<alpha-value>)",
          100: "rgb(var(--color-lightBlue-100)/<alpha-value>)",
          200: "rgb(var(--color-lightBlue-200)/<alpha-value>)",
          300: "rgb(var(--color-lightBlue-300)/<alpha-value>)",
          400: "rgb(var(--color-lightBlue-400)/<alpha-value>)",
          500: "rgb(var(--color-lightBlue-500)/<alpha-value>)",
          600: "rgb(var(--color-lightBlue-600)/<alpha-value>)",
          700: "rgb(var(--color-lightBlue-700)/<alpha-value>)",
          800: "rgb(var(--color-lightBlue-800)/<alpha-value>)",
          900: "rgb(var(--color-lightBlue-900)/<alpha-value>)"
        },

        darkBlue: {
          50: "rgb(var(--color-darkBlue-50)/<alpha-value>)",
          100: "rgb(var(--color-darkBlue-100)/<alpha-value>)",
          200: "rgb(var(--color-darkBlue-200)/<alpha-value>)",
          300: "rgb(var(--color-darkBlue-300)/<alpha-value>)",
          400: "rgb(var(--color-darkBlue-400)/<alpha-value>)",
          500: "rgb(var(--color-darkBlue-500)/<alpha-value>)",
          600: "rgb(var(--color-darkBlue-600)/<alpha-value>)",
          700: "rgb(var(--color-darkBlue-700)/<alpha-value>)",
          800: "rgb(var(--color-darkBlue-800)/<alpha-value>)",
          900: "rgb(var(--color-darkBlue-900)/<alpha-value>)"
        },

        cyan: {
          50: "rgb(var(--color-cyan-50)/<alpha-value>)",
          100: "rgb(var(--color-cyan-100)/<alpha-value>)",
          200: "rgb(var(--color-cyan-200)/<alpha-value>)",
          300: "rgb(var(--color-cyan-300)/<alpha-value>)",
          400: "rgb(var(--color-cyan-400)/<alpha-value>)",
          500: "rgb(var(--color-cyan-500)/<alpha-value>)",
          600: "rgb(var(--color-cyan-600)/<alpha-value>)",
          700: "rgb(var(--color-cyan-700)/<alpha-value>)",
          800: "rgb(var(--color-cyan-800)/<alpha-value>)",
          900: "rgb(var(--color-cyan-900)/<alpha-value>)"
        },

        teal: {
          50: "rgb(var(--color-teal-50)/<alpha-value>)",
          100: "rgb(var(--color-teal-100)/<alpha-value>)",
          200: "rgb(var(--color-teal-200)/<alpha-value>)",
          300: "rgb(var(--color-teal-300)/<alpha-value>)",
          400: "rgb(var(--color-teal-400)/<alpha-value>)",
          500: "rgb(var(--color-teal-500)/<alpha-value>)",
          600: "rgb(var(--color-teal-600)/<alpha-value>)",
          700: "rgb(var(--color-teal-700)/<alpha-value>)",
          800: "rgb(var(--color-teal-800)/<alpha-value>)",
          900: "rgb(var(--color-teal-900)/<alpha-value>)"
        },

        emerald: {
          50: "rgb(var(--color-emerald-50)/<alpha-value>)",
          100: "rgb(var(--color-emerald-100)/<alpha-value>)",
          200: "rgb(var(--color-emerald-200)/<alpha-value>)",
          300: "rgb(var(--color-emerald-300)/<alpha-value>)",
          400: "rgb(var(--color-emerald-400)/<alpha-value>)",
          500: "rgb(var(--color-emerald-500)/<alpha-value>)",
          600: "rgb(var(--color-emerald-600)/<alpha-value>)",
          700: "rgb(var(--color-emerald-700)/<alpha-value>)",
          800: "rgb(var(--color-emerald-800)/<alpha-value>)",
          900: "rgb(var(--color-emerald-900)/<alpha-value>)"
        },

        green: {
          50: "rgb(var(--color-green-50)/<alpha-value>)",
          100: "rgb(var(--color-green-100)/<alpha-value>)",
          200: "rgb(var(--color-green-200)/<alpha-value>)",
          300: "rgb(var(--color-green-300)/<alpha-value>)",
          400: "rgb(var(--color-green-400)/<alpha-value>)",
          500: "rgb(var(--color-green-500)/<alpha-value>)",
          600: "rgb(var(--color-green-600)/<alpha-value>)",
          700: "rgb(var(--color-green-700)/<alpha-value>)",
          800: "rgb(var(--color-green-800)/<alpha-value>)",
          900: "rgb(var(--color-green-900)/<alpha-value>)"
        },

        lime: {
          50: "rgb(var(--color-lime-50)/<alpha-value>)",
          100: "rgb(var(--color-lime-100)/<alpha-value>)",
          200: "rgb(var(--color-lime-200)/<alpha-value>)",
          300: "rgb(var(--color-lime-300)/<alpha-value>)",
          400: "rgb(var(--color-lime-400)/<alpha-value>)",
          500: "rgb(var(--color-lime-500)/<alpha-value>)",
          600: "rgb(var(--color-lime-600)/<alpha-value>)",
          700: "rgb(var(--color-lime-700)/<alpha-value>)",
          800: "rgb(var(--color-lime-800)/<alpha-value>)",
          900: "rgb(var(--color-lime-900)/<alpha-value>)"
        },

        yellow: {
          50: "rgb(var(--color-yellow-50)/<alpha-value>)",
          100: "rgb(var(--color-yellow-100)/<alpha-value>)",
          200: "rgb(var(--color-yellow-200)/<alpha-value>)",
          300: "rgb(var(--color-yellow-300)/<alpha-value>)",
          400: "rgb(var(--color-yellow-400)/<alpha-value>)",
          500: "rgb(var(--color-yellow-500)/<alpha-value>)",
          600: "rgb(var(--color-yellow-600)/<alpha-value>)",
          700: "rgb(var(--color-yellow-700)/<alpha-value>)",
          800: "rgb(var(--color-yellow-800)/<alpha-value>)",
          900: "rgb(var(--color-yellow-900)/<alpha-value>)"
        },

        amber: {
          50: "rgb(var(--color-amber-50)/<alpha-value>)",
          100: "rgb(var(--color-amber-100)/<alpha-value>)",
          200: "rgb(var(--color-amber-200)/<alpha-value>)",
          300: "rgb(var(--color-amber-300)/<alpha-value>)",
          400: "rgb(var(--color-amber-400)/<alpha-value>)",
          500: "rgb(var(--color-amber-500)/<alpha-value>)",
          600: "rgb(var(--color-amber-600)/<alpha-value>)",
          700: "rgb(var(--color-amber-700)/<alpha-value>)",
          800: "rgb(var(--color-amber-800)/<alpha-value>)",
          900: "rgb(var(--color-amber-900)/<alpha-value>)"
        },

        orange: {
          50: "rgb(var(--color-orange-50)/<alpha-value>)",
          100: "rgb(var(--color-orange-100)/<alpha-value>)",
          200: "rgb(var(--color-orange-200)/<alpha-value>)",
          300: "rgb(var(--color-orange-300)/<alpha-value>)",
          400: "rgb(var(--color-orange-400)/<alpha-value>)",
          500: "rgb(var(--color-orange-500)/<alpha-value>)",
          600: "rgb(var(--color-orange-600)/<alpha-value>)",
          700: "rgb(var(--color-orange-700)/<alpha-value>)",
          800: "rgb(var(--color-orange-800)/<alpha-value>)",
          900: "rgb(var(--color-orange-900)/<alpha-value>)"
        },

        red: {
          50: "rgb(var(--color-red-50)/<alpha-value>)",
          100: "rgb(var(--color-red-100)/<alpha-value>)",
          200: "rgb(var(--color-red-200)/<alpha-value>)",
          300: "rgb(var(--color-red-300)/<alpha-value>)",
          400: "rgb(var(--color-red-400)/<alpha-value>)",
          500: "rgb(var(--color-red-500)/<alpha-value>)",
          600: "rgb(var(--color-red-600)/<alpha-value>)",
          700: "rgb(var(--color-red-700)/<alpha-value>)",
          800: "rgb(var(--color-red-800)/<alpha-value>)",
          900: "rgb(var(--color-red-900)/<alpha-value>)"
        },

        warmGray: {
          50: "rgb(var(--color-warmGray-50)/<alpha-value>)",
          100: "rgb(var(--color-warmGray-100)/<alpha-value>)",
          200: "rgb(var(--color-warmGray-200)/<alpha-value>)",
          300: "rgb(var(--color-warmGray-300)/<alpha-value>)",
          400: "rgb(var(--color-warmGray-400)/<alpha-value>)",
          500: "rgb(var(--color-warmGray-500)/<alpha-value>)",
          600: "rgb(var(--color-warmGray-600)/<alpha-value>)",
          700: "rgb(var(--color-warmGray-700)/<alpha-value>)",
          800: "rgb(var(--color-warmGray-800)/<alpha-value>)",
          900: "rgb(var(--color-warmGray-900)/<alpha-value>)"
        },

        trueGray: {
          50: "rgb(var(--color-trueGray-50)/<alpha-value>)",
          100: "rgb(var(--color-trueGray-100)/<alpha-value>)",
          200: "rgb(var(--color-trueGray-200)/<alpha-value>)",
          300: "rgb(var(--color-trueGray-300)/<alpha-value>)",
          400: "rgb(var(--color-trueGray-400)/<alpha-value>)",
          500: "rgb(var(--color-trueGray-500)/<alpha-value>)",
          600: "rgb(var(--color-trueGray-600)/<alpha-value>)",
          700: "rgb(var(--color-trueGray-700)/<alpha-value>)",
          800: "rgb(var(--color-trueGray-800)/<alpha-value>)",
          900: "rgb(var(--color-trueGray-900)/<alpha-value>)"
        },

        coolGray: {
          50: "rgb(var(--color-coolGray-50)/<alpha-value>)",
          100: "rgb(var(--color-coolGray-100)/<alpha-value>)",
          200: "rgb(var(--color-coolGray-200)/<alpha-value>)",
          300: "rgb(var(--color-coolGray-300)/<alpha-value>)",
          400: "rgb(var(--color-coolGray-400)/<alpha-value>)",
          500: "rgb(var(--color-coolGray-500)/<alpha-value>)",
          600: "rgb(var(--color-coolGray-600)/<alpha-value>)",
          700: "rgb(var(--color-coolGray-700)/<alpha-value>)",
          800: "rgb(var(--color-coolGray-800)/<alpha-value>)",
          900: "rgb(var(--color-coolGray-900)/<alpha-value>)"
        },

        blueGray: {
          50: "rgb(var(--color-blueGray-50)/<alpha-value>)",
          100: "rgb(var(--color-blueGray-100)/<alpha-value>)",
          200: "rgb(var(--color-blueGray-200)/<alpha-value>)",
          300: "rgb(var(--color-blueGray-300)/<alpha-value>)",
          400: "rgb(var(--color-blueGray-400)/<alpha-value>)",
          500: "rgb(var(--color-blueGray-500)/<alpha-value>)",
          600: "rgb(var(--color-blueGray-600)/<alpha-value>)",
          700: "rgb(var(--color-blueGray-700)/<alpha-value>)",
          800: "rgb(var(--color-blueGray-800)/<alpha-value>)",
          900: "rgb(var(--color-blueGray-900)/<alpha-value>)"
        },

        light: {
          50: "rgb(var(--color-light-50)/<alpha-value>)",
          100: "rgb(var(--color-light-100)/<alpha-value>)",
          200: "rgb(var(--color-light-200)/<alpha-value>)",
          300: "rgb(var(--color-light-300)/<alpha-value>)",
          400: "rgb(var(--color-light-400)/<alpha-value>)",
          500: "rgb(var(--color-light-500)/<alpha-value>)",
          600: "rgb(var(--color-light-600)/<alpha-value>)",
          700: "rgb(var(--color-light-700)/<alpha-value>)",
          800: "rgb(var(--color-light-800)/<alpha-value>)",
          900: "rgb(var(--color-light-900)/<alpha-value>)"
        },

        textLight: {
          0: "rgb(var(--color-textLight-0)/<alpha-value>)",
          50: "rgb(var(--color-textLight-50)/<alpha-value>)",
          100: "rgb(var(--color-textLight-100)/<alpha-value>)",
          200: "rgb(var(--color-textLight-200)/<alpha-value>)",
          300: "rgb(var(--color-textLight-300)/<alpha-value>)",
          400: "rgb(var(--color-textLight-400)/<alpha-value>)",
          500: "rgb(var(--color-textLight-500)/<alpha-value>)",
          600: "rgb(var(--color-textLight-600)/<alpha-value>)",
          700: "rgb(var(--color-textLight-700)/<alpha-value>)",
          800: "rgb(var(--color-textLight-800)/<alpha-value>)",
          900: "rgb(var(--color-textLight-900)/<alpha-value>)",
          950: "rgb(var(--color-textLight-950)/<alpha-value>)"
        },

        textDark: {
          0: "rgb(var(--color-textDark-0)/<alpha-value>)",
          50: "rgb(var(--color-textDark-50)/<alpha-value>)",
          100: "rgb(var(--color-textDark-100)/<alpha-value>)",
          200: "rgb(var(--color-textDark-200)/<alpha-value>)",
          300: "rgb(var(--color-textDark-300)/<alpha-value>)",
          400: "rgb(var(--color-textDark-400)/<alpha-value>)",
          500: "rgb(var(--color-textDark-500)/<alpha-value>)",
          600: "rgb(var(--color-textDark-600)/<alpha-value>)",
          700: "rgb(var(--color-textDark-700)/<alpha-value>)",
          800: "rgb(var(--color-textDark-800)/<alpha-value>)",
          900: "rgb(var(--color-textDark-900)/<alpha-value>)",
          950: "rgb(var(--color-textDark-950)/<alpha-value>)"
        },

        borderDark: {
          0: "rgb(var(--color-borderDark-0)/<alpha-value>)",
          50: "rgb(var(--color-borderDark-50)/<alpha-value>)",
          100: "rgb(var(--color-borderDark-100)/<alpha-value>)",
          200: "rgb(var(--color-borderDark-200)/<alpha-value>)",
          300: "rgb(var(--color-borderDark-300)/<alpha-value>)",
          400: "rgb(var(--color-borderDark-400)/<alpha-value>)",
          500: "rgb(var(--color-borderDark-500)/<alpha-value>)",
          600: "rgb(var(--color-borderDark-600)/<alpha-value>)",
          700: "rgb(var(--color-borderDark-700)/<alpha-value>)",
          800: "rgb(var(--color-borderDark-800)/<alpha-value>)",
          900: "rgb(var(--color-borderDark-900)/<alpha-value>)",
          950: "rgb(var(--color-borderDark-950)/<alpha-value>)"
        },

        borderLight: {
          0: "rgb(var(--color-borderLight-0)/<alpha-value>)",
          50: "rgb(var(--color-borderLight-50)/<alpha-value>)",
          100: "rgb(var(--color-borderLight-100)/<alpha-value>)",
          200: "rgb(var(--color-borderLight-200)/<alpha-value>)",
          300: "rgb(var(--color-borderLight-300)/<alpha-value>)",
          400: "rgb(var(--color-borderLight-400)/<alpha-value>)",
          500: "rgb(var(--color-borderLight-500)/<alpha-value>)",
          600: "rgb(var(--color-borderLight-600)/<alpha-value>)",
          700: "rgb(var(--color-borderLight-700)/<alpha-value>)",
          800: "rgb(var(--color-borderLight-800)/<alpha-value>)",
          900: "rgb(var(--color-borderLight-900)/<alpha-value>)",
          950: "rgb(var(--color-borderLight-950)/<alpha-value>)"
        },

        backgroundDark: {
          0: "rgb(var(--color-backgroundDark-0)/<alpha-value>)",
          50: "rgb(var(--color-backgroundDark-50)/<alpha-value>)",
          100: "rgb(var(--color-backgroundDark-100)/<alpha-value>)",
          200: "rgb(var(--color-backgroundDark-200)/<alpha-value>)",
          300: "rgb(var(--color-backgroundDark-300)/<alpha-value>)",
          400: "rgb(var(--color-backgroundDark-400)/<alpha-value>)",
          500: "rgb(var(--color-backgroundDark-500)/<alpha-value>)",
          600: "rgb(var(--color-backgroundDark-600)/<alpha-value>)",
          700: "rgb(var(--color-backgroundDark-700)/<alpha-value>)",
          800: "rgb(var(--color-backgroundDark-800)/<alpha-value>)",
          900: "rgb(var(--color-backgroundDark-900)/<alpha-value>)",
          950: "rgb(var(--color-backgroundDark-950)/<alpha-value>)"
        },

        backgroundLight: {
          0: "rgb(var(--color-backgroundLight-0)/<alpha-value>)",
          50: "rgb(var(--color-backgroundLight-50)/<alpha-value>)",
          100: "rgb(var(--color-backgroundLight-100)/<alpha-value>)",
          200: "rgb(var(--color-backgroundLight-200)/<alpha-value>)",
          300: "rgb(var(--color-backgroundLight-300)/<alpha-value>)",
          400: "rgb(var(--color-backgroundLight-400)/<alpha-value>)",
          500: "rgb(var(--color-backgroundLight-500)/<alpha-value>)",
          600: "rgb(var(--color-backgroundLight-600)/<alpha-value>)",
          700: "rgb(var(--color-backgroundLight-700)/<alpha-value>)",
          800: "rgb(var(--color-backgroundLight-800)/<alpha-value>)",
          900: "rgb(var(--color-backgroundLight-900)/<alpha-value>)",
          950: "rgb(var(--color-backgroundLight-950)/<alpha-value>)"
        },

        "backgroundLightError": "rgb(var(--color-backgroundLightError)/<alpha-value>)",
        "backgroundDarkError": "rgb(var(--color-backgroundDarkError)/<alpha-value>)",
        "backgroundLightWarning": "rgb(var(--color-backgroundLightWarning)/<alpha-value>)",
        "backgroundDarkWarning": "rgb(var(--color-backgroundDarkWarning)/<alpha-value>)",
        "backgroundLightSuccess": "rgb(var(--color-backgroundLightSuccess)/<alpha-value>)",
        "backgroundDarkSuccess": "rgb(var(--color-backgroundDarkSuccess)/<alpha-value>)",
        "backgroundLightInfo": "rgb(var(--color-backgroundLightInfo)/<alpha-value>)",
        "backgroundDarkInfo": "rgb(var(--color-backgroundDarkInfo)/<alpha-value>)",
        "backgroundLightMuted": "rgb(var(--color-backgroundLightMuted)/<alpha-value>)",
        "backgroundDarkMuted": "rgb(var(--color-backgroundDarkMuted)/<alpha-value>)",
        "white": "rgb(var(--color-white)/<alpha-value>)",
        "black": "rgb(var(--color-black)/<alpha-value>)"
      },

      fontFamily: {
        heading: undefined,
        body: undefined,
        mono: undefined,
        roboto: ['Roboto', 'sans-serif'],
      },

      fontWeight: {
        extrablack: '950',
      },

      fontSize: {
        '2xs': '10px',
      },

      boxShadow: {
        'hard-1': '-2px 2px 8px 0px rgba(38, 38, 38, 0.20)',
        'hard-2': '0px 3px 10px 0px rgba(38, 38, 38, 0.20)',
        'hard-3': '2px 2px 8px 0px rgba(38, 38, 38, 0.20)',
        'hard-4': '0px -3px 10px 0px rgba(38, 38, 38, 0.20)',
        'hard-5': '0px 2px 10px 0px rgba(38, 38, 38, 0.10)',
        'soft-1': '0px 0px 10px rgba(38, 38, 38, 0.1)',
        'soft-2': '0px 0px 20px rgba(38, 38, 38, 0.2)',
        'soft-3': '0px 0px 30px rgba(38, 38, 38, 0.1)',
        'soft-4': '0px 0px 40px rgba(38, 38, 38, 0.1)',
      }
    },
  },
  plugins: [gluestackPlugin],
};
