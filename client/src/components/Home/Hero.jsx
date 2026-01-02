import React from 'react'
import { useRef } from 'react'

const [isMenuOpen, setIsMenuOpen] = React.useState(false);

const hero = () => {
  return (
    <div>
<div class="bg-[url(https://raw.githubusercontent.com/prebuiltui/prebuiltui/main/assets/hero/gradientBackground.png)] text-sm text-gray-500">
    {/* <!-- Navbar --> */}
        <header
        class="flex items-center justify-between px-6 py-3 mt-5 md:py-4 shadow-sm max-w-5xl rounded-full mx-auto w-full bg-white">
        <a href="https://prebuiltui.com">
            <img src="https://raw.githubusercontent.com/prebuiltui/prebuiltui/main/assets/dummyLogo/prebuiltuiDummyLogo.svg" />
        </a>
        <nav id="menu"
            class="
            {isMenuOpen ? 'max-md:w-full overflow-hidden' : 'md:w-auto'}
            max-md:absolute max-md:top-0 max-md:left-0 max-md:overflow-hidden items-center justify-center max-md:h-full max-md:w-0 transition-[width] bg-white/50 backdrop-blur flex-col md:flex-row flex gap-8 text-gray-900 text-sm font-normal">
            <a class="hover:text-indigo-600" href="#">
                Products
            </a>
            <a class="hover:text-indigo-600" href="#">
                Customer Stories
            </a>
            <a class="hover:text-indigo-600" href="#">
                Pricing
            </a>
            <a class="hover:text-indigo-600" href="#">
                Docs
            </a>
            <button id="closeMenu" class="md:hidden text-gray-600">
                <svg class="w-6 h-6" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"
                    stroke-linecap="round" stroke-linejoin="round">
                    <path d="M6 18L18 6M6 6l12 12" />
                </svg>
            </button>
        </nav>
        <div class="flex items-center space-x-4">
            <button
                class="size-8 flex items-center justify-center hover:bg-gray-100 transition border border-slate-300 rounded-md">
                <svg width="15" height="15" viewBox="0 0 15 15" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path
                        d="M7.5 10.39a2.889 2.889 0 1 0 0-5.779 2.889 2.889 0 0 0 0 5.778M7.5 1v.722m0 11.556V14M1 7.5h.722m11.556 0h.723m-1.904-4.596-.511.51m-8.172 8.171-.51.511m-.001-9.192.51.51m8.173 8.171.51.511"
                        stroke="#353535" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
                </svg>
            </button>
            <a class="hidden md:flex bg-indigo-600 text-white px-5 py-2 rounded-full text-sm font-medium hover:bg-indigo-700 transition"
                href="#">
                Sign up
            </a>
            <button id="openMenu" class="md:hidden text-gray-600">
                <svg class="w-6 h-6" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"
                    stroke-linecap="round" stroke-linejoin="round">
                    <path d="M4 6h16M4 12h16M4 18h16" />
                </svg>
            </button>
        </div>
    </header>

    {/* <!-- Hero Section --> */}
    <div class="h-[580px] flex flex-col items-center justify-center px-4 text-center">
        <div class="flex flex-wrap items-center justify-center gap-2.5 mb-6 border border-gray-500/30 rounded-full bg-gray-300/15 pl-4 p-1 text-sm text-gray-800 max-w-full">
            <p>Launching our new platform update.</p>
            <div class="flex items-center cursor-pointer gap-2 bg-white border border-gray-500/30 rounded-2xl px-3 py-1 whitespace-nowrap">
                <p>Explore</p>
                <svg width="12" height="9" viewBox="0 0 12 9" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M1 4.5h10.182m-4-3.5 4 3.5-4 3.5" stroke="#6B7280" stroke-width="1.5"
                        stroke-linecap="round" stroke-linejoin="round" />
                </svg>
            </div>
        </div>

        <h1 class="text-3xl sm:text-5xl md:text-6xl font-bold max-w-4xl text-gray-800">Solutions to Elevate Your
            Business Growth</h1>
        <p class="max-w-xl text-center mt-6 px-4">Unlock potential with tailored strategies designed for success.
            Simplify challenges, maximize results, and stay ahead in the competitive market.</p>
        <div class="flex flex-col sm:flex-row items-center justify-center gap-4 pt-6">
            <button class="px-7 py-3 rounded bg-indigo-600 hover:bg-indigo-700 text-white font-medium">Get Started Now</button>
            <button class="group px-7 py-2.5 flex items-center gap-2 font-medium">
                Learn more
                <svg class="group-hover:translate-x-1 transition pt-0.5" width="12" height="9" viewBox="0 0 12 9"
                    fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M1 4.5h10.182m-4-3.5 4 3.5-4 3.5" stroke="#6B7280" stroke-width="1.5"
                        stroke-linecap="round" stroke-linejoin="round" />
                </svg>
            </button>
        </div>
    </div>
</div>

    </div>
  )
}

export default hero
