import React, { useState, useRef, useEffect } from 'react';
import useFullPageLoader from '@/hooks/usePageLoader';
import Loader from '@/components/ui/loader';
import  Hero  from '@/components/home/Hero';
import Features from '@/components/home/Features';
import Horizon from '@/components/home/horizon'; // Assuming Horizon is defined elsewhere
import FeaturesPage from '@/components/home/BentoFeatures'; // Assuming Bento is defined elsewhere
import Footer from '@/components/home/Footer';
import FullViewport from '@/components/home/FullViewport';
import { cn } from '@/lib/utils';

// Define props for HomePage
interface HomePageProps {
    onShowSplash?: () => void; // Add prop for handling splash screen visibility
}

function HomePage({ onShowSplash }: HomePageProps) { // Accept the prop
    const containerRef = useRef<HTMLDivElement>(null);
    const sectionRefs = useRef<(HTMLDivElement | null)[]>([]);
    const [activeSection, setActiveSection] = useState(0);
    const [isScrolling, setIsScrolling] = useState(false);
    const [lastScrollTime, setLastScrollTime] = useState(0);

    const sections = [
                        { id: "Hero", component:<Hero/>, label: "Hero" }, // Assuming Hero is defined elsewhere

                        { id: "horizon", component: <Horizon />, label: "Horizon" }, // Assuming Horizon is defined elsewhere

{ id: "features1", component: <FullViewport />, label: "Features" }, // Assuming Features is defined elsewhere
{ id: "features2", component: <FullViewport />, label: "Features" }, // Assuming Features is defined elsewhere
{ id: "features3", component: <FullViewport />, label: "Features" }, // Assuming Features is defined elsewhere
{ id: "features4", component: <FullViewport />, label: "Features" }, // Assuming Features is defined elsewhere
{ id: "features5", component: <FullViewport />, label: "Features" }, // Assuming Features is defined elsewhere
{ id: "features6", component: <FullViewport />, label: "Features" }, // Assuming Features is defined elsewhere
{ id: "features7", component: <FullViewport />, label: "Features" },
{ id: "features8", component: <FullViewport />, label: "Features" },
{ id: "features9", component: <FullViewport />, label: "Features" },

        // { id: "features", component: <Features />, label: "Features" },
        { id: "footer", component: <Footer />, label: "Footer" } // Assuming Footer is defined elsewhere

    ];

    // Enhanced smooth scrolling function
    const scrollToSection = (index: number) => {
        if (!containerRef.current || !sectionRefs.current[index]) return;
        if (isScrolling) return;

        setIsScrolling(true);
        setActiveSection(index); // Update active section immediately for Dock

        const section = sectionRefs.current[index];
        const sectionTop = section?.offsetTop || 0;
        const startPosition = window.pageYOffset;
        const distance = sectionTop - startPosition;
        const duration = 800; // Adjust duration
        const startTime = performance.now();

        const easeInOutCubic = (t: number) => t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;

        function animate(currentTime: number) {
            const elapsedTime = currentTime - startTime;
            const progress = Math.min(elapsedTime / duration, 1);
            const easedProgress = easeInOutCubic(progress);

            window.scrollTo({
                top: startPosition + distance * easedProgress,
                behavior: 'auto'
            });

            if (progress < 1) {
                requestAnimationFrame(animate);
            } else {
                window.scrollTo({ top: sectionTop, behavior: 'auto' });
                // Delay setting isScrolling to false slightly after animation ends
                setTimeout(() => setIsScrolling(false), 50);
            }
        }
        requestAnimationFrame(animate);
    };

    // Enhanced wheel event handler
    useEffect(() => {
        const handleWheel = (e: WheelEvent) => {
            const targetElement = e.target as HTMLElement;
            if (targetElement.closest('[data-carousel-scrollable="true"]')) {
                return; // Allow carousel scroll
            }
            e.preventDefault();
            const now = performance.now();
            if (now - lastScrollTime < 1000 || isScrolling) return; // Increased throttle time

            const direction = Math.sign(e.deltaY);
            const shouldScrollDown = direction > 0 && activeSection < sections.length - 1;
            const shouldScrollUp = direction < 0 && activeSection > 0;

            if (shouldScrollDown || shouldScrollUp) {
                setLastScrollTime(now);
                scrollToSection(activeSection + (shouldScrollDown ? 1 : -1));
            }
        };
        const container = containerRef.current;
        if (container) container.addEventListener('wheel', handleWheel, { passive: false });
        return () => { if (container) container.removeEventListener('wheel', handleWheel); };
    }, [activeSection, isScrolling, lastScrollTime, sections.length, scrollToSection]); // Added scrollToSection dependency

    // Intersection observer
    useEffect(() => {
        const observer = new IntersectionObserver((entries) => {
            if (isScrolling) return; // Don't update via observer during scroll animation
            let bestEntry: IntersectionObserverEntry | null = null;
            for (const entry of entries) {
                if (entry.isIntersecting) {
                    if (!bestEntry || entry.intersectionRatio > bestEntry.intersectionRatio) {
                        bestEntry = entry;
                    }
                }
            }
            if (bestEntry) {
                const index = sectionRefs.current.findIndex(ref => ref === bestEntry?.target);
                if (index !== -1 && index !== activeSection) {
                    setActiveSection(index);
                }
            }
        }, { root: null, rootMargin: '-50% 0px -50% 0px', threshold: 0.1 }); // Adjust rootMargin to activate near center

        sectionRefs.current.forEach(section => { if (section) observer.observe(section); });
        return () => observer.disconnect();
    }, [activeSection, isScrolling]); // Keep isScrolling dependency

    // Keyboard navigation
    useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
            if (isScrolling) {
                if (['ArrowDown', 'ArrowUp', 'PageDown', 'PageUp', 'Home', 'End', ' '].includes(e.key)) {
                    e.preventDefault();
                }
                return;
            }
            let newIndex = activeSection;
            if (e.key === 'ArrowDown' && activeSection < sections.length - 1) newIndex++;
            else if (e.key === 'ArrowUp' && activeSection > 0) newIndex--;
            else if (e.key === 'PageDown') newIndex = Math.min(activeSection + 1, sections.length - 1);
            else if (e.key === 'PageUp') newIndex = Math.max(activeSection - 1, 0);
            else if (e.key === 'Home') newIndex = 0;
            else if (e.key === 'End') newIndex = sections.length - 1;

            if (newIndex !== activeSection) {
                e.preventDefault();
                scrollToSection(newIndex);
            }
        };
        window.addEventListener('keydown', handleKeyDown);
        return () => window.removeEventListener('keydown', handleKeyDown);
    }, [activeSection, isScrolling, sections.length, scrollToSection]); // Added scrollToSection dependency

    return (
        // Use a relative container for positioning the Dock
        <div ref={containerRef} className="relative">
            {/* Render Sections */}
            {sections.map((section, index) => (
                <div
                    key={section.id}
                    id={section.id}
                    ref={el => { sectionRefs.current[index] = el; }}
                    className={
                        cn(
                            section.id==="Hero"
                            ? "w-screen h-screen z-10" // Custom z-index for Hero
                            :section.id === "horizon"
                            ? "w-screen h-[1000vh]" // Custom height for 'horizon'
                            : section.id === "footer"
                                ? "position-fixed" // Example custom class for footer
                                : section.id === "features2"
                                    ? "w-screen h-screen " // Example custom class for features2
                                    : section.id === "features3"
                                        ? "w-screen h-screen " // Example custom class for features3
                                        : section.id === "features4"
                                            ? "w-screen h-screen " // Example custom class for features4
                                            : section.id === "features5"
                                                ? "w-screen h-screen " // Example custom class for features5
                                                : "w-screen h-screen")

    }
                >
                    {section.component}
                </div>
            ))}

            {/* Dock positioned at the bottom center */}
           
        </div>
    );
}

// Export the component directly if not using useFullPageLoader here
// export default HomePage;

// Or keep using the loader if needed for this specific page structure
const HomeWithLoader = useFullPageLoader(HomePage, <Loader />);
export default HomeWithLoader;