'use-client';
import { Zap, Cpu, Fingerprint, Pencil, Settings2, Sparkles } from 'lucide-react';
import { motion, useReducedMotion } from 'motion/react';
import { FeatureCard } from '@/components/ui/grid-feature-card';

const features = [
    {
        title: 'Compliance Nightmares',
        icon: Pencil,
        description: 'Keeping up with ever-changing tax laws and labor regulations in every country is a constant battle.',
    },
    {
        title: 'Disconnected Systems',
        icon: Cpu,
        description: 'Juggling multiple local payroll vendors and spreadsheets leads to data chaos and no single source of truth.',
    },
    {
        title: 'Payment Delays & Errors',
        icon: Zap,
        description: 'Manual calculations and complex banking systems often result in late or incorrect employee payments.',
    },
    {
        title: 'Sensitive Data Risk',
        icon: Fingerprint,
        description: 'Protecting highly sensitive employee data across different regions is a massive security liability.',
    },
    {
        title: 'No Central Control',
        icon: Settings2,
        description: 'Without a unified view, it\'s impossible to efficiently manage approvals or see your true global labor costs.',
    },
    {
        title: 'Manual, Slow Reporting',
        icon: Sparkles,
        description: 'Generating consolidated financial reports is a painful, error-prone process that hinders decision-making.',
    },
];

const Features = () => {
    return (
       <section className="min-h-screen flex items-center justify-center bg-white">
            <div className="mx-auto w-full max-w-5xl space-y-8 flex flex-col justify-center flex-1 px-2">
                <AnimatedContainer className="mx-auto max-w-8xl text-center">
                   <h2 className="text-4xl sm:text-3xl md:text-3xl lg:text-4xl xl:text-8xl font-extrabold tracking-wide text-balance" style={{textShadow: '0 4px 24px rgba(0,0,0,0.45), 0 1.5px 0 rgba(0,0,0,0.18)'}}>
                       Why GoPay ?
                   </h2>
                   <p className="text-muted-foreground mt-4 text-lg sm:text-xl md:text-2xl tracking-wide text-balance font-serif" style={{textShadow: '0 2px 12px rgba(0,0,0,0.32)'}}>
Complexity. Risk. Uncertainty.                   </p>
                </AnimatedContainer>

               <div className="relative">
                   {/* Black card background */}
               <div className="absolute inset-0 rounded-3xl bg-black border-2 border-gray-900 shadow-[0_8px_40px_8px_rgba(0,0,0,0.45)] opacity-95 -z-0" style={{filter: 'blur(1.5px)'}} />
                   <AnimatedContainer
                       delay={0.4}
                       className="grid grid-cols-1 divide-x divide-y divide-dashed border border-dashed sm:grid-cols-2 md:grid-cols-3 rounded-3xl overflow-hidden"
                   >
                       {features.map((feature, i) => (
                           <FeatureCard key={i} feature={feature} />
                       ))}
                   </AnimatedContainer>
               </div>
            </div>
        </section>
    );
}

type ViewAnimationProps = {
    delay?: number;
    className?: React.ComponentProps<typeof motion.div>['className'];
    children: React.ReactNode;
};

function AnimatedContainer({ className, delay = 0.1, children }: ViewAnimationProps) {
    const shouldReduceMotion = useReducedMotion();

    if (shouldReduceMotion) {
        return children;
    }

    return (
        <motion.div
            initial={{ filter: 'blur(4px)', translateY: -8, opacity: 0 }}
            whileInView={{ filter: 'blur(0px)', translateY: 0, opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay, duration: 0.8 }}
            className={className}
        >
            {children}
        </motion.div>
    );
}

export default Features;