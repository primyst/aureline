"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  Terminal, 
  CheckCircle2, 
  XCircle, 
  AlertTriangle, 
  GitBranch, 
  Cpu, 
  Database, 
  CalendarClock, 
  ChevronRight, 
  Play, 
  FileCode, 
  Activity,
  Box
} from "lucide-react";

// --- Types ---
type ProjectId = "auditor" | "data" | "scheduler";

interface LogEntry {
  type: "info" | "success" | "warning" | "error" | "command";
  content: string;
  delay?: number;
}

// --- Simulation Data ---
const SIMULATIONS: Record<ProjectId, LogEntry[]> = {
  auditor: [
    { type: "command", content: "$ python main.py --test complexity", delay: 0 },
    { type: "info", content: "TEST 2/5", delay: 100 },
    { type: "info", content: "Prompt: What is the worst-case complexity of quick sort?", delay: 200 },
    { type: "info", content: "AI Answer: Quick sort has a worst-case complexity of O(n log n)...", delay: 400 },
    { type: "info", content: "", delay: 500 },
    { type: "info", content: "CLAIMS (2 extracted)", delay: 600 },
    { type: "warning", content: "#1 [COMPLEXITY] ⚠️  WARNING", delay: 800 },
    { type: "info", content: "    Quick sort has a worst-case complexity of O(n log n).", delay: 900 },
    { type: "error", content: "    → 'O(n log n)' is the best-case for Quick Sort, not worst-case (O(n²)).", delay: 1000 },
    { type: "info", content: "       Expected: O(n²)   Found: O(n log n)", delay: 1100 },
    { type: "info", content: "", delay: 1200 },
    { type: "warning", content: "FINAL VERDICT  ⚠️  WARNING", delay: 1300 },
  ],
  data: [
    { type: "command", content: "$ python main.py --scenario outlier", delay: 0 },
    { type: "info", content: "SCENARIO 2/4: E-Commerce Revenue — Outlier Inflation", delay: 100 },
    { type: "info", content: "", delay: 200 },
    { type: "info", content: "  Mean:      1.6K   ← what naive analysis reports", delay: 300 },
    { type: "info", content: "  Median:  803.71   ← middle of actual distribution", delay: 400 },
    { type: "error", content: "  Mean–Median gap:  98.6%  ❌ HIGH skew", delay: 500 },
    { type: "info", content: "", delay: 600 },
    { type: "info", content: "  AI CLAIM EVALUATION", delay: 700 },
    { type: "error", content: "  ❌ MISLEADING  \"Mean is a reliable measure\"", delay: 800 },
    { type: "info", content: "     mean (1.6K) and median (803.71) diverge by 98.6%; 12 outliers distorting the mean.", delay: 900 },
    { type: "success", content: "  ✅ VALID       \"Median is more reliable than mean\"", delay: 1000 },
    { type: "info", content: "     Confirmed. Divergence of 98.6% and 12 outliers justify using the median.", delay: 1100 },
  ],
  scheduler: [
    { type: "command", content: "$ python main.py --deadline-tight", delay: 0 },
    { type: "info", content: "SCENARIO 2/4: Tight Deadlines — correct and incorrect claims mixed", delay: 100 },
    { type: "info", content: "", delay: 200 },
    { type: "info", content: "  SCHEDULE  (2 scheduled, 2 dropped)", delay: 300 },
    { type: "info", content: "  Client demo prep         0.0h   2.0h  |████", delay: 400 },
    { type: "info", content: "  Email responses          2.0h   3.0h  |    ██", delay: 500 },
    { type: "info", content: "", delay: 600 },
    { type: "info", content: "  Dropped:", delay: 700 },
    { type: "info", content: "    • Emergency patch  (duration 3.0h > deadline 3.0h)", delay: 800 },
    { type: "info", content: "", delay: 900 },
    { type: "info", content: "  CLAIM EVALUATION", delay: 1000 },
    { type: "success", content: "  ✅ CORRECT   \"All tasks meet deadlines\"", delay: 1100 },
    { type: "error", content: "  ❌ INCORRECT \"All tasks scheduled\"   → 2 task(s) dropped", delay: 1200 },
    { type: "success", content: "  ✅ CORRECT   \"2 tasks dropped\"", delay: 1300 },
  ],
};

// --- Components ---

const StatusBadge = ({ children, color }: { children: React.ReactNode; color: "emerald" | "amber" | "rose" | "blue" }) => {
  const colors = {
    emerald: "bg-emerald-500/10 text-emerald-400 border-emerald-500/20",
    amber: "bg-amber-500/10 text-amber-400 border-amber-500/20",
    rose: "bg-rose-500/10 text-rose-400 border-rose-500/20",
    blue: "bg-blue-500/10 text-blue-400 border-blue-500/20",
  };
  
  return (
    <span className={`inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-medium border ${colors[color]}`}>
      {children}
    </span>
  );
};

const TerminalPreview = ({ projectId }: { projectId: ProjectId }) => {
  const [logs, setLogs] = useState<LogEntry[]>([]);
  const [isRunning, setIsRunning] = useState(false);
  const [key, setKey] = useState(0); // Force re-render

  useEffect(() => {
    setLogs([]);
    setIsRunning(true);
    
    const simulation = SIMULATIONS[projectId];
    let timeouts: NodeJS.Timeout[] = [];

    // Guard against empty simulation array
    if (simulation.length === 0) {
      setIsRunning(false);
      return;
    }

    simulation.forEach((entry) => {
      const timeout = setTimeout(() => {
        setLogs((prev) => [...prev, entry]);
      }, entry.delay ?? 0);
      timeouts.push(timeout);
    });

    const lastEntry = simulation[simulation.length - 1];
    const finishTimeout = setTimeout(() => {
      setIsRunning(false);
    }, (lastEntry.delay ?? 0) + 500);
    timeouts.push(finishTimeout);

    return () => {
      timeouts.forEach(clearTimeout);
    };
  }, [projectId, key]);

  const getLogColor = (type: string) => {
    switch (type) {
      case "command": return "text-zinc-300";
      case "success": return "text-emerald-400";
      case "warning": return "text-amber-400";
      case "error": return "text-rose-400";
      default: return "text-zinc-400";
    }
  };

  return (
    <div className="bg-zinc-950 border border-zinc-800 rounded-lg overflow-hidden font-mono text-sm shadow-2xl">
      {/* Terminal Header */}
      <div className="bg-zinc-900/50 border-b border-zinc-800 px-4 py-2 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="flex gap-1.5">
            <div className="w-3 h-3 rounded-full bg-zinc-700" />
            <div className="w-3 h-3 rounded-full bg-zinc-700" />
          </div>
          <span className="text-zinc-500 text-xs ml-2">evaluation_engine.py</span>
        </div>
        <button 
          onClick={() => setKey(k => k + 1)}
          className="text-zinc-500 hover:text-zinc-300 transition-colors"
          title="Re-run simulation"
        >
          <Play size={14} />
        </button>
      </div>
      
      {/* Terminal Body */}
      <div className="p-4 h-80 overflow-y-auto space-y-1 scrollbar-hide">
        <AnimatePresence>
          {logs.map((log, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              className={getLogColor(log.type)}
            >
              {log.content}
            </motion.div>
          ))}
        </AnimatePresence>
        {isRunning && (
          <motion.div 
            animate={{ opacity: [0, 1, 0] }}
            transition={{ repeat: Infinity, duration: 0.8 }}
            className="text-zinc-500"
          >
            ▋
          </motion.div>
        )}
      </div>
    </div>
  );
};

const ProjectCard = ({ 
  id, 
  title, 
  description, 
  icon: Icon, 
  tags, 
  active, 
  onClick 
}: { 
  id: ProjectId;
  title: string;
  description: string;
  icon: any;
  tags: string[];
  active: boolean;
  onClick: () => void;
}) => {
  return (
    <motion.button
      onClick={onClick}
      className={`w-full text-left group relative p-5 rounded-xl border transition-all duration-300 ${
        active 
          ? "bg-zinc-900/50 border-zinc-700 shadow-lg shadow-zinc-950/50" 
          : "bg-transparent border-zinc-800/50 hover:border-zinc-700 hover:bg-zinc-900/20"
      }`}
      whileHover={{ scale: 1.01 }}
      whileTap={{ scale: 0.99 }}
    >
      <div className="flex items-start justify-between mb-3">
        <div className={`p-2.5 rounded-lg ${active ? "bg-zinc-800 text-zinc-200" : "bg-zinc-900 text-zinc-500 group-hover:text-zinc-300"}`}>
          <Icon size={20} />
        </div>
        {active && (
          <motion.div 
            layoutId="activeIndicator"
            className="w-1.5 h-1.5 rounded-full bg-emerald-500 shadow-[0_0_10px_rgba(16,185,129,0.5)]" 
          />
        )}
      </div>
      
      <h3 className={`font-semibold mb-1.5 ${active ? "text-zinc-100" : "text-zinc-400 group-hover:text-zinc-300"}`}>
        {title}
      </h3>
      
      <p className="text-zinc-500 text-sm leading-relaxed mb-4 line-clamp-2">
        {description}
      </p>
      
      <div className="flex flex-wrap gap-2">
        {tags.map(tag => (
          <span key={tag} className="text-[10px] uppercase tracking-wider text-zinc-600 font-medium">
            {tag}
          </span>
        ))}
      </div>
      
      {active && (
        <motion.div 
          layoutId="activeBorder"
          className="absolute inset-0 border-2 border-zinc-700 rounded-xl pointer-events-none" 
        />
      )}
    </motion.button>
  );
};

export default function Page() {
  const [activeProject, setActiveProject] = useState<ProjectId>("auditor");
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  return (
    <main className="min-h-screen bg-zinc-950 text-zinc-300 selection:bg-emerald-500/20 selection:text-emerald-200">
      
      {/* Top Bar */}
      <div className="fixed top-0 left-0 right-0 h-14 border-b border-zinc-800/50 bg-zinc-950/80 backdrop-blur-md z-50 flex items-center justify-between px-6">
        
        <div className="flex items-center gap-6 text-sm">
          <a href="https://github.com/primyst" className="text-zinc-500 hover:text-zinc-300 transition-colors flex items-center gap-2">
            <GitBranch size={14} />
            <span className="hidden sm:inline">github/primyst</span>
          </a>
          <span className="text-zinc-600">|</span>
          <span className="text-zinc-500 font-mono text-xs">abdullateefqudusleeq@gmail.com</span>
        </div>
      </div>

      <div className="pt-24 pb-20 px-6 max-w-7xl mx-auto">
        
        {/* Hero Section */}
        <section className="mb-20">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="space-y-6"
          >
            
            
            <h1 className="text-4xl md:text-6xl font-bold text-zinc-100 tracking-tight">
              Abdullateef Abdulqudus
              <span className="text-zinc-600 block text-2xl md:text-3xl mt-2 font-normal font-mono">
                Akinwumi
              </span>
            </h1>
            
            <div className="max-w-2xl space-y-4 text-lg text-zinc-400 leading-relaxed">
              <p>
                Building evaluation systems that validate AI reasoning, detect computational errors, 
                and verify constraint satisfaction. Focused on the intersection of automated validation 
                and structured correctness.
              </p>
              <p className="text-zinc-500 text-base">
                Python • Constraint Checking • Statistical Validation • Algorithmic Analysis
              </p>
            </div>
          </motion.div>
        </section>

        {/* Interactive Workstation */}
        <section className="mb-24">
          <div className="flex items-center gap-2 mb-8 text-zinc-500 font-mono text-sm">
            <Terminal size={14} />
            <span>EVALUATION_SYSTEMS // SELECT_MODULE</span>
          </div>
          
          <div className="grid lg:grid-cols-12 gap-6">
            {/* Project Navigation */}
            <div className="lg:col-span-4 space-y-4">
              <ProjectCard
                id="auditor"
                title="AI Output Auditor"
                description="Extracts and validates claims from AI outputs: complexity analysis, numerical correctness, logical consistency."
                icon={Cpu}
                tags={["Claim Extraction", "Complexity Analysis", "Numerical Validation"]}
                active={activeProject === "auditor"}
                onClick={() => setActiveProject("auditor")}
              />
              
              <ProjectCard
                id="data"
                title="Data Validation Engine"
                description="Synthetic data simulation with statistical profiling. Evaluates whether claims about data are valid or misleading."
                icon={Database}
                tags={["Synthetic Data", "Statistical Analysis", "Bias Detection"]}
                active={activeProject === "data"}
                onClick={() => setActiveProject("data")}
              />
              
              <ProjectCard
                id="scheduler"
                title="Constraint Validation System"
                description="EDF scheduling under hard constraints. Evaluates claims about schedule feasibility and deadline satisfaction."
                icon={CalendarClock}
                tags={["Constraint Satisfaction", "EDF Algorithm", "Feasibility Checking"]}
                active={activeProject === "scheduler"}
                onClick={() => setActiveProject("scheduler")}
              />
            </div>

            {/* Preview Panel */}
            <div className="lg:col-span-8">
              <div className="bg-zinc-900/30 border border-zinc-800 rounded-2xl p-6 h-full">
                <div className="flex items-center justify-between mb-6">
                  <div className="flex items-center gap-3">
                    <FileCode size={16} className="text-zinc-500" />
                    <span className="font-mono text-sm text-zinc-400">Live Execution Preview</span>
                  </div>
                  <div className="flex gap-2">
                    <div className="w-2 h-2 rounded-full bg-zinc-700" />
                    <div className="w-2 h-2 rounded-full bg-zinc-700" />
                    <div className="w-2 h-2 rounded-full bg-zinc-700" />
                  </div>
                </div>
                
                <TerminalPreview projectId={activeProject} />
                
                <div className="mt-6 flex items-center justify-between text-sm">
                  <div className="flex gap-4">
                    <a 
                      href={`https://github.com/primyst/${activeProject === "auditor" ? "ai-output-auditor" : activeProject === "data" ? "data-validation-engine" : "constraint-validation-system"}`}
                      className="text-zinc-400 hover:text-zinc-200 flex items-center gap-2 transition-colors"
                    >
                      <GitBranch size={14} />
                      View Source
                    </a>
                    <span className="text-zinc-700">|</span>
                    <span className="text-zinc-500 font-mono text-xs">
                      {activeProject === "auditor" && "Python 3.10+ • Zero dependencies"}
                      {activeProject === "data" && "Synthetic generation • IQR analysis"}
                      {activeProject === "scheduler" && "EDF algorithm • Hard constraints"}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Evaluation Philosophy */}
        <section className="mb-24 border-t border-zinc-800/50 pt-16">
          <div className="grid md:grid-cols-2 gap-12 items-start">
            <div>
              <h2 className="text-2xl font-semibold text-zinc-200 mb-6 flex items-center gap-3">
                <Box size={20} className="text-zinc-500" />
                Evaluation Philosophy
              </h2>
              <div className="space-y-4 text-zinc-400 leading-relaxed">
                <p>
                  My work focuses on the validation layer of AI systems—not generating outputs, 
                  but verifying their correctness. This includes:
                </p>
                <ul className="space-y-3 mt-4">
                  <li className="flex items-start gap-3">
                    <CheckCircle2 size={18} className="text-emerald-500/60 mt-1 shrink-0" />
                    <span>Detecting reasoning errors in algorithmic claims</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircle2 size={18} className="text-emerald-500/60 mt-1 shrink-0" />
                    <span>Validating statistical conclusions against distributional bias</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircle2 size={18} className="text-emerald-500/60 mt-1 shrink-0" />
                    <span>Verifying constraint satisfaction in scheduling and optimization</span>
                  </li>
                </ul>
              </div>
            </div>
            
            <div className="bg-zinc-900/30 border border-zinc-800 rounded-xl p-6 font-mono text-sm">
              <div className="text-zinc-500 mb-4"># System Architecture</div>
              <div className="space-y-2 text-zinc-300">
                <div className="flex gap-4">
                  <span className="text-amber-500/60">Input</span>
                  <span className="text-zinc-600">→</span>
                  <span>AI Output / Dataset / Schedule</span>
                </div>
                <div className="flex gap-4">
                  <span className="text-blue-500/60">Process</span>
                  <span className="text-zinc-600">→</span>
                  <span>Extract Claims → Validate → Verdict</span>
                </div>
                <div className="flex gap-4">
                  <span className="text-emerald-500/60">Output</span>
                  <span className="text-zinc-600">→</span>
                  <span>Structured Report (VALID/MISLEADING/ERROR)</span>
                </div>
              </div>
              
              <div className="mt-6 pt-6 border-t border-zinc-800 text-zinc-500 text-xs">
                <div className="flex items-center gap-2 mb-2">
                  <AlertTriangle size={12} />
                  <span>Alignment with AI Training Roles</span>
                </div>
                <p className="leading-relaxed">
                  These systems mirror the core evaluation tasks in AI training: 
                  assessing correctness, identifying assumptions, and validating 
                  constraints in model outputs.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Footer */}
        <footer className="border-t border-zinc-800/50 pt-8 flex flex-col md:flex-row justify-between items-start md:items-center gap-4 text-sm text-zinc-500">
          <div className="flex items-center gap-2">
            <span className="font-mono">abdullateefqudusleeq@gmail.com</span>
          </div>
          
          <div className="flex items-center gap-6">
            <a href="https://github.com/primyst" className="hover:text-zinc-300 transition-colors">
              GitHub
            </a>
            <span className="text-zinc-800">|</span>
            <span className="text-zinc-600">Built with Next.js + Framer Motion</span>
          </div>
        </footer>
        
      </div>
    </main>
  );
}
