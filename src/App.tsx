"use client";

import {
  AlertTriangle,
  ArrowRight,
  BrainCircuit,
  Check,
  Code2,
  GitPullRequestArrow,
  Layers3,
  Menu,
  Network,
  ShieldCheck,
  Sparkles,
  X,
} from "lucide-react";
import { FormEvent, useState } from "react";

const SURVEY_URL = "https://forms.gle/ferbNWQLu7RNKfR88";
const WAITLIST_API_URL =
  import.meta.env.VITE_WAITLIST_API_URL ||
  "https://script.google.com/macros/s/AKfycbze_dvIhPDDyeQIOaMM56QAJZRMBz0n6ql7AKR_jaAqRCCtWbl2jqYXcuIIfOqWVtYKrA/exec";

const navItems = [
  { label: "How It Works", href: "#how-it-works" },
  { label: "Why ArchLens", href: "#why-archlens" },
  { label: "Research", href: "#research" },
];

const problemCards = [
  {
    title: "Duplicate Responsibilities",
    body: "AI creates functionality that already exists elsewhere in the system.",
    icon: Layers3,
  },
  {
    title: "Architecture Drift",
    body: "New code gradually breaks established architectural patterns.",
    icon: Network,
  },
  {
    title: "Lost Decisions",
    body: "The reasoning behind earlier engineering decisions disappears over time.",
    icon: BrainCircuit,
  },
  {
    title: "Growing Complexity",
    body: "More generated code means more dependencies, files and relationships to understand.",
    icon: Sparkles,
  },
];

const steps = [
  {
    number: "01",
    title: "Connect Repository",
    body: "Connect a GitHub repository to ArchLens.",
  },
  {
    number: "02",
    title: "Build Architecture Memory",
    body: "ArchLens maps important modules, dependencies, responsibilities and architectural decisions.",
  },
  {
    number: "03",
    title: "Compare Every PR",
    body: "Each change is compared against the architecture that existed before.",
  },
  {
    number: "04",
    title: "Detect Drift",
    body: "ArchLens highlights unexpected dependencies, responsibility changes and architectural rule violations.",
  },
];

const features = [
  "Architecture Mapping",
  "Architecture Diff",
  "Decision Memory",
  "Responsibility Ownership",
  "Dependency Detection",
  "Architecture Timeline",
  "AI Agent Context",
  "PR Architecture Checks",
];

const featureBodies = [
  "Understand how the major components of your repository connect.",
  "See the architectural impact of a pull request, not only changed lines.",
  "Preserve ADRs, architectural rules and important engineering decisions.",
  "Understand which components own authentication, billing, users, orders and other responsibilities.",
  "Identify unexpected or cross-layer dependencies.",
  "Understand how system architecture evolves over time.",
  "Give AI coding agents consistent architectural context before they generate code.",
  "Surface architectural findings directly in the pull-request workflow.",
];

const tools = [
  "Cursor",
  "Claude Code",
  "GitHub Copilot",
  "Codex",
  "Gemini",
  "Windsurf",
];

type FormFields = {
  name: string;
  email: string;
  message: string;
  company: string;
};

type FormErrors = Partial<Record<"name" | "email", string>>;

function scrollToWaitlist() {
  document.getElementById("early-access")?.scrollIntoView({ behavior: "smooth" });
}

export default function Home() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [fields, setFields] = useState<FormFields>({
    name: "",
    email: "",
    message: "",
    company: "",
  });
  const [errors, setErrors] = useState<FormErrors>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [status, setStatus] = useState<"idle" | "success" | "error">("idle");

  const validate = () => {
    const nextErrors: FormErrors = {};
    const name = fields.name.trim();
    const email = fields.email.trim();
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!name) nextErrors.name = "Name is required.";
    if (!email) {
      nextErrors.email = "Email is required.";
    } else if (!emailPattern.test(email)) {
      nextErrors.email = "Enter a valid email address.";
    }

    setErrors(nextErrors);
    return Object.keys(nextErrors).length === 0;
  };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setStatus("idle");

    if (fields.company.trim()) return;
    if (!validate()) return;

    setIsSubmitting(true);

    try {
      const response = await fetch(WAITLIST_API_URL, {
        method: "POST",
        headers: {
          "Content-Type": "text/plain;charset=utf-8",
        },
        body: JSON.stringify({
          name: fields.name.trim(),
          email: fields.email.trim(),
          message: fields.message.trim(),
        }),
      });

      const data = await response.json();

      if (!data.success) {
        throw new Error(data.error || "Submission failed");
      }

      setFields({ name: "", email: "", message: "", company: "" });
      setErrors({});
      setStatus("success");
    } catch (error) {
      console.error("ArchLens waitlist submission failed:", error);
      setStatus("error");
    } finally {
      setIsSubmitting(false);
    }
  };

  const updateField = (field: keyof FormFields, value: string) => {
    setFields((current) => ({ ...current, [field]: value }));
    if (field === "name" || field === "email") {
      setErrors((current) => ({ ...current, [field]: undefined }));
    }
  };

  return (
    <main className="min-h-screen overflow-x-hidden bg-white text-slate-950">
      <header className="sticky top-0 z-50 border-b border-slate-200/80 bg-white/90 backdrop-blur-xl">
        <nav
          aria-label="Primary navigation"
          className="mx-auto flex h-16 max-w-6xl items-center justify-between px-5 sm:px-6 lg:px-8"
        >
          <a href="#" className="group flex items-center gap-2 font-semibold text-slate-950">
            <span className="flex h-9 w-9 items-center justify-center rounded-lg border border-blue-200 bg-blue-50 text-blue-700 shadow-sm">
              <Network className="h-4 w-4" aria-hidden="true" />
            </span>
            <span>ArchLens</span>
          </a>

          <div className="hidden items-center gap-7 md:flex">
            {navItems.map((item) => (
              <a
                key={item.label}
                href={item.href}
                className="text-sm font-medium text-slate-600 transition hover:text-blue-700"
              >
                {item.label}
              </a>
            ))}
            <button
              type="button"
              onClick={scrollToWaitlist}
              className="rounded-lg bg-blue-700 px-4 py-2.5 text-sm font-semibold text-white shadow-lg shadow-blue-700/18 transition hover:bg-blue-800 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-700"
            >
              Join Early Access
            </button>
          </div>

          <button
            type="button"
            aria-label={menuOpen ? "Close navigation menu" : "Open navigation menu"}
            aria-expanded={menuOpen}
            onClick={() => setMenuOpen((open) => !open)}
            className="inline-flex h-11 w-11 items-center justify-center rounded-lg border border-slate-200 bg-white text-slate-800 shadow-sm md:hidden"
          >
            {menuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </nav>

        {menuOpen && (
          <div className="border-t border-slate-200 bg-white px-5 py-4 shadow-lg md:hidden">
            <div className="mx-auto flex max-w-6xl flex-col gap-2">
              {navItems.map((item) => (
                <a
                  key={item.label}
                  href={item.href}
                  onClick={() => setMenuOpen(false)}
                  className="rounded-lg px-3 py-3 text-base font-medium text-slate-700 hover:bg-slate-50"
                >
                  {item.label}
                </a>
              ))}
              <button
                type="button"
                onClick={() => {
                  setMenuOpen(false);
                  scrollToWaitlist();
                }}
                className="mt-2 rounded-lg bg-blue-700 px-4 py-3 text-base font-semibold text-white"
              >
                Join Early Access
              </button>
            </div>
          </div>
        )}
      </header>

      <section className="relative isolate">
        <div className="absolute inset-0 -z-10 bg-[radial-gradient(circle_at_75%_16%,rgba(79,70,229,0.12),transparent_30%),linear-gradient(180deg,#ffffff_0%,#f7faff_100%)]" />
        <div className="mx-auto grid max-w-6xl gap-12 px-5 pb-20 pt-16 sm:px-6 sm:pt-20 lg:grid-cols-[1fr_0.95fr] lg:px-8 lg:pb-24">
          <div className="flex flex-col justify-center">
            <div className="mb-5 inline-flex w-fit items-center gap-2 rounded-full border border-blue-200 bg-white px-3 py-1.5 text-sm font-semibold text-blue-800 shadow-sm">
              <Sparkles className="h-4 w-4" aria-hidden="true" />
              Architecture Memory for AI Development
            </div>
            <h1 className="max-w-3xl text-5xl font-semibold leading-[1.02] tracking-normal text-slate-950 sm:text-6xl lg:text-7xl">
              Your AI writes code faster than you can understand it.
            </h1>
            <p className="mt-6 max-w-2xl text-lg leading-8 text-slate-650">
              ArchLens helps you understand how every pull request changes your
              software architecture - before architectural drift becomes technical debt.
            </p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <button
                type="button"
                onClick={scrollToWaitlist}
                className="inline-flex min-h-12 items-center justify-center gap-2 rounded-lg bg-blue-700 px-6 py-3 font-semibold text-white shadow-xl shadow-blue-700/20 transition hover:-translate-y-0.5 hover:bg-blue-800 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-700"
              >
                Join Early Access
                <ArrowRight className="h-4 w-4" aria-hidden="true" />
              </button>
              <a
                href={SURVEY_URL}
                target="_blank"
                rel="noreferrer"
                className="inline-flex min-h-12 items-center justify-center rounded-lg border border-slate-300 bg-white px-6 py-3 font-semibold text-slate-800 shadow-sm transition hover:-translate-y-0.5 hover:border-blue-300 hover:text-blue-800 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-700"
              >
                Take the Research Survey
              </a>
            </div>
            <p className="mt-6 text-sm font-medium text-slate-700">
              Built for developers using Cursor, Claude Code, GitHub Copilot, Codex and other AI coding tools.
            </p>
            <p className="mt-2 text-sm text-slate-500">
              Early-stage research - Private beta - No credit card
            </p>
          </div>

          <ArchitectureMockup />
        </div>
      </section>

      <section id="why-archlens" className="bg-white py-20 sm:py-24">
        <div className="mx-auto max-w-6xl px-5 sm:px-6 lg:px-8">
          <div className="max-w-3xl">
            <p className="text-sm font-semibold uppercase tracking-[0.14em] text-blue-700">
              The Problem
            </p>
            <h2 className="mt-4 text-3xl font-semibold tracking-normal text-slate-950 sm:text-5xl">
              AI can understand your code. But does it remember your architecture?
            </h2>
            <p className="mt-5 text-lg leading-8 text-slate-600">
              AI coding tools are incredibly good at solving the task directly in
              front of them. As projects grow, developers can lose track of
              dependencies, responsibilities and earlier architectural decisions.
            </p>
          </div>

          <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {problemCards.map((card) => (
              <article
                key={card.title}
                className="rounded-lg border border-slate-200 bg-white p-6 shadow-sm transition hover:-translate-y-1 hover:border-blue-200 hover:shadow-xl hover:shadow-blue-950/8"
              >
                <div className="mb-5 flex h-11 w-11 items-center justify-center rounded-lg bg-blue-50 text-blue-700">
                  <card.icon className="h-5 w-5" aria-hidden="true" />
                </div>
                <h3 className="text-lg font-semibold text-slate-950">{card.title}</h3>
                <p className="mt-3 leading-7 text-slate-600">{card.body}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-slate-50 py-20 sm:py-24">
        <div className="mx-auto max-w-6xl px-5 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-3xl text-center">
            <h2 className="text-3xl font-semibold tracking-normal text-slate-950 sm:text-5xl">
              GitHub shows which lines changed.
              <span className="block text-blue-700">ArchLens shows how the system changed.</span>
            </h2>
          </div>

          <div className="mt-12 grid gap-5 lg:grid-cols-2">
            <DiffCard
              eyebrow="Traditional Code Diff"
              caption="You see the implementation change."
              code={["+ import UserRepository", "+ const repo = new UserRepository()"]}
            />
            <ArchitectureDiffCard />
          </div>
        </div>
      </section>

      <section id="how-it-works" className="bg-white py-20 sm:py-24">
        <div className="mx-auto max-w-6xl px-5 sm:px-6 lg:px-8">
          <div className="max-w-3xl">
            <p className="text-sm font-semibold uppercase tracking-[0.14em] text-blue-700">
              How It Works
            </p>
            <h2 className="mt-4 text-3xl font-semibold tracking-normal text-slate-950 sm:text-5xl">
              Architecture awareness on every pull request.
            </h2>
          </div>

          <div className="relative mt-12 grid gap-5 md:grid-cols-2 lg:grid-cols-4">
            <div className="absolute left-8 right-8 top-8 hidden h-px bg-gradient-to-r from-blue-200 via-indigo-300 to-violet-200 lg:block" />
            {steps.map((step) => (
              <article
                key={step.number}
                className="relative rounded-lg border border-slate-200 bg-white p-6 shadow-sm"
              >
                <span className="flex h-16 w-16 items-center justify-center rounded-lg border border-blue-200 bg-blue-50 text-xl font-semibold text-blue-700">
                  {step.number}
                </span>
                <h3 className="mt-6 text-lg font-semibold text-slate-950">{step.title}</h3>
                <p className="mt-3 leading-7 text-slate-600">{step.body}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-slate-50 py-20 sm:py-24">
        <div className="mx-auto max-w-6xl px-5 sm:px-6 lg:px-8">
          <div className="max-w-3xl">
            <p className="text-sm font-semibold uppercase tracking-[0.14em] text-blue-700">
              Capabilities
            </p>
            <h2 className="mt-4 text-3xl font-semibold tracking-normal text-slate-950 sm:text-5xl">
              More than another AI code reviewer.
            </h2>
          </div>

          <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {features.map((feature, index) => (
              <article
                key={feature}
                className="rounded-lg border border-slate-200 bg-white p-5 shadow-sm transition hover:border-indigo-200 hover:shadow-lg hover:shadow-indigo-950/6"
              >
                <ShieldCheck className="h-5 w-5 text-indigo-600" aria-hidden="true" />
                <h3 className="mt-4 font-semibold text-slate-950">{feature}</h3>
                <p className="mt-2 text-sm leading-6 text-slate-600">{featureBodies[index]}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-white py-20 sm:py-24">
        <div className="mx-auto grid max-w-6xl gap-10 px-5 sm:px-6 lg:grid-cols-[0.9fr_1.1fr] lg:px-8">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.14em] text-blue-700">
              AI-Assisted Development
            </p>
            <h2 className="mt-4 text-3xl font-semibold tracking-normal text-slate-950 sm:text-5xl">
              Built for the AI-assisted development era.
            </h2>
            <p className="mt-5 text-lg leading-8 text-slate-600">
              Cursor, Claude Code, Copilot and Codex can generate code quickly.
              ArchLens is designed to provide persistent architectural context that
              exists beyond a single prompt or coding session.
            </p>
          </div>
          <div className="flex content-center items-center">
            <div className="grid w-full grid-cols-2 gap-3 sm:grid-cols-3">
              {tools.map((tool) => (
                <span
                  key={tool}
                  className="rounded-lg border border-slate-200 bg-slate-50 px-4 py-4 text-center font-semibold text-slate-700 shadow-sm"
                >
                  {tool}
                </span>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section id="research" className="bg-slate-950 py-20 text-white sm:py-24">
        <div className="mx-auto grid max-w-6xl gap-8 px-5 sm:px-6 lg:grid-cols-[1fr_auto] lg:px-8">
          <div className="max-w-3xl">
            <p className="text-sm font-semibold uppercase tracking-[0.14em] text-blue-300">
              Research
            </p>
            <h2 className="mt-4 text-3xl font-semibold tracking-normal sm:text-5xl">
              We&apos;re validating this problem with developers.
            </h2>
            <p className="mt-5 text-lg leading-8 text-slate-300">
              We are researching how developers use AI coding tools such as Cursor,
              Claude Code, GitHub Copilot, Codex and similar tools, and how these
              tools affect understanding and maintenance of software architecture.
            </p>
            <p className="mt-4 leading-7 text-slate-300">
              This survey is for research and product validation purposes and
              should take approximately 4-6 minutes. You do not need to provide
              confidential source code or company information.
            </p>
          </div>
          <div className="flex items-center lg:justify-end">
            <a
              href={SURVEY_URL}
              target="_blank"
              rel="noreferrer"
              className="inline-flex min-h-12 w-full items-center justify-center gap-2 rounded-lg bg-white px-6 py-3 font-semibold text-slate-950 shadow-xl shadow-black/20 transition hover:-translate-y-0.5 hover:bg-blue-50 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white sm:w-auto"
            >
              Take the 4-Minute Survey
              <ArrowRight className="h-4 w-4" aria-hidden="true" />
            </a>
          </div>
        </div>
      </section>

      <section id="early-access" className="bg-gradient-to-b from-blue-50 to-indigo-50 py-20 sm:py-24">
        <div className="mx-auto grid max-w-6xl gap-10 px-5 sm:px-6 lg:grid-cols-[0.9fr_1.1fr] lg:px-8">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.14em] text-blue-700">
              Join Early Access
            </p>
            <h2 className="mt-4 text-4xl font-semibold tracking-normal text-slate-950 sm:text-6xl">
              Help shape ArchLens.
            </h2>
            <p className="mt-5 text-lg leading-8 text-slate-650">
              We&apos;re looking for developers, students, technical founders and
              engineering teams who use AI-assisted coding and want to test an
              early version of ArchLens.
            </p>
          </div>

          <form
            noValidate
            onSubmit={handleSubmit}
            className="rounded-lg border border-blue-100 bg-white p-5 shadow-2xl shadow-blue-950/10 sm:p-8"
          >
            {status === "success" && (
              <div
                role="status"
                className="mb-6 rounded-lg border border-emerald-200 bg-emerald-50 p-4 text-emerald-950"
              >
                <div className="flex items-start gap-3">
                  <span className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-emerald-600 text-white">
                    <Check className="h-4 w-4" aria-hidden="true" />
                  </span>
                  <div>
                    <p className="font-semibold">You&apos;re in!</p>
                    <p className="mt-1 text-sm leading-6 text-emerald-800">
                      Welcome to the ArchLens early-access list. We&apos;ll reach out
                      when the first private beta is ready.
                    </p>
                  </div>
                </div>
              </div>
            )}

            {status === "error" && (
              <div
                role="alert"
                className="mb-6 rounded-lg border border-red-200 bg-red-50 p-4 text-sm font-medium text-red-800"
              >
                Something went wrong. Please try again.
              </div>
            )}

            <div className="hidden" aria-hidden="true">
              <label htmlFor="company">Company</label>
              <input
                id="company"
                name="company"
                tabIndex={-1}
                autoComplete="off"
                value={fields.company}
                onChange={(event) => updateField("company", event.target.value)}
              />
            </div>

            <div className="grid gap-5">
              <Field
                id="name"
                label="Name"
                required
                error={errors.name}
                value={fields.name}
                placeholder="Your name"
                onChange={(value) => updateField("name", value)}
              />
              <Field
                id="email"
                label="Email"
                required
                type="email"
                error={errors.email}
                value={fields.email}
                placeholder="you@example.com"
                onChange={(value) => updateField("email", value)}
              />
              <div>
                <label htmlFor="message" className="text-sm font-semibold text-slate-800">
                  Message <span className="font-normal text-slate-500">(optional)</span>
                </label>
                <textarea
                  id="message"
                  name="message"
                  rows={5}
                  value={fields.message}
                  onChange={(event) => updateField("message", event.target.value)}
                  placeholder="Tell us how you use AI coding tools or what you’d like ArchLens to help with."
                  className="mt-2 w-full resize-y rounded-lg border border-slate-300 bg-white px-4 py-3 text-base text-slate-950 shadow-sm transition placeholder:text-slate-400 focus:border-blue-600 focus:outline-none focus:ring-4 focus:ring-blue-100"
                />
              </div>
              <button
                type="submit"
                disabled={isSubmitting}
                className="inline-flex min-h-12 w-full items-center justify-center gap-2 rounded-lg bg-blue-700 px-6 py-3 font-semibold text-white shadow-lg shadow-blue-700/20 transition hover:bg-blue-800 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-700 disabled:cursor-not-allowed disabled:opacity-75"
              >
                {isSubmitting && (
                  <span className="h-4 w-4 animate-spin rounded-full border-2 border-white/40 border-t-white" />
                )}
                {isSubmitting ? "Joining..." : "Join Early Access"}
              </button>
              <p className="text-sm text-slate-500">
                No spam. We&apos;ll only contact you about ArchLens research and early access.
              </p>
            </div>
          </form>
        </div>
      </section>

      <section className="bg-white py-20 sm:py-24">
        <div className="mx-auto max-w-4xl px-5 text-center sm:px-6 lg:px-8">
          <h2 className="text-4xl font-semibold tracking-normal text-slate-950 sm:text-6xl">
            Your codebase has a memory.
            <span className="block text-blue-700">Your tools should too.</span>
          </h2>
          <p className="mx-auto mt-5 max-w-2xl text-lg leading-8 text-slate-600">
            Help us build a better way to understand architecture in AI-assisted software development.
          </p>
          <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
            <button
              type="button"
              onClick={scrollToWaitlist}
              className="inline-flex min-h-12 items-center justify-center gap-2 rounded-lg bg-blue-700 px-6 py-3 font-semibold text-white shadow-xl shadow-blue-700/20 transition hover:-translate-y-0.5 hover:bg-blue-800 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-700"
            >
              Join Early Access
              <ArrowRight className="h-4 w-4" aria-hidden="true" />
            </button>
            <a
              href={SURVEY_URL}
              target="_blank"
              rel="noreferrer"
              className="inline-flex min-h-12 items-center justify-center rounded-lg border border-slate-300 bg-white px-6 py-3 font-semibold text-slate-800 shadow-sm transition hover:-translate-y-0.5 hover:border-blue-300 hover:text-blue-800 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-700"
            >
              Take the Survey
            </a>
          </div>
        </div>
      </section>

      <footer className="border-t border-slate-200 bg-slate-50">
        <div className="mx-auto flex max-w-6xl flex-col gap-8 px-5 py-10 sm:px-6 md:flex-row md:items-start md:justify-between lg:px-8">
          <div>
            <div className="flex items-center gap-2 font-semibold text-slate-950">
              <span className="flex h-9 w-9 items-center justify-center rounded-lg border border-blue-200 bg-blue-50 text-blue-700">
                <Network className="h-4 w-4" aria-hidden="true" />
              </span>
              ArchLens
            </div>
            <p className="mt-3 text-sm text-slate-600">
              Architecture Memory for AI Development.
            </p>
            <p className="mt-6 text-sm text-slate-500">
              © 2026 ArchLens. Early-stage product research.
            </p>
          </div>
          <div className="flex flex-wrap gap-x-6 gap-y-3 text-sm font-medium text-slate-600">
            <a href="#research" className="hover:text-blue-700">Research</a>
            <a href="#early-access" className="hover:text-blue-700">Early Access</a>
          </div>
        </div>
      </footer>
    </main>
  );
}

function Field({
  id,
  label,
  required,
  error,
  value,
  placeholder,
  type = "text",
  onChange,
}: {
  id: string;
  label: string;
  required?: boolean;
  error?: string;
  value: string;
  placeholder: string;
  type?: string;
  onChange: (value: string) => void;
}) {
  const errorId = `${id}-error`;

  return (
    <div>
      <label htmlFor={id} className="text-sm font-semibold text-slate-800">
        {label} {required && <span aria-hidden="true">*</span>}
      </label>
      <input
        id={id}
        name={id}
        type={type}
        required={required}
        aria-invalid={Boolean(error)}
        aria-describedby={error ? errorId : undefined}
        value={value}
        onChange={(event) => onChange(event.target.value)}
        placeholder={placeholder}
        className="mt-2 h-12 w-full rounded-lg border border-slate-300 bg-white px-4 text-base text-slate-950 shadow-sm transition placeholder:text-slate-400 focus:border-blue-600 focus:outline-none focus:ring-4 focus:ring-blue-100"
      />
      {error && (
        <p id={errorId} className="mt-2 text-sm font-medium text-red-700">
          {error}
        </p>
      )}
    </div>
  );
}

function ArchitectureMockup() {
  return (
    <div className="relative mx-auto w-full max-w-xl self-center rounded-xl border border-slate-200 bg-white p-4 shadow-2xl shadow-blue-950/14 sm:p-5">
      <div className="mb-4 flex flex-wrap items-center justify-between gap-3 border-b border-slate-200 pb-4">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.12em] text-slate-500">
            Pull Request
          </p>
          <h2 className="mt-1 text-lg font-semibold text-slate-950">
            PR #142 - Add Payment Refunds
          </h2>
        </div>
        <span className="rounded-full border border-amber-200 bg-amber-50 px-3 py-1 text-xs font-semibold text-amber-800">
          Drift Detected
        </span>
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        <MiniFlow title="Architecture Before" />
        <MiniFlow title="Architecture After" highlight />
      </div>

      <div className="mt-4 rounded-lg border border-amber-200 bg-amber-50 p-4">
        <div className="flex items-start gap-3">
          <AlertTriangle className="mt-0.5 h-5 w-5 shrink-0 text-amber-700" aria-hidden="true" />
          <div>
            <h3 className="font-semibold text-amber-950">Architecture Drift Detected</h3>
            <p className="mt-2 text-sm leading-6 text-amber-900">
              PaymentController now directly depends on UserRepository.
            </p>
            <p className="mt-2 text-sm leading-6 text-amber-900">
              Existing architecture indicates controllers should communicate through services.
            </p>
          </div>
        </div>
      </div>

      <div className="mt-4 flex flex-col gap-3 sm:flex-row">
        <button
          type="button"
          className="inline-flex min-h-11 flex-1 items-center justify-center rounded-lg bg-slate-950 px-4 py-2.5 text-sm font-semibold text-white"
        >
          View Architecture Change
        </button>
        <button
          type="button"
          className="inline-flex min-h-11 flex-1 items-center justify-center rounded-lg border border-slate-300 bg-white px-4 py-2.5 text-sm font-semibold text-slate-800"
        >
          Accept Change
        </button>
      </div>
    </div>
  );
}

function MiniFlow({ title, highlight = false }: { title: string; highlight?: boolean }) {
  return (
    <div className="rounded-lg border border-slate-200 bg-slate-50 p-4">
      <p className="mb-4 text-sm font-semibold text-slate-700">{title}</p>
      <div className="space-y-2">
        {["Orders", "PaymentService", "PaymentRepository"].map((item, index) => (
          <div key={item}>
            <div className="rounded-lg border border-slate-200 bg-white px-3 py-2 text-center text-sm font-medium text-slate-800 shadow-sm">
              {item}
            </div>
            {index < 2 && <div className="py-1 text-center text-slate-400">↓</div>}
          </div>
        ))}
      </div>
      {highlight && (
        <div className="mt-4 rounded-lg border border-red-200 bg-red-50 px-3 py-2 text-sm font-semibold text-red-700">
          PaymentController → UserRepository
        </div>
      )}
    </div>
  );
}

function DiffCard({
  eyebrow,
  caption,
  code,
}: {
  eyebrow: string;
  caption: string;
  code: string[];
}) {
  return (
    <article className="rounded-lg border border-slate-200 bg-white p-6 shadow-sm">
      <div className="mb-5 flex items-center gap-3">
        <Code2 className="h-5 w-5 text-blue-700" aria-hidden="true" />
        <h3 className="font-semibold text-slate-950">{eyebrow}</h3>
      </div>
      <div className="rounded-lg border border-slate-200 bg-slate-950 p-4 font-mono text-sm text-emerald-300">
        {code.map((line) => (
          <div key={line}>{line}</div>
        ))}
      </div>
      <p className="mt-4 text-slate-600">{caption}</p>
    </article>
  );
}

function ArchitectureDiffCard() {
  return (
    <article className="rounded-lg border border-blue-200 bg-white p-6 shadow-lg shadow-blue-950/8">
      <div className="mb-5 flex items-center gap-3">
        <GitPullRequestArrow className="h-5 w-5 text-blue-700" aria-hidden="true" />
        <h3 className="font-semibold text-slate-950">ArchLens Architecture Diff</h3>
      </div>
      <div className="space-y-4 rounded-lg border border-slate-200 bg-slate-50 p-4">
        <div>
          <p className="mb-2 text-xs font-semibold uppercase tracking-[0.12em] text-slate-500">
            Before
          </p>
          <div className="rounded-lg border border-slate-200 bg-white p-3 text-center font-medium text-slate-700">
            Controller → Service → Repository
          </div>
        </div>
        <div>
          <p className="mb-2 text-xs font-semibold uppercase tracking-[0.12em] text-slate-500">
            After
          </p>
          <div className="space-y-2">
            <div className="rounded-lg border border-slate-200 bg-white p-3 text-center font-medium text-slate-700">
              Controller → Service → Repository
            </div>
            <div className="rounded-lg border border-red-200 bg-red-50 p-3 text-center font-semibold text-red-700">
              Controller ───────→ Repository
            </div>
          </div>
        </div>
      </div>
      <div className="mt-4 rounded-lg border border-amber-200 bg-amber-50 px-4 py-3 text-sm font-semibold text-amber-900">
        New architectural dependency introduced
      </div>
      <p className="mt-4 text-slate-600">You see the structural impact.</p>
    </article>
  );
}
