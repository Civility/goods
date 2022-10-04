const getGoogleFonts = () => {
	return {
		prefetch: true,
		preconnect: true,
		preload: true,
		//  download: true,
		families: {
			Rubik: [300, 500, 700],
			Yellowtail: [400],
		},
		display: 'swap',
		subsets: 'cyrillic',
	}
}

export { getGoogleFonts }
