import { createFileRoute, Link } from "@tanstack/react-router";
import { Card } from "@/components/ui/card";
import { Mail, FileText, ListChecks, Search, MessageSquare, ArrowRight, Sparkles } from "lucide-react";

export const Route = createFileRoute("/_app/")({
  component: Dashboard,
});

const TOOLS = [
  { to: "/email", title: "Smart Email Generator", desc: "Draft professional emails with the right tone in seconds.", icon: Mail, color: "from-blue-500 to-indigo-500" },
  { to: "/meeting", title: "Meeting Notes Summarizer", desc: "Turn raw notes into clear summaries and action items.", icon: FileText, color: "from-emerald-500 to-teal-500" },
  { to: "/tasks", title: "AI Task Planner", desc: "Break goals into prioritized, time-boxed tasks.", icon: ListChecks, color: "from-amber-500 to-orange-500" },
  { to: "/research", title: "AI Research Assistant", desc: "Get organized briefings on any topic with key points.", icon: Search, color: "from-fuchsia-500 to-pink-500" },
  { to: "/chat", title: "AI Chatbot", desc: "Conversational assistant for ad-hoc workplace help.", icon: MessageSquare, color: "from-violet-500 to-purple-500" },
] as const;

function Dashboard() {
  return (
    <div className="space-y-8">
      <section className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-primary to-indigo-600 text-primary-foreground p-8 lg:p-10">
        <div className="absolute inset-0 opacity-20 [background-image:radial-gradient(circle_at_20%_20%,white_0,transparent_40%),radial-gradient(circle_at_80%_60%,white_0,transparent_35%)]" />
        <div className="relative">
          <div className="inline-flex items-center gap-2 text-xs bg-white/15 rounded-full px-3 py-1 mb-4">
            <Sparkles className="size-3.5" /> AI-powered workplace productivity
          </div>
          <h2 className="text-3xl lg:text-4xl font-semibold tracking-tight max-w-2xl">
            Automate the routine. Focus on what matters.
          </h2>
          <p className="mt-3 text-sm lg:text-base text-white/80 max-w-xl">
            Five purpose-built AI assistants to speed up email, meetings, planning, research and
            day-to-day work questions.
          </p>
        </div>
      </section>

      <section>
        <h3 className="text-sm font-semibold text-muted-foreground uppercase tracking-wide mb-4">
          Your assistants
        </h3>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {TOOLS.map((t) => {
            const Icon = t.icon;
            return (
              <Link key={t.to} to={t.to} className="group">
                <Card className="p-5 h-full hover:shadow-md hover:border-primary/40 transition-all">
                  <div className={`size-10 rounded-lg bg-gradient-to-br ${t.color} text-white flex items-center justify-center mb-4`}>
                    <Icon className="size-5" />
                  </div>
                  <div className="font-medium">{t.title}</div>
                  <p className="text-sm text-muted-foreground mt-1">{t.desc}</p>
                  <div className="mt-4 text-xs text-primary inline-flex items-center gap-1 group-hover:gap-2 transition-all">
                    Open <ArrowRight className="size-3.5" />
                  </div>
                </Card>
              </Link>
            );
          })}
        </div>
      </section>

      <section className="grid sm:grid-cols-3 gap-4">
        {[
          { label: "Time saved this week", value: "4.2 hrs" },
          { label: "AI requests", value: "128" },
          { label: "Drafts generated", value: "37" },
        ].map((s) => (
          <Card key={s.label} className="p-5">
            <div className="text-xs text-muted-foreground">{s.label}</div>
            <div className="text-2xl font-semibold mt-1">{s.value}</div>
          </Card>
        ))}
      </section>
    </div>
  );
}
