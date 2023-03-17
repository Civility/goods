import { getModules } from './config/modules'
import { getTailwind, getGoogleFonts } from './config/modules/configModules'
const isDev = process.env.NODE_ENV !== 'production'
export default defineNuxtConfig({
	telemetry: false,
	...(!isDev && {
		experimental: { writeEarlyHints: false },
	}),
	runtimeConfig: {
		public: {
			G_IMG: `${process.env.PUBLIC_NAME}/storage/app/media/`,
			PUBLIC_NAME: `${process.env.PUBLIC_NAME}`,
		},
	},
	meta: {
		title: 'АКТИВ-ПИТЕР',
		htmlAttrs: { lang: 'ru' },
		meta: [
			{ name: 'viewport', content: 'width=device-width, initial-scale=1' },
			{ name: 'yandex-verification', content: '12a4a8341eeb63b6' },
		],
		...(!isDev && {
			script: [
				{
					vmid: 'yandexMmetrika',
					innerHTML: `(function(m,e,t,r,i,k,a){m[i]=m[i]||function(){(m[i].a=m[i].a||[]).push(arguments)};m[i].l=1*new Date();
					for (var j = 0;j < document.scripts.length; j++) {if (document.scripts[j].src === r) { return; }}
					k=e.createElement(t),a=e.getElementsByTagName(t)[0],k.async=1,k.src=r,a.parentNode.insertBefore(k,a)})
					(window, document, "script", "https://mc.yandex.ru/metrika/tag.js", "ym");
					ym(91242479, "init", { clickmap:true,trackLinks:true,accurateTrackBounce:true});`,
					type: 'text/javascript',
				},
			],
			noscript: [
				{
					innerHTML:
						'<div><img src="https://mc.yandex.ru/watch/91242479" style="position:absolute; left:-9999px;" alt="" /></div>',
				},
			],
		}),
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
