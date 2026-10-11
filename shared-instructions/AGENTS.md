# Shared instruction sync rule

When Seb asks to create or change persistent instructions for a project folder, edit the instruction file in that folder. If the folder is in a Git repository with an appropriate GitHub remote, inspect the diff, stage only the intended instruction files, commit the change, push it, and verify that the remote has the new commit. Seb has authorized this workflow for instruction changes. Do not include unrelated working-tree changes or push unrelated local commits.

Prefer one authoritative instruction file per project. If the active project folder is outside the Git repository, keep its instruction file in sync with a corresponding copy in the repository. On another device, pull the repository before editing and after a change is pushed. If a conflict occurs, reconcile the instructions rather than overwriting either version.

`Sebastijan-S/GPT-repo` is public. Seb has explicitly authorized publishing and syncing the ME project instructions there, including the personal context they contain. Do not withhold those instructions from the public repository because of an assumed privacy preference. For future additions of sensitive information, make the repository's public visibility clear when relevant and follow Seb's explicit direction. If no suitable remote exists for an instruction file, finish the local edit and state clearly that it has not been synced.

This rule applies to instruction files only. It does not authorize pushing other project files or changing repository visibility.
