// "use client";

// import FrozenRouter from "@modules/providers/frozen-router-provider";
// import { AnimatePresence, motion } from "framer-motion";
// import {
//     usePathname
// } from "next/navigation";
// import { ElementRef, forwardRef } from "react";

// const wrapperVariants = {
//     initial: {
//         clipPath: 'polygon(0 0, 0 0, 0 100%, 0% 100%)',
//         transition: { duration: .4 }
//     },
//     animate: {
//         clipPath: 'polygon(0 0, 100% 0, 100% 100%, 0 100%)',
//         transition: { duration: .4, staggerChildren: .1 }
//     },
//     exit: {
//         clipPath: 'polygon(100% 0, 100% 0, 100% 100%, 100% 100%)',
//         transition: { duration: .4 }
//     }
// }


// const Child = forwardRef<
//     ElementRef<typeof motion.div>,
//     { children: React.ReactNode }
// >((props, ref) => {
//     return (
//         <motion.div
//             ref={ref}
//             variants={wrapperVariants}
//             initial="initial"
//             animate="animate"
//             exit="exit"
//         >
//             <FrozenRouter>{props.children}</FrozenRouter>
//         </motion.div>
//     );
// });

// Child.displayName = "Child";

// export default function ClientLayout(props: {
//     children: React.ReactNode;
// }) {
//     const path = usePathname();
//     return (
//         <>
//             <AnimatePresence mode="popLayout" initial={false}>
//                 <Child key={path}>{props.children}</Child>
//             </AnimatePresence>
//         </>
//     );
// }
