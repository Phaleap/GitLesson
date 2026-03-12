import { useState } from "react";

const sections = [
  {
    id: "intro",
    level: "🌱 Beginner",
    title: "What is Git?",
    color: "#4ade80",
    content: `Git is a **version control system** — it tracks changes in your files over time, letting you go back to any previous state, collaborate with others, and keep your work safe.

Think of it like **save points in a video game**. Every time you "commit", you create a save point you can return to.`,
    commands: [],
    tip: "Git lives on your machine. GitHub/GitLab are websites that HOST your Git repos online."
  },
  {
    id: "setup",
    level: "🌱 Beginner",
    title: "Setup & Config",
    color: "#4ade80",
    content: "First things first — tell Git who you are. This info gets attached to every commit you make.",
    commands: [
      { cmd: "git config --global user.name \"Your Name\"", desc: "Set your name" },
      { cmd: "git config --global user.email \"you@email.com\"", desc: "Set your email" },
      { cmd: "git config --global core.editor \"code --wait\"", desc: "Use VS Code as editor (optional)" },
      { cmd: "git config --list", desc: "View all your settings" },
    ],
    tip: "On WSL, use your Linux terminal for all git commands. Windows and WSL share git configs if set globally."
  },
  {
    id: "init",
    level: "🌱 Beginner",
    title: "Creating & Cloning Repos",
    color: "#4ade80",
    content: "A **repository (repo)** is just a folder that Git is tracking. You either create a new one or clone an existing one.",
    commands: [
      { cmd: "git init", desc: "Turn current folder into a Git repo" },
      { cmd: "git init my-project", desc: "Create a new folder and init it" },
      { cmd: "git clone https://github.com/user/repo.git", desc: "Copy a remote repo to your machine" },
      { cmd: "git clone <url> my-folder", desc: "Clone into a specific folder name" },
    ],
    tip: "git init creates a hidden .git folder — that's where all the magic is stored. Don't delete it!"
  },
  {
    id: "basics",
    level: "🌱 Beginner",
    title: "The Core Workflow",
    color: "#4ade80",
    content: `The most important cycle in Git: **modify → stage → commit**

**Working Directory** → files you're editing  
**Staging Area** → files ready to be committed  
**Repository** → committed history`,
    commands: [
      { cmd: "git status", desc: "See what's changed / staged" },
      { cmd: "git add filename.txt", desc: "Stage a specific file" },
      { cmd: "git add .", desc: "Stage ALL changed files" },
      { cmd: "git commit -m \"your message here\"", desc: "Save a snapshot with a message" },
      { cmd: "git commit -am \"message\"", desc: "Stage + commit tracked files in one step" },
      { cmd: "git log", desc: "View commit history" },
      { cmd: "git log --oneline", desc: "Compact commit history" },
    ],
    tip: "Write commit messages in present tense: 'Add login page' not 'Added login page'"
  },
  {
    id: "branches",
    level: "🌿 Intermediate",
    title: "Branching",
    color: "#facc15",
    content: `Branches let you work on features or fixes **without touching the main code**. Think of it as a parallel universe for your code.

**main/master** = your stable branch  
**feature branches** = where you experiment`,
    commands: [
      { cmd: "git branch", desc: "List all local branches" },
      { cmd: "git branch feature-login", desc: "Create a new branch" },
      { cmd: "git switch feature-login", desc: "Switch to a branch (modern)" },
      { cmd: "git checkout feature-login", desc: "Switch to a branch (classic)" },
      { cmd: "git switch -c new-feature", desc: "Create AND switch in one step" },
      { cmd: "git branch -d feature-login", desc: "Delete a branch (safe)" },
      { cmd: "git branch -D feature-login", desc: "Force delete a branch" },
    ],
    tip: "Always branch off main for new features. Never commit directly to main in team projects."
  },
  {
    id: "merge",
    level: "🌿 Intermediate",
    title: "Merging & Rebasing",
    color: "#facc15",
    content: `**Merge** = combine two branches, preserving history  
**Rebase** = replay your commits on top of another branch (cleaner history)

Merge is safer. Rebase is cleaner. Use merge for collaboration, rebase for local cleanup.`,
    commands: [
      { cmd: "git merge feature-login", desc: "Merge feature-login into current branch" },
      { cmd: "git merge --no-ff feature", desc: "Force a merge commit (keeps history)" },
      { cmd: "git rebase main", desc: "Rebase current branch onto main" },
      { cmd: "git rebase -i HEAD~3", desc: "Interactive rebase — edit last 3 commits" },
      { cmd: "git merge --abort", desc: "Cancel a merge in progress" },
      { cmd: "git rebase --abort", desc: "Cancel a rebase in progress" },
    ],
    tip: "Never rebase commits that have been pushed to a shared remote — it rewrites history and causes conflicts for teammates."
  },
  {
    id: "remote",
    level: "🌿 Intermediate",
    title: "Working with Remotes",
    color: "#facc15",
    content: `**Remote** = a version of your repo hosted online (GitHub, GitLab, etc.)

**origin** is the default name for the remote you cloned from.`,
    commands: [
      { cmd: "git remote -v", desc: "View your remotes" },
      { cmd: "git remote add origin <url>", desc: "Link a remote to your local repo" },
      { cmd: "git push origin main", desc: "Push commits to remote" },
      { cmd: "git push -u origin main", desc: "Push & set upstream (do once)" },
      { cmd: "git pull", desc: "Fetch + merge remote changes" },
      { cmd: "git fetch", desc: "Download remote changes (don't merge yet)" },
      { cmd: "git push origin --delete feature-branch", desc: "Delete a remote branch" },
    ],
    tip: "git pull = git fetch + git merge. Use git fetch first to see what changed before merging."
  },
  {
    id: "conflicts",
    level: "🌿 Intermediate",
    title: "Resolving Conflicts",
    color: "#facc15",
    content: `Conflicts happen when two branches edit the **same line** of the same file. Git can't decide which version to keep — so it asks YOU.

Git marks conflict zones with **<<<<<<**, **=======**, and **>>>>>>>**`,
    commands: [
      { cmd: "git status", desc: "Find conflicted files (shows 'both modified')" },
      { cmd: "git diff", desc: "See exactly what's conflicting" },
      { cmd: "git add resolved-file.txt", desc: "Mark conflict as resolved" },
      { cmd: "git commit", desc: "Complete the merge after resolving" },
      { cmd: "git checkout --ours file.txt", desc: "Keep YOUR version of a file" },
      { cmd: "git checkout --theirs file.txt", desc: "Keep THEIR version of a file" },
    ],
    tip: "VS Code has a great built-in merge editor — it shows conflicts visually with Accept Current/Incoming buttons."
  },
  {
    id: "stash",
    level: "🔥 Advanced",
    title: "Stashing",
    color: "#f97316",
    content: `**Stash** temporarily shelves your uncommitted changes so you can switch context, then come back to them later.

Perfect when: you need to pull updates, switch branches quickly, or save WIP without committing.`,
    commands: [
      { cmd: "git stash", desc: "Stash current changes" },
      { cmd: "git stash push -m \"wip login form\"", desc: "Stash with a label" },
      { cmd: "git stash list", desc: "View all stashes" },
      { cmd: "git stash pop", desc: "Apply latest stash + remove it" },
      { cmd: "git stash apply stash@{2}", desc: "Apply a specific stash (keep it)" },
      { cmd: "git stash drop stash@{0}", desc: "Delete a specific stash" },
      { cmd: "git stash clear", desc: "Delete ALL stashes" },
    ],
    tip: "git stash pop can cause conflicts just like merges — if it fails, resolve and then run git stash drop."
  },
  {
    id: "undoing",
    level: "🔥 Advanced",
    title: "Undoing Things",
    color: "#f97316",
    content: `One of Git's superpowers — going back in time. Different tools for different situations:

**reset** = move the branch pointer  
**revert** = create a new commit that undoes  
**restore** = discard working directory changes`,
    commands: [
      { cmd: "git restore filename.txt", desc: "Discard unstaged changes in a file" },
      { cmd: "git restore --staged filename.txt", desc: "Unstage a file (keep changes)" },
      { cmd: "git reset HEAD~1", desc: "Undo last commit, keep changes staged" },
      { cmd: "git reset --soft HEAD~1", desc: "Undo commit, keep changes staged" },
      { cmd: "git reset --hard HEAD~1", desc: "Undo commit + DELETE the changes ⚠️" },
      { cmd: "git revert abc1234", desc: "Create a new commit that undoes a commit (safe for shared repos)" },
      { cmd: "git commit --amend -m \"new message\"", desc: "Change the last commit message" },
    ],
    tip: "Never use git reset --hard on pushed commits in shared repos. Use git revert instead — it's non-destructive."
  },
  {
    id: "advanced",
    level: "🔥 Advanced",
    title: "Power Commands",
    color: "#f97316",
    content: `These are the tools that separate good developers from great ones. Use these to keep a clean, professional Git history.`,
    commands: [
      { cmd: "git cherry-pick abc1234", desc: "Apply a specific commit to current branch" },
      { cmd: "git bisect start", desc: "Binary search to find which commit introduced a bug" },
      { cmd: "git reflog", desc: "See ALL actions (your safety net — recovers 'lost' commits)" },
      { cmd: "git shortlog -sn", desc: "See commits per contributor" },
      { cmd: "git log --graph --all --oneline", desc: "Visual branch graph in terminal" },
      { cmd: "git blame filename.txt", desc: "See who wrote each line and when" },
      { cmd: "git tag v1.0.0", desc: "Tag a commit (for releases)" },
      { cmd: "git tag -a v1.0.0 -m \"Release v1.0.0\"", desc: "Annotated tag with message" },
    ],
    tip: "git reflog is your ultimate undo button. Even after git reset --hard, your commits are recoverable for ~90 days."
  },
  {
    id: "wsl",
    level: "💡 WSL Tips",
    title: "Git on WSL",
    color: "#a78bfa",
    content: `Using Git in WSL (Windows Subsystem for Linux) has a few quirks to know about.`,
    commands: [
      { cmd: "git config --global core.autocrlf input", desc: "Fix Windows/Linux line ending issues" },
      { cmd: "git config --global credential.helper store", desc: "Save credentials on WSL" },
      { cmd: "explorer.exe .", desc: "Open current WSL folder in Windows Explorer" },
      { cmd: "cd /mnt/c/Users/YourName/project", desc: "Access Windows files from WSL" },
    ],
    tip: "For best performance, keep your projects INSIDE WSL (~/ directory), not on /mnt/c/. Windows filesystem access is slow."
  }
];

export default function GitGuide() {
  const [active, setActive] = useState("intro");
  const [copied, setCopied] = useState(null);
  const [search, setSearch] = useState("");

  const current = sections.find(s => s.id === active);

  const copyCmd = (cmd) => {
    navigator.clipboard.writeText(cmd);
    setCopied(cmd);
    setTimeout(() => setCopied(null), 1500);
  };

  const filtered = search
    ? sections.flatMap(s => s.commands.map(c => ({ ...c, section: s.title, color: s.color })))
        .filter(c => c.cmd.toLowerCase().includes(search.toLowerCase()) || c.desc.toLowerCase().includes(search.toLowerCase()))
    : [];

  const levels = ["🌱 Beginner", "🌿 Intermediate", "🔥 Advanced", "💡 WSL Tips"];

  return (
    <div style={{
      display: "flex", height: "100vh", background: "#0d1117",
      fontFamily: "'JetBrains Mono', 'Fira Code', monospace", color: "#e6edf3", overflow: "hidden"
    }}>
      {/* Sidebar */}
      <div style={{
        width: 240, background: "#161b22", borderRight: "1px solid #21262d",
        display: "flex", flexDirection: "column", overflow: "hidden"
      }}>
        <div style={{ padding: "20px 16px 12px", borderBottom: "1px solid #21262d" }}>
          <div style={{ fontSize: 18, fontWeight: 700, color: "#f0883e", letterSpacing: -0.5 }}>
            ⎇ git mastery
          </div>
          <div style={{ fontSize: 11, color: "#8b949e", marginTop: 2 }}>WSL Edition</div>
        </div>

        <div style={{ padding: "10px 12px" }}>
          <input
            placeholder="🔍 search commands..."
            value={search}
            onChange={e => setSearch(e.target.value)}
            style={{
              width: "100%", background: "#0d1117", border: "1px solid #30363d",
              borderRadius: 6, padding: "6px 8px", color: "#e6edf3",
              fontSize: 11, outline: "none", boxSizing: "border-box"
            }}
          />
        </div>

        <div style={{ flex: 1, overflowY: "auto", padding: "0 8px 16px" }}>
          {levels.map(level => (
            <div key={level} style={{ marginBottom: 8 }}>
              <div style={{ fontSize: 10, color: "#8b949e", padding: "8px 8px 4px", letterSpacing: 1, textTransform: "uppercase" }}>
                {level}
              </div>
              {sections.filter(s => s.level === level).map(s => (
                <button key={s.id} onClick={() => { setActive(s.id); setSearch(""); }} style={{
                  display: "block", width: "100%", textAlign: "left",
                  background: active === s.id ? "#21262d" : "transparent",
                  border: active === s.id ? `1px solid ${s.color}33` : "1px solid transparent",
                  borderRadius: 6, padding: "7px 10px", cursor: "pointer",
                  color: active === s.id ? s.color : "#8b949e",
                  fontSize: 12, marginBottom: 2, transition: "all 0.15s"
                }}>
                  {s.title}
                </button>
              ))}
            </div>
          ))}
        </div>
      </div>

      {/* Main Content */}
      <div style={{ flex: 1, overflowY: "auto", padding: 32 }}>
        {search ? (
          <div>
            <div style={{ fontSize: 18, fontWeight: 700, marginBottom: 20, color: "#e6edf3" }}>
              Search results for "<span style={{ color: "#f0883e" }}>{search}</span>"
            </div>
            {filtered.length === 0 ? (
              <div style={{ color: "#8b949e" }}>No commands found.</div>
            ) : filtered.map((c, i) => (
              <div key={i} style={{
                background: "#161b22", border: "1px solid #21262d",
                borderRadius: 8, padding: 16, marginBottom: 12
              }}>
                <div style={{ fontSize: 10, color: c.color, marginBottom: 6 }}>{c.section}</div>
                <CommandRow cmd={c} copied={copied} onCopy={copyCmd} />
              </div>
            ))}
          </div>
        ) : current && (
          <div>
            <div style={{ marginBottom: 8 }}>
              <span style={{
                fontSize: 11, background: `${current.color}22`, color: current.color,
                padding: "3px 10px", borderRadius: 20, border: `1px solid ${current.color}44`
              }}>{current.level}</span>
            </div>
            <h1 style={{ fontSize: 28, fontWeight: 800, margin: "8px 0 20px", color: "#e6edf3" }}>
              {current.title}
            </h1>

            <div style={{
              background: "#161b22", border: "1px solid #21262d",
              borderRadius: 10, padding: 20, marginBottom: 24, lineHeight: 1.8
            }}>
              {current.content.split("\n").map((line, i) => (
                <p key={i} style={{ margin: "4px 0", fontSize: 14, color: "#c9d1d9" }}>
                  {line.split(/\*\*(.*?)\*\*/g).map((part, j) =>
                    j % 2 === 1
                      ? <strong key={j} style={{ color: current.color }}>{part}</strong>
                      : part
                  )}
                </p>
              ))}
            </div>

            {current.commands.length > 0 && (
              <div style={{ marginBottom: 24 }}>
                <div style={{ fontSize: 12, color: "#8b949e", marginBottom: 12, letterSpacing: 1 }}>
                  COMMANDS
                </div>
                <div style={{
                  background: "#161b22", border: "1px solid #21262d",
                  borderRadius: 10, overflow: "hidden"
                }}>
                  {current.commands.map((c, i) => (
                    <div key={i} style={{
                      borderBottom: i < current.commands.length - 1 ? "1px solid #21262d" : "none",
                      padding: "14px 18px"
                    }}>
                      <CommandRow cmd={c} copied={copied} onCopy={copyCmd} accentColor={current.color} />
                    </div>
                  ))}
                </div>
              </div>
            )}

            {current.tip && (
              <div style={{
                background: "#1c2128", border: `1px solid ${current.color}44`,
                borderLeft: `3px solid ${current.color}`,
                borderRadius: 8, padding: "14px 18px", fontSize: 13, color: "#8b949e"
              }}>
                <span style={{ color: current.color, fontWeight: 700 }}>💡 Pro Tip: </span>
                {current.tip}
              </div>
            )}

            {/* Nav */}
            <div style={{ display: "flex", justifyContent: "space-between", marginTop: 40 }}>
              {sections.findIndex(s => s.id === active) > 0 && (
                <button onClick={() => setActive(sections[sections.findIndex(s => s.id === active) - 1].id)}
                  style={{
                    background: "#161b22", border: "1px solid #30363d", borderRadius: 8,
                    padding: "10px 18px", color: "#8b949e", cursor: "pointer", fontSize: 13
                  }}>← Previous</button>
              )}
              {sections.findIndex(s => s.id === active) < sections.length - 1 && (
                <button onClick={() => setActive(sections[sections.findIndex(s => s.id === active) + 1].id)}
                  style={{
                    background: current.color, border: "none", borderRadius: 8,
                    padding: "10px 18px", color: "#000", cursor: "pointer",
                    fontSize: 13, fontWeight: 700, marginLeft: "auto"
                  }}>Next →</button>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

function CommandRow({ cmd, copied, onCopy, accentColor = "#4ade80" }) {
  return (
    <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", gap: 12 }}>
      <div style={{ flex: 1 }}>
        <code style={{
          display: "block", fontSize: 13, color: accentColor,
          background: "#0d1117", padding: "6px 10px", borderRadius: 6,
          marginBottom: 5, wordBreak: "break-all"
        }}>{cmd.cmd}</code>
        <span style={{ fontSize: 12, color: "#8b949e" }}>{cmd.desc}</span>
      </div>
      <button onClick={() => onCopy(cmd.cmd)} style={{
        background: copied === cmd.cmd ? "#1a7f37" : "#21262d",
        border: "1px solid #30363d", borderRadius: 6,
        padding: "5px 10px", color: copied === cmd.cmd ? "#3fb950" : "#8b949e",
        cursor: "pointer", fontSize: 11, whiteSpace: "nowrap", flexShrink: 0
      }}>
        {copied === cmd.cmd ? "✓ copied" : "copy"}
      </button>
    </div>
  );
}