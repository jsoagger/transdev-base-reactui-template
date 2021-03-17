import React from 'react';

// common pages
const GenericLoginPage = React.lazy(() => import('pages/GenericPages/GenericLoginPage'));
const GenericLogoutPage = React.lazy(() => import('pages/GenericPages/GenericLogoutPage'));
const LostPassPage = React.lazy(() => import('pages/CommonPages/LostPassPage'));
const ReinitPassPage = React.lazy(() => import('pages/CommonPages/ReinitPassPage/ReinitPassPage.js'));
const PeopleRegisterPage = React.lazy(() => import('pages/CommonPages/PeopleRegisterPage/PeopleRegisterPage.js'));
const rootUrl = 'home';

//clients pages
const DemoPeopleDetailsPage = React.lazy(() => import('pages/GenericPages/PeopleDetailsPage/PeopleDetailsPage.js'));
const DemoHomeDemoDesktopPage = React.lazy(() => import('pages/GenericPages/GenericHomePage/GenericDesktopHomePage.js'));
const DemoHomeDemoMobilePage = React.lazy(() => import('pages/GenericPages/GenericHomePage/GenericMobileHomePage.js'));
const DemoGenericHomePage = React.lazy(() => import('pages/GenericPages/GenericHomePage/GenericHomePage.js'));
const DemoAdminHomePage = React.lazy(() => import('pages/GenericPages/GenericManagementPage/GenericManagementPage.js'));

const demoRoutes = [
	{ path: `/${rootUrl}`, exact: true, name: 'Home', component: DemoGenericHomePage },
	{ path: `/${rootUrl}/desktop`, exact: true, name: 'Desktop', component: DemoHomeDemoDesktopPage },
	{ path: `/${rootUrl}/mobile`, exact: true, name: 'Mobile', component: DemoHomeDemoMobilePage },
	{ path: `/${rootUrl}/profile`, exact: true, name: 'User profile', component: DemoPeopleDetailsPage },
	{ path: `/${rootUrl}/userProfile`, exact: true, name: 'Profile', component: DemoPeopleDetailsPage},
	{ path: `/login`, exact: true, name: 'Authentication', component: GenericLoginPage},
	{ path: `/logout`, exact: true, name: 'Authentication', component: GenericLogoutPage},
	{ path: `/lostPass`, exact: true, name: 'Lost pass', component: LostPassPage },
	{ path: `/lostPassword/:lockToken`, exact: true, name: 'Pass reinit', component: ReinitPassPage },
	{ path: `/register/:source`, exact: true, name: 'Register', component: PeopleRegisterPage },
	{ path: `/admin`, exact: false, name: 'Admin', component: DemoAdminHomePage },
];

export default demoRoutes;
