import type { RequestEvent } from '@builder.io/qwik-city';
 
export const onGet = async ({ redirect }: RequestEvent) => {
//   const isAuthorized = checkAuthorization(cookie.get('cookie'));
    // console.log(params)
    throw redirect(302, '/menu/skills/occultism/tarot/');

};