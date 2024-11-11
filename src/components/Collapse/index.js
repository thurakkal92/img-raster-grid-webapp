import React from "react"
import { motion } from "framer-motion"

/**
 * Renders the Collapse component for the Tree view.
 * @param pose - depends on its value, the state changes.
 * @returns Rendered Collapse component
 */


const collapseVariant = {
    open: { opacity: 1, height: "auto" },
    collapsed: { opacity: 0, height: 0 },
}

const Collapse = ({ pose, className, children, ...additionalProps }) => {
    return (
        <motion.div
            initial={"collapsed"}
            transition={{ linear: "linear" }}
            variants={collapseVariant}
            animate={pose}
            className={className}
            style={{ overflow: "hidden" }}
            {...additionalProps}
        >
            {children}
        </motion.div>
    )
}

export { Collapse }
