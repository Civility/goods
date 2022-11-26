const getRobots = (hostName) => {
	return {
		UserAgent: '*',
		Allow: '*',
		Disallow: '/api/*',
		Host: hostName,
		// Sitemap: hostName + '/sitemap.xml',
	}
}

export { getRobots }
