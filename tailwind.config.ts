import type { Config } from "tailwindcss";

export default {
    darkMode: ["class"],
    content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
  	extend: {
  		colors: {
  			background: 'hsl(var(--background))',
  			foreground: 'hsl(var(--foreground))',
  			card: {
  				DEFAULT: 'hsl(var(--card))',
  				foreground: 'hsl(var(--card-foreground))'
  			},
  			popover: {
  				DEFAULT: 'hsl(var(--popover))',
  				foreground: 'hsl(var(--popover-foreground))'
  			},
  			primary: {
  				DEFAULT: 'hsl(var(--primary))',
  				foreground: 'hsl(var(--primary-foreground))'
  			},
  			secondary: {
  				DEFAULT: 'hsl(var(--secondary))',
  				foreground: 'hsl(var(--secondary-foreground))'
  			},
  			muted: {
  				DEFAULT: 'hsl(var(--muted))',
  				foreground: 'hsl(var(--muted-foreground))'
  			},
  			accent: {
  				DEFAULT: 'hsl(var(--accent))',
  				foreground: 'hsl(var(--accent-foreground))'
  			},
  			destructive: {
  				DEFAULT: 'hsl(var(--destructive))',
  				foreground: 'hsl(var(--destructive-foreground))'
  			},
  			border: 'hsl(var(--border))',
  			input: 'hsl(var(--input))',
  			ring: 'hsl(var(--ring))',
  			chart: {
  				'1': 'hsl(var(--chart-1))',
  				'2': 'hsl(var(--chart-2))',
  				'3': 'hsl(var(--chart-3))',
  				'4': 'hsl(var(--chart-4))',
  				'5': 'hsl(var(--chart-5))'
  			},
  			sidebar: {
  				DEFAULT: 'hsl(var(--sidebar-background))',
  				foreground: 'hsl(var(--sidebar-foreground))',
  				primary: 'hsl(var(--sidebar-primary))',
  				'primary-foreground': 'hsl(var(--sidebar-primary-foreground))',
  				accent: 'hsl(var(--sidebar-accent))',
  				'accent-foreground': 'hsl(var(--sidebar-accent-foreground))',
  				border: 'hsl(var(--sidebar-border))',
  				ring: 'hsl(var(--sidebar-ring))'
  			}
  		},
  		borderRadius: {
  			lg: 'var(--radius)',
  			md: 'calc(var(--radius) - 2px)',
  			sm: 'calc(var(--radius) - 4px)'
  		},
  		animation: {
  			'float': 'float 3s ease-in-out infinite',
  			'glow': 'glow 2s ease-in-out infinite',
  			'scroll-continuous': 'scroll 20s linear infinite',
  			'shimmer': 'shimmer 2s infinite',
  			'float-delay-1': 'float 3s ease-in-out infinite 0.2s',
  			'float-delay-2': 'float 3s ease-in-out infinite 0.4s',
  			'pulse-glow': 'pulse-glow 2s ease-in-out infinite',
  			'slide-up': 'slide-up 0.6s ease-out',
  			'slide-in': 'slide-in 0.5s ease-out',
  			'fade-in': 'fade-in 0.5s ease-out',
  			'bounce-soft': 'bounce-soft 1s ease-in-out infinite',
  			'gradient-flow': 'gradient-flow 6s ease infinite',
  			'rotate-gradient': 'rotate-gradient 8s linear infinite',
  			'scale-pulse': 'scale-pulse 2s ease-in-out infinite',
  			'text-shimmer': 'text-shimmer 3s ease-in-out infinite',
  			'rainbow': 'rainbow 6s linear infinite',
  			'neon-glow': 'neon-glow 2s ease-in-out infinite',
  			'spin-slow': 'spin 4s linear infinite'
  		},
  		keyframes: {
  			float: {
  				'0%, 100%': { transform: 'translateY(0px)' },
  				'50%': { transform: 'translateY(-8px)' }
  			},
  			glow: {
  				'0%, 100%': { 'box-shadow': '0 0 20px rgba(59, 130, 246, 0.5)' },
  				'50%': { 'box-shadow': '0 0 30px rgba(59, 130, 246, 0.8)' }
  			},
  			scroll: {
  				'0%': { transform: 'translateX(0)' },
  				'100%': { transform: 'translateX(-100%)' }
  			},
  			shimmer: {
  				'0%': { 'background-position': '0% 50%' },
  				'50%': { 'background-position': '100% 50%' },
  				'100%': { 'background-position': '0% 50%' }
  			},
  			'pulse-glow': {
  				'0%, 100%': {
  					'box-shadow': '0 0 20px rgba(99, 102, 241, 0.4), 0 0 40px rgba(139, 92, 246, 0.2)'
  				},
  				'50%': {
  					'box-shadow': '0 0 30px rgba(99, 102, 241, 0.8), 0 0 60px rgba(139, 92, 246, 0.4)'
  				}
  			},
  			'slide-up': {
  				'from': { transform: 'translateY(20px)', opacity: '0' },
  				'to': { transform: 'translateY(0)', opacity: '1' }
  			},
  			'slide-in': {
  				'from': { transform: 'translateX(-20px)', opacity: '0' },
  				'to': { transform: 'translateX(0)', opacity: '1' }
  			},
  			'fade-in': {
  				'from': { opacity: '0' },
  				'to': { opacity: '1' }
  			},
  			'bounce-soft': {
  				'0%, 100%': { transform: 'translateY(0)' },
  				'50%': { transform: 'translateY(-4px)' }
  			},
  			'gradient-flow': {
  				'0%': { 'background-position': '0% 50%' },
  				'50%': { 'background-position': '100% 50%' },
  				'100%': { 'background-position': '0% 50%' }
  			},
  			'rotate-gradient': {
  				'0%': { transform: 'rotate(0deg)' },
  				'100%': { transform: 'rotate(360deg)' }
  			},
  			'scale-pulse': {
  				'0%, 100%': { transform: 'scale(1)' },
  				'50%': { transform: 'scale(1.05)' }
  			},
  			'text-shimmer': {
  				'0%': { backgroundPosition: '0% center' },
  				'100%': { backgroundPosition: '200% center' }
  			},
  			'rainbow': {
  				'0%': { filter: 'hue-rotate(0deg)' },
  				'100%': { filter: 'hue-rotate(360deg)' }
  			},
  			'neon-glow': {
  				'0%, 100%': { textShadow: '0 0 10px rgba(59, 130, 246, 0.5), 0 0 20px rgba(139, 92, 246, 0.3)' },
  				'50%': { textShadow: '0 0 20px rgba(59, 130, 246, 1), 0 0 30px rgba(139, 92, 246, 0.8)' }
  			}
  		}
  	}
  },
  plugins: [require("tailwindcss-animate")],
} satisfies Config;
