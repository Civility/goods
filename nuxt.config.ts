import { getModules } from './config/modules'
import { getTailwind, getGoogleFonts } from './config/modules/configModules'
import { resolve } from 'path'
const isDev = process.env.NODE_ENV !== 'production'
export default defineNuxtConfig({
	telemetry: false,
	meta: {
		title: 'Goods',
		htmlAttrs: { lang: 'ru' },
		meta: [{ name: 'viewport', content: 'width=device-width, initial-scale=1' }],
	},
	components: {
		dirs: ['~/components/element', '~/components/global', '~/components/part'],
	},
	modules: getModules(isDev),
	googleFonts: getGoogleFonts(),
	_tailwindcss: getTailwind(),
	get tailwindcss() {
		return this._tailwindcss
	},
	set tailwindcss(value) {
		this._tailwindcss = value
	},
	postcss: {
		plugins: {
			'tailwindcss/nesting': {},
		},
	},
})
