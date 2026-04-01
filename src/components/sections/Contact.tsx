// import React, { useState, useEffect, useRef } from 'react';
// import { motion, AnimatePresence } from 'motion/react';
// import { useNavigation } from '../../context/NavigationContext';
// import { useContactForm, fields } from '../../hooks/useContactForm';

// interface TerminalLineProps {
//   text: string;
//   color: string;
//   onComplete?: () => void;
// }

// const TerminalLine: React.FC<TerminalLineProps> = ({ text, color, onComplete }) => {
//   const [displayedText, setDisplayedText] = useState('');

//   useEffect(() => {
//     let i = 0;
//     const interval = setInterval(() => {
//       setDisplayedText(text.slice(0, i + 1));
//       i++;
//       if (i >= text.length) {
//         clearInterval(interval);
//         if (onComplete) onComplete();
//       }
//     }, 12);
//     return () => clearInterval(interval);
//   }, [text, onComplete]);

//   return (
//     <div style={{ color, lineHeight: 2, fontFamily: 'Space Mono', fontSize: '13px' }}>
//       {displayedText}
//     </div>
//   );
// };

// export default function Contact() {
//   const { activeSection, setActiveSection } = useNavigation();
//   const {
//     currentField,
//     getValue,
//     setValue,
//     handleKeyDown,
//     handleSubmit,
//     resetForm,
//     submitStatus,
//     terminalLines,
//     errors
//   } = useContactForm();

//   const [visibleLines, setVisibleLines] = useState<number>(0);
//   const [showFinalPrompt, setShowFinalPrompt] = useState(false);

//   useEffect(() => {
//     if (submitStatus === 'success' && terminalLines.length > visibleLines) {
//       // This logic is slightly redundant with TerminalLine's internal typing, 
//       // but we need to stagger the lines themselves.
//     }
//   }, [submitStatus, terminalLines, visibleLines]);

//   const handleLineComplete = () => {
//     if (visibleLines < terminalLines.length) {
//       setVisibleLines(prev => prev + 1);
//     } else if (visibleLines === terminalLines.length && terminalLines.length > 0) {
//       setTimeout(() => setShowFinalPrompt(true), 1000);
//     }
//   };

//   // Reset local success state when form resets
//   useEffect(() => {
//     if (submitStatus === 'idle') {
//       setVisibleLines(0);
//       setShowFinalPrompt(false);
//     }
//   }, [submitStatus]);

//   const sectionVariants = {
//     initial: {
//       clipPath: 'circle(0% at 50% 50%)',
//       opacity: 0
//     },
//     animate: {
//       clipPath: 'circle(150% at 50% 50%)',
//       opacity: 1,
//       transition: {
//         duration: 0.5,
//         ease: 'easeOut',
//         when: 'beforeChildren'
//       }
//     },
//     exit: {
//       opacity: 0,
//       clipPath: 'circle(0% at 50% 50%)',
//       transition: {
//         opacity: { duration: 0.2 },
//         clipPath: { duration: 0.4, ease: 'easeIn' }
//       }
//     }
//   };

//   const contentVariants = {
//     initial: { opacity: 0 },
//     animate: {
//       opacity: 1,
//       transition: { delay: 0.4, duration: 0.3 }
//     },
//     exit: { opacity: 0, transition: { duration: 0.2 } }
//   };

//   return (
//     <motion.section
//       variants={sectionVariants}
//       initial="initial"
//       animate={activeSection === 'contact' ? 'animate' : 'initial'}
//       exit="exit"
//       className="fixed inset-0 w-screen h-screen bg-[var(--bg)] flex items-center justify-center overflow-hidden z-40"
//     >
//       <motion.div
//         variants={contentVariants}
//         className="max-w-[600px] w-[90vw] relative z-10"
//       >
//         <AnimatePresence mode="wait">
//           {submitStatus !== 'success' ? (
//             <motion.div
//               key="form"
//               initial={{ opacity: 0 }}
//               animate={{ opacity: 1 }}
//               exit={{ opacity: 0, transition: { duration: 0.2 } }}
//             >
//               <span className="font-mono text-[13px] text-[var(--accent)] mb-10 block">
//                 {"> contact_me.sh"}
//               </span>

//               <div className="space-y-7">
//                 <AnimatePresence>
//                   {fields.slice(0, currentField + 1).map((field, index) => (
//                     <motion.div
//                       key={field.key}
//                       initial={{ y: 12, opacity: 0 }}
//                       animate={{ y: 0, opacity: 1 }}
//                       transition={{ duration: 0.25 }}
//                       className="mb-[1.8rem]"
//                     >
//                       <label className="font-mono text-[12px] text-[var(--muted)] block mb-2">
//                         {`> enter ${field.label}:`}
//                       </label>

//                       {field.type === 'input' ? (
//                         <div className="relative">
//                           <input
//                             type={field.key === 'email' ? 'email' : 'text'}
//                             value={getValue(field.key)}
//                             onChange={e => setValue(field.key, e.target.value)}
//                             onKeyDown={e => handleKeyDown(e, field.key)}
//                             autoFocus={index === currentField}
//                             className={`w-full bg-transparent border-none border-b py-2 text-[14px] font-mono text-[var(--fg)] outline-none transition-colors duration-200 caret-[var(--accent)] ${errors[field.key] ? 'border-[var(--accent)]' : 'border-[var(--border)] focus:border-[var(--accent)]'
//                               }`}
//                           />
//                           {errors[field.key] && (
//                             <motion.div
//                               animate={{ x: [0, 6, -6, 6, -6, 0] }}
//                               transition={{ duration: 0.4 }}
//                               className="font-mono text-[11px] text-[var(--accent)] mt-1.5"
//                             >
//                               {`> error: ${errors[field.key]}`}
//                             </motion.div>
//                           )}
//                           {index === currentField && getValue(field.key).trim() !== '' && (
//                             <motion.div
//                               initial={{ opacity: 0 }}
//                               animate={{ opacity: 0.6 }}
//                               transition={{ delay: 0.8 }}
//                               className="font-mono text-[10px] text-[var(--muted)] mt-1.5"
//                             >
//                               press Enter to continue →
//                             </motion.div>
//                           )}
//                         </div>
//                       ) : (
//                         <div className="relative">
//                           <textarea
//                             value={getValue(field.key)}
//                             onChange={e => setValue(field.key, e.target.value)}
//                             onKeyDown={e => handleKeyDown(e, field.key)}
//                             rows={field.rows}
//                             className={`w-full bg-transparent border-none border-b py-2 text-[14px] font-mono text-[var(--fg)] outline-none transition-colors duration-200 caret-[var(--accent)] resize-none ${errors[field.key] ? 'border-[var(--accent)]' : 'border-[var(--border)] focus:border-[var(--accent)]'
//                               }`}
//                           />
//                           {errors[field.key] && (
//                             <motion.div
//                               animate={{ x: [0, 6, -6, 6, -6, 0] }}
//                               transition={{ duration: 0.4 }}
//                               className="font-mono text-[11px] text-[var(--accent)] mt-1.5"
//                             >
//                               {`> error: ${errors[field.key]}`}
//                             </motion.div>
//                           )}
//                         </div>
//                       )}
//                     </motion.div>
//                   ))}
//                 </AnimatePresence>
//               </div>

//               <AnimatePresence>
//                 {currentField === 3 && getValue('message').trim() !== '' && (
//                   <motion.button
//                     initial={{ y: 20, opacity: 0 }}
//                     animate={{ y: 0, opacity: 1 }}
//                     exit={{ opacity: 0 }}
//                     whileHover={{ scale: 1.01, backgroundColor: 'var(--fg)' }}
//                     whileTap={{ scale: 0.98 }}
//                     onClick={handleSubmit}
//                     disabled={submitStatus === 'sending'}
//                     className={`w-full h-[52px] mt-6 font-display text-[20px] tracking-[0.05em] border-none cursor-pointer transition-colors duration-200 ${submitStatus === 'error' ? 'bg-[var(--fg)] text-[var(--bg)]' : 'bg-[var(--accent)] text-[var(--bg)]'
//                       } ${submitStatus === 'sending' ? 'opacity-70 cursor-wait' : ''}`}
//                   >
//                     {submitStatus === 'idle' && "SEND MESSAGE"}
//                     {submitStatus === 'sending' && (
//                       <span className="flex items-center justify-center gap-2">
//                         SENDING...
//                         <motion.span
//                           animate={{ opacity: [1, 0] }}
//                           transition={{ duration: 0.5, repeat: Infinity }}
//                         >
//                           _
//                         </motion.span>
//                       </span>
//                     )}
//                     {submitStatus === 'error' && "RETRY →"}
//                   </motion.button>
//                 )}
//               </AnimatePresence>

//               {submitStatus === 'error' && errors.submit && (
//                 <div className="font-mono text-[11px] text-[var(--accent)] mt-3">
//                   {`> error: ${errors.submit}`}
//                 </div>
//               )}
//             </motion.div>
//           ) : (
//             <motion.div
//               key="terminal"
//               initial={{ opacity: 0 }}
//               animate={{ opacity: 1 }}
//               className="font-mono"
//             >
//               {terminalLines.slice(0, visibleLines + 1).map((line, i) => (
//                 <TerminalLine
//                   key={i}
//                   text={line}
//                   color={i === 4 ? 'var(--accent)' : 'var(--fg)'}
//                   onComplete={i === visibleLines ? handleLineComplete : undefined}
//                 />
//               ))}

//               {showFinalPrompt && (
//                 <motion.div
//                   initial={{ opacity: 0 }}
//                   animate={{ opacity: 1 }}
//                   className="mt-8 flex flex-col gap-4"
//                 >
//                   <div className="text-[var(--accent)] text-[13px]">
//                     {"> send another? [y/n]"}
//                   </div>
//                   <div className="flex gap-6">
//                     <button
//                       onClick={resetForm}
//                       className="text-[var(--fg)] hover:text-[var(--accent)] transition-colors text-[13px]"
//                     >
//                       [ y ] YES
//                     </button>
//                     <button
//                       onClick={() => setActiveSection('hero')}
//                       className="text-[var(--fg)] hover:text-[var(--accent)] transition-colors text-[13px]"
//                     >
//                       [ n ] NO
//                     </button>
//                   </div>
//                 </motion.div>
//               )}
//             </motion.div>
//           )}
//         </AnimatePresence>
//       </motion.div>
//     </motion.section>
//   );
//import React from 'react';
import { motion, AnimatePresence, Variants } from 'motion/react';
import { useNavigation } from '../../context/NavigationContext';
import { useContactForm, fields } from '../../hooks/useContactForm';
import { Loader2, Send, CheckCircle2, Github, Linkedin, Mail, FileText, ArrowUp } from 'lucide-react';

const sectionVariants: Variants = {
  initial: { opacity: 0 },
  animate: {
    opacity: 1,
    transition: { duration: 0.8, ease: [0.76, 0, 0.24, 1] }
  },
  exit: { opacity: 0, transition: { duration: 0.4 } }
};

export default function Contact() {
  const { setActiveSection } = useNavigation();
  const {
    getValue,
    setValue,
    handleSubmit,
    resetForm,
    submitStatus,
    errors
  } = useContactForm();

  const handleBackToTop = () => {
    setActiveSection('hero');
  };

  return (
    <motion.section
      variants={sectionVariants}
      initial="initial"
      animate="animate"
      exit="exit"
      className="relative h-full w-full bg-[#0a0a0a] overflow-hidden z-40 flex items-center justify-center p-6 lg:p-12"
    >
      {/* Main Professional Container */}
      <div className="w-full max-w-6xl h-full max-h-[90vh] flex flex-col bg-white/5 border border-white/10 rounded-[2rem] overflow-hidden backdrop-blur-md">
        
        {/* Content Area: Form & Info */}
        <div className="flex-1 flex flex-col lg:flex-row overflow-y-auto scrollbar-hide">
          
          {/* Left Column: Contact Info & CTA */}
          <div className="w-full lg:w-1/2 p-8 lg:p-16 flex flex-col border-b lg:border-b-0 lg:border-r border-white/10">
            <div className="mb-12">
              <span className="font-mono text-[10px] text-[var(--accent)] tracking-[0.5em] uppercase mb-4 block">
                Direct Contact
              </span>
              <h2 className="font-display text-4xl lg:text-6xl text-[var(--fg)] leading-[1.1] mb-8">
                Ready to <span className="text-[var(--accent)] italic">start</span> a conversation?
              </h2>
              <p className="font-sans text-base text-[var(--muted)] leading-relaxed max-w-md">
                Whether you have a specific project in mind or just want to explore possibilities, 
                I'm always open to discussing new opportunities.
              </p>
            </div>

            <div className="mt-auto space-y-10">
              {/* Contact Details */}
              <div className="space-y-6">
                <div>
                  <span className="font-mono text-[9px] text-[var(--muted)] uppercase tracking-widest block mb-1">Email Me</span>
                  <a href="mailto:vanshikababral@gmail.com" className="font-display text-xl lg:text-2xl text-[var(--fg)] hover:text-[var(--accent)] transition-colors">
                    vanshikababral@gmail.com
                  </a>
                </div>
                <div>
                  <span className="font-mono text-[9px] text-[var(--muted)] uppercase tracking-widest block mb-1">Location</span>
                  <span className="font-display text-xl lg:text-2xl text-[var(--fg)]">Based in India</span>
                </div>
              </div>

              {/* Social Links */}
              <div className="flex items-center gap-4">
                {[
                  { icon: <Github size={20} />, url: "https://github.com/Vanshikababral", title: "GitHub" },
                  { icon: <Linkedin size={20} />, url: "https://www.linkedin.com/in/vanshika-babral", title: "LinkedIn" },
                  { icon: <FileText size={20} />, url: "/VanshikaBabral.pdf", title: "Resume" },
                  { icon: <Mail size={20} />, url: "mailto:vanshikababral@gmail.com", title: "Email" },
                ].map((social, i) => (
                  <a
                    key={i}
                    href={social.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-12 h-12 rounded-full border border-white/10 flex items-center justify-center text-[var(--muted)] hover:text-[var(--accent)] hover:border-[var(--accent)] transition-all bg-white/5"
                    title={social.title}
                    data-hover
                  >
                    {social.icon}
                  </a>
                ))}
              </div>
            </div>
          </div>

          {/* Right Column: Form Area */}
          <div className="w-full lg:w-1/2 p-8 lg:p-16 flex flex-col justify-center bg-white/2">
            <AnimatePresence mode="wait">
              {submitStatus !== 'success' ? (
                <motion.div
                  key="form"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  className="space-y-8"
                >
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    {fields.slice(0, 2).map((field) => (
                      <div key={field.key} className="relative group">
                        <label className="font-mono text-[9px] text-[var(--muted)] uppercase tracking-widest mb-2 block group-focus-within:text-[var(--accent)] transition-colors">
                          {field.label}
                        </label>
                        <input
                          type={field.key === 'email' ? 'email' : 'text'}
                          value={getValue(field.key)}
                          onChange={e => setValue(field.key, e.target.value)}
                          placeholder={`Enter your ${field.label.toLowerCase()}...`}
                          className={`w-full bg-transparent border-b py-3 text-sm font-sans text-[var(--fg)] outline-none transition-colors placeholder:text-white/5 ${
                            errors[field.key] ? 'border-[var(--accent)]' : 'border-white/10 focus:border-[var(--accent)]'
                          }`}
                        />
                        <AnimatePresence>
                          {errors[field.key] && (
                            <motion.span
                              initial={{ opacity: 0, y: -10 }}
                              animate={{ opacity: 1, y: 0 }}
                              exit={{ opacity: 0 }}
                              className="absolute -bottom-5 left-0 font-mono text-[9px] text-[var(--accent)] lowercase"
                            >
                              ! {errors[field.key]}
                            </motion.span>
                          )}
                        </AnimatePresence>
                      </div>
                    ))}
                  </div>

                  <div className="space-y-10 pt-4">
                    {fields.slice(2, 4).map((field) => (
                      <div key={field.key} className="relative group">
                        <label className="font-mono text-[9px] text-[var(--muted)] uppercase tracking-widest mb-2 block group-focus-within:text-[var(--accent)] transition-colors">
                          {field.label}
                        </label>
                        <textarea
                          value={getValue(field.key)}
                          onChange={e => setValue(field.key, e.target.value)}
                          placeholder={field.key === 'subject' ? 'What is this about?' : 'Your message or vision...'}
                          rows={field.key === 'subject' ? 1 : 2}
                          className={`w-full bg-transparent border-b py-3 text-sm font-sans text-[var(--fg)] outline-none transition-colors placeholder:text-white/5 resize-none ${
                            errors[field.key] ? 'border-[var(--accent)]' : 'border-white/10 focus:border-[var(--accent)]'
                          }`}
                        />
                        <AnimatePresence>
                          {errors[field.key] && (
                            <motion.span
                              initial={{ opacity: 0, y: -10 }}
                              animate={{ opacity: 1, y: 0 }}
                              exit={{ opacity: 0 }}
                              className="absolute -bottom-5 left-0 font-mono text-[9px] text-[var(--accent)] lowercase"
                            >
                              ! {errors[field.key]}
                            </motion.span>
                          )}
                        </AnimatePresence>
                      </div>
                    ))}
                  </div>

                  <div className="pt-4">
                    <AnimatePresence>
                      {submitStatus === 'error' && errors.submit && (
                        <motion.div
                          initial={{ opacity: 0, scale: 0.95 }}
                          animate={{ opacity: 1, scale: 1 }}
                          className="bg-[var(--accent)]/10 border border-[var(--accent)]/20 p-4 rounded-lg mb-6 flex items-center gap-3"
                        >
                          <div className="w-2 h-2 rounded-full bg-[var(--accent)] animate-pulse" />
                          <span className="font-mono text-[10px] text-[var(--accent)] uppercase tracking-wider">
                            {errors.submit}
                          </span>
                        </motion.div>
                      )}
                    </AnimatePresence>

                    <motion.button
                      whileHover={{ scale: 1.01 }}
                      whileTap={{ scale: 0.98 }}
                      onClick={handleSubmit}
                      disabled={submitStatus === 'sending'}
                      className={`w-full h-14 bg-[var(--accent)] text-[var(--bg)] font-display text-base tracking-widest flex items-center justify-center gap-3 group transition-all ${
                        submitStatus === 'sending' ? 'opacity-80 cursor-wait' : 'hover:shadow-[0_0_30px_rgba(184,244,0,0.2)]'
                      }`}
                    >
                      {submitStatus === 'sending' ? (
                        <>
                          <Loader2 size={18} className="animate-spin" />
                          SENDING DISPATCH...
                        </>
                      ) : submitStatus === 'error' ? (
                        <>
                          RETRY DISPATCH
                          <Send size={18} className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                        </>
                      ) : (
                        <>
                          SEND MESSAGE
                          <Send size={18} className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                        </>
                      )}
                    </motion.button>
                    
                    <p className="font-mono text-[8px] text-[var(--muted)] text-center mt-4 uppercase tracking-[0.2em] opacity-40">
                      Encrypted End-to-End Delivery
                    </p>
                  </div>
                </motion.div>
              ) : (
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="bg-white/5 border border-white/10 p-12 rounded-[2rem] text-center"
                >
                  <div className="w-20 h-20 bg-[var(--accent)] rounded-full flex items-center justify-center mx-auto mb-8">
                    <CheckCircle2 size={40} className="text-[var(--bg)]" />
                  </div>
                  <h3 className="font-display text-3xl text-[var(--fg)] mb-4">Message Sent!</h3>
                  <p className="font-sans text-[var(--muted)] mb-10 leading-relaxed">
                    Thank you for reaching out. I'll review your message and get back to you shortly.
                  </p>
                  <button
                    onClick={resetForm}
                    className="font-mono text-[11px] text-[var(--accent)] uppercase tracking-[0.3em] hover:underline"
                  >
                    Send Another Message
                  </button>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>

        {/* Professional Footer */}
        <footer className="w-full px-8 lg:px-16 py-8 border-t border-white/10 flex flex-col md:flex-row items-center justify-between gap-6 bg-[#0a0a0a]/80 backdrop-blur-md">
          <div className="flex flex-col md:flex-row items-center gap-8 md:gap-12">
            <span className="font-mono text-[10px] text-[var(--muted)] uppercase tracking-widest">
              © 2026 Vanshika Babral
            </span>
            <span className="font-mono text-[10px] text-[var(--muted)] uppercase tracking-widest hidden md:block">
              Full Stack Engineer • Designer
            </span>
          </div>

          <div className="flex items-center gap-12">
            <div className="hidden md:flex items-center gap-2">
              <span className="font-mono text-[9px] text-[var(--muted)] uppercase tracking-widest">Status:</span>
              <div className="w-2 h-2 rounded-full bg-[var(--accent)] animate-pulse" />
              <span className="font-mono text-[9px] text-[var(--fg)] uppercase tracking-widest">Available for Hire</span>
            </div>
            
            <button
              onClick={handleBackToTop}
              className="flex items-center gap-3 group"
              data-hover
            >
              <span className="font-mono text-[10px] text-[var(--muted)] group-hover:text-[var(--accent)] transition-colors uppercase tracking-widest">
                Back to Top
              </span>
              <div className="w-8 h-8 rounded-full border border-white/10 flex items-center justify-center group-hover:border-[var(--accent)] group-hover:text-[var(--accent)] transition-all">
                <ArrowUp size={14} className="group-hover:-translate-y-1 transition-transform" />
              </div>
            </button>
          </div>
        </footer>
      </div>
    </motion.section>
  );
}