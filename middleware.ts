import { clerkMiddleware, createRouteMatcher  } from "@clerk/nextjs/server";
import { redirect } from 'next/navigation'
import { NextResponse } from 'next/server'

// Crée un matcher pour protéger uniquement les routes commençant par `/dashboard`
const isDashboardRoute = createRouteMatcher(['/dashboard(.*)']);

export default clerkMiddleware(async (auth, request ) => {
  // Appliquer la protection uniquement pour les routes sous `/dashboard`
  if (isDashboardRoute(request)) {
    await auth.protect();
  }
  
});

export const config = {
  matcher: [
    // Skip Next.js internals and all static files, unless found in search params
    '/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)',
    // Always run for API routes
    '/(api|trpc)(.*)',
  ],
};