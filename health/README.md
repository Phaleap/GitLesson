# 🌿 Git Learning Journey

> A personal repository documenting my progress learning Git & version control from scratch — using WSL on Windows.

---

## 📖 About

This repo tracks my hands-on practice with Git, from basic commands to advanced workflows. Every folder represents a concept I've learned and practiced.

---

## 🗂️ Repository Structure

```
git-learning/
├── 01-basics/          # init, add, commit, log
├── 02-branching/       # branch, switch, merge
├── 03-remotes/         # push, pull, fetch, clone
├── 04-undoing/         # reset, revert, restore, stash
├── 05-advanced/        # rebase, cherry-pick, bisect, tags
└── notes/              # personal notes & cheatsheets
```

---

## 🚀 Getting Started

### Prerequisites

- [WSL](https://learn.microsoft.com/en-us/windows/wsl/install) (Windows Subsystem for Linux)
- Git installed inside WSL

```bash
# Check if Git is installed
git --version

# Install if needed (Ubuntu/Debian)
sudo apt update && sudo apt install git
```

### Initial Setup

```bash
# Configure your identity
git config --global user.name "Your Name"
git config --global user.email "you@email.com"

# Fix Windows/Linux line endings (important for WSL!)
git config --global core.autocrlf input
```

---

## 📚 Topics Covered

| Level | Topic | Status |
|-------|-------|--------|
| 🌱 Beginner | `init`, `add`, `commit`, `log`, `status` | ✅ Done |
| 🌱 Beginner | `.gitignore`, `diff`, `show` | ✅ Done |
| 🌿 Intermediate | Branching & merging | ✅ Done |
| 🌿 Intermediate | Remote repos (GitHub) | 🔄 In Progress |
| 🌿 Intermediate | Resolving conflicts | 🔄 In Progress |
| 🔥 Advanced | Rebase & interactive rebase | ⏳ Upcoming |
| 🔥 Advanced | `stash`, `cherry-pick`, `bisect` | ⏳ Upcoming |
| 🔥 Advanced | Tags & releases | ⏳ Upcoming |

---

## 💡 Key Concepts

### The Core Workflow

```
Working Directory  →  Staging Area  →  Repository
   (edit files)       (git add)        (git commit)
```

### Most Used Commands

```bash
git status                  # See what's changed
git add .                   # Stage all changes
git commit -m "message"     # Save a snapshot
git log --oneline           # View history (compact)
git push origin main        # Push to GitHub
git pull                    # Get latest changes
```

---

## 🛠️ WSL-Specific Tips

- Keep projects **inside WSL** (`~/projects/`) not on `/mnt/c/` — it's much faster
- Use `explorer.exe .` to open current folder in Windows Explorer
- Set up SSH keys inside WSL for GitHub authentication

---

## 📝 Notes

Personal notes and cheatsheets are in the [`/notes`](./notes/) folder.

For a full reference, check out:
- [Official Git Documentation](https://git-scm.com/doc)
- [Pro Git Book](https://git-scm.com/book/en/v2) (free online)
- [GitHub's Git Guides](https://github.com/git-guides)

---

## 👤 Author

**Your Name**  
Learning in public — one commit at a time. 🚀

---

## 📄 License

This project is open source and available under the [MIT License](LICENSE).
