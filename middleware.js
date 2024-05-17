import { match } from "@formatjs/intl-localematcher";
import Negotiator from "negotiator";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";

let locales = ["bn", "en"];
let defaultLocale = "en";

const getLocale = (request) => {
  const acceptedlanguage = request.headers.get("accept-language") ?? undefined;
  let headers = { "accept-language": acceptedlanguage };
  let language = new Negotiator({ headers }).language();
  return match(language, locales, defaultLocale);
};

export function middleware(request) {
  const lang = cookies().get("lang");
  // console.log(lang?.value);

  const { pathname } = request.nextUrl;
  const pathnameHasLocal = locales.some(
    (locale) => pathname.startsWith(`/${locale}/`) || pathname === `/${locale}`
  );

  if (pathnameHasLocal) {
    return NextResponse.next();
  } else if (lang?.value) {
    const locale = lang?.value;
    return NextResponse.redirect(
      new URL(`/${locale}/${pathname}`, request.url)
    );
  } else {
    const locale = getLocale(request);
    return NextResponse.redirect(
      new URL(`/${locale}/${pathname}`, request.url)
    );
  }
}

export const config = {
  matcher: [
    // Skip all internal paths (_next)
    "/((?!api|assets.*\\..*|_next).*)",
    // Optional: only run on root (/) URL
    // '/'
  ],
};
