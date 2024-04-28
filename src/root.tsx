import { $, component$, useOn, useOnWindow, useVisibleTask$ } from '@builder.io/qwik';
import { QwikCityProvider, RouterOutlet, ServiceWorkerRegister } from '@builder.io/qwik-city';
import { RouterHead } from './components/router-head/router-head';

import "./global.scss";

export default component$(() => {
	/**
	 * The root of a QwikCity site always start with the <QwikCityProvider> component,
	 * immediately followed by the document's <head> and <body>.
	 *
	 * Dont remove the `<head>` and `<body>` elements.
	 */

	return (
		<QwikCityProvider>      
		<head>
			<meta charSet="utf-8" />
			<link rel="manifest" href="/manifest.json" />
			<link rel="stylesheet" href="/FontAwesome/css/font-awesome.css" />
			<RouterHead />
		</head>
		<body lang="en">
			<RouterOutlet />
			<ServiceWorkerRegister />
		</body>
		</QwikCityProvider>
	);
});
