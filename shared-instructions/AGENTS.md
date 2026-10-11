# Shared instruction sync rule

When Seb asks to create or change persistent instructions for a project folder, edit the instruction file in that folder. If the folder is in a Git repository with an appropriate GitHub remote, inspect the diff, stage only the intended instruction files, commit the change, push it, and verify that the remote has the new commit. Seb has authorized this workflow for instruction changes. Do not include unrelated working-tree changes or push unrelated local commits.

Prefer one authoritative instruction file per project. On another device, pull the repository before editing and after a change is pushed. If a conflict occurs, reconcile the instructions rather than overwriting either version.

Check repository visibility before adding personal, private, or sensitive context. `Sebastijan-S/GPT-repo` is public and is suitable only for instructions Seb is comfortable publishing. Keep private personal instructions out of that repository; use an agreed private remote for them. If no suitable remote exists, finish the local edit and state clearly that it has not been synced.

This rule applies to instruction files only. It does not authorize pushing other project files or changing repository visibility.
