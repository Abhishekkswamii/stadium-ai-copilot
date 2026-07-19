import { Separator } from "@/components/ui/separator";
import { Github } from "lucide-react";

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-muted/30">
      <div className="container mx-auto px-4 py-12 sm:px-6 lg:px-8">
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
          <div>
            <h3 className="mb-4 text-sm font-semibold">Project</h3>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li>
                <a href="#" className="hover:text-foreground">
                  About
                </a>
              </li>
              <li>
                <a href="/dashboard" className="hover:text-foreground">
                  Dashboard
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-foreground">
                  Documentation
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="mb-4 text-sm font-semibold">Technology</h3>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li>Next.js 15</li>
              <li>Firebase & Firestore</li>
              <li>Gemini 2.5 Flash-Lite</li>
              <li>shadcn/ui</li>
            </ul>
          </div>

          <div>
            <h3 className="mb-4 text-sm font-semibold">Resources</h3>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li>
                <a
                  href="https://github.com/your-username/stadium-ai-copilot"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-foreground"
                >
                  GitHub
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-foreground">
                  PromptWars
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-foreground">
                  License (MIT)
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="mb-4 text-sm font-semibold">Connect</h3>
            <div className="flex gap-4">
              <a
                href="https://github.com/your-username/stadium-ai-copilot"
                target="_blank"
                rel="noopener noreferrer"
                className="text-muted-foreground hover:text-foreground"
                aria-label="GitHub"
              >
                <Github className="h-5 w-5" />
              </a>
            </div>
          </div>
        </div>

        <Separator className="my-8" />

        <div className="flex flex-col items-center justify-between gap-4 text-sm text-muted-foreground sm:flex-row">
          <p>© {currentYear} Stadium AI Copilot. Built for PromptWars.</p>
          <p>
            Powered by{" "}
            <span className="font-semibold text-foreground">Gemini 2.5 Flash-Lite</span>
          </p>
        </div>
      </div>
    </footer>
  );
}
