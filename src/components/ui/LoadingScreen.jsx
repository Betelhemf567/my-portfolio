import { motion, AnimatePresence } from 'framer-motion'
import { personal } from '../../data/portfolio'

export default function LoadingScreen({ isLoading }) {
  return (
    <AnimatePresence>
      {isLoading && (
        <motion.div
          className="loading-screen"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, transition: { duration: 0.6, ease: 'easeInOut' } }}
        >
          {/* Logo mark */}
          <div className="flex flex-col items-center gap-6">
            <motion.div
              initial={{ scale: 0, rotate: -30 }}
              animate={{ scale: 1, rotate: 0 }}
              transition={{ duration: 0.5, ease: 'backOut' }}
              className="w-16 h-16 rounded-2xl flex items-center justify-center text-white text-2xl font-display font-bold"
              style={{ background: 'var(--accent)' }}
            >
              {personal.firstName[0]}
            </motion.div>

            {/* Animated name */}
            <motion.p
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.4 }}
              className="font-mono text-sm tracking-widest uppercase text-muted"
            >
              {personal.name}
            </motion.p>

            {/* Loading bar */}
            <motion.div
              className="w-48 h-0.5 rounded-full overflow-hidden"
              style={{ background: 'var(--border)' }}
            >
              <motion.div
                className="h-full rounded-full"
                style={{ background: 'var(--accent)' }}
                initial={{ width: '0%' }}
                animate={{ width: '100%' }}
                transition={{ duration: 1.2, ease: 'easeInOut' }}
              />
            </motion.div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
