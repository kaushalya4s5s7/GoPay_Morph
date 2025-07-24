"use client";

import React from "react";
import dynamic from "next/dynamic";
import Loader from "@/components/ui/loader";

import { FlipWords } from "@/components/ui/flipWords";
import { MONTSERRAT } from "@/lib/fonts";
import useFullPageLoader from "@/hooks/usePageLoader";
import { FeaturesSectionDemo } from "../ui/FeaturesSectionDemo";

const Carousel = dynamic(() => import("@/components/ui/cardsCarousel").then(mod => mod.Carousel), {
    ssr: false,
    loading: () => <Loader />
});

const Card = dynamic(() => import("@/components/ui/cardsCarousel").then(mod => mod.Card), {
    ssr: false,
    loading: () => <Loader />
});

const PayrollContent = () => {
    return (
        <div className="bg-[#F5F5F7] feature-container dark:bg-neutral-800 p-4 md:p-6 lg:p-8 xl:p-14 rounded-3xl mb-4">
            <div className="text-neutral-600 dark:text-neutral-400 text-sm md:text-base lg:text-lg font-sans max-w-xs sm:max-w-md md:max-w-lg lg:max-w-2xl xl:max-w-3xl mx-auto">
                <p className="mb-3">
                    <span className="font-bold text-neutral-700 dark:text-neutral-200">
                        Our flagship payroll system is now live for select pilot users.
                    </span>
                </p>
                <p className="mb-3">
                    Pay your entire team — anywhere in the world — in one click. Send stablecoins or tokens, and track everything transparently on-chain without spreadsheets or middlemen.
                </p>
                <p className="mb-3">
                    Perfect for DAOs, Web3 teams, and remote workforces.
                </p>
                <p className="font-bold text-neutral-700 dark:text-neutral-200 mb-2">KEY FEATURES:</p>
                <ul className="list-none pl-2 mb-3">
                    <li>✅ Bulk global payouts in one click</li>
                    <li>✅ Supports stablecoins & custom tokens</li>
                    <li>✅ Multi-chain support (Ethereum, Base, Polygon, Arbitrum, BNB Chain, Aptos, Solana)</li>
                    <li>✅ Gas-optimized smart contracts</li>
                    <li>✅ Transparent on-chain proof of payment</li>
                </ul>
                <p className="mb-3">Already powering real teams on-chain.</p>
                <p>Want early access? <span className="underline text-indigo-500 cursor-pointer">Join the waitlist</span></p>
            </div>
        </div>
    );
};







const AIFinanceContent = () => {
    return (
        <div className="bg-[#F5F5F7] dark:bg-neutral-800 p-4 md:p-6 lg:p-8 xl:p-14 rounded-3xl mb-4">
            <div className="text-neutral-600 dark:text-neutral-400 text-sm md:text-base lg:text-lg font-sans max-w-xs sm:max-w-md md:max-w-lg lg:max-w-2xl xl:max-w-3xl mx-auto">
                <p className="mb-3">
                    <span className="font-bold text-neutral-700 dark:text-neutral-200">
                        This one's cooking in the lab.
                    </span>
                </p>
                <p className="mb-3">
                    AI agents that'll help you optimize off-ramps, automate portfolio moves, and act as your 24/7 financial sidekick.
                </p>
                <p className="mb-3">
                    No buzzwords — just useful automation.
                </p>
                <p>In R&D. Stay tuned.</p>
            </div>
        </div>
    );
};



function FeaturesPage() {
   
    return (
        // Adjust width, use min-height instead of fixed height percentage
       
            <div className="relative h-screen w-screen p-10 flex bg-black items-center justify-center mt-2">
                <div className="grid grid-rows-1 place-content-center">
                    <FeaturesSectionDemo/>
                </div>
            </div>
        
    );
}

const Features = useFullPageLoader(FeaturesPage, <Loader />);
export default Features;