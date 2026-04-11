export const fade = {
  hidden: { opacity: 0, y: 20 },
  visible: (d: number) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, delay: d * 0.1, ease: [0.25, 0.46, 0.45, 0.94] },
  }),
};
