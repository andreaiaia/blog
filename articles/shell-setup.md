---
title: My shell functions and shortcuts
date: '2023-3-22'
description: A walkthrough of my shell aliases and functions.
tag: web development, shell, zsh, dev, setup
author: Andrea Bianchi
---

As a front-end web developer, I find myself using the shell quite a lot throughout the day, usually typing the same couple of commands.

Therefore, I have created some aliases and functions to make my job easier and to type less. Here are some of my favorites:

## Aliases

Let's start with the aliases. They are easier to write and understand, but they are the things that help me (and my keyboard) the most.

### Easy config

```sh
alias zshconfig="vim ~/.zshrc"
alias ohmyzsh="vim ~/.oh-my-zsh"
```

The first two aliases, I don't use them often, but they are handy when I want to edit my zsh config files on the fly, and I'm too lazy to type the `~` character.

When I wrote these two aliases, I still used the Italian keyboard - try typing `~` on that! - but nowadays, I use only the international keyboard layout.

So, I guess I could get rid of those two aliases, but I keep them because it's more practical for me to type zshconfig. I guess it's the force of habit.

### Better safe than sorry

```sh
alias rm="rm -i"
alias rf="rm -rfi"
```

The next two aliases - `rm` and `rf` - are more of a precaution than a real shortcut. As you may know, the `rm` command is ruthless: it deletes the file or folder you pass to it without even going through the bin.

So, sometimes, it has happened that I accidentally deleted some important files.

Learning from my mistakes, I used the aliases to overwrite the command and always use the `-i` flag, so that the shell asks me if I'm really sure before deleting the file(s).

The alias to remove folders is also a helpful shortcut that saves me from the hassle of pressing the mind-bending quantity of 4 key strokes (5 if you count the `-i` flag too).

### The triumph of lazyness

```sh
alias ts="ts() {tsc $1 && node $1;};ts()"
alias yd="yarn dev"
alias yyd="yarn && yarn dev"
alias k="kubectl"
```

Here are some commands I type so often throughout the day that even though they are not particularly long or difficult to type (for example, `yarn dev`), I still find myself getting bored of typing them. So, why not create a shorthand?

### Misc aliases

```sh
alias tiramisu="docker compose up"
alias post="curl -X POST"
```

These last two aliases I rarely use. The first one is just a joke because, being Italian, I love Tiramisu and I have a quirky sense of humor.

The second alias is there because I don't make post requests from the terminal very often, but I still do it from time to time.

I got tired of searching for the syntax on Google every time, so now I just type `post` and the magic happens.

## Functions

> This is where the fun begins!
>
> _Anakin Skywalker_

When aliases are no longer enough, it's time to create some small ad hoc functions. The first functions I wrote were to automate some actions that I was constantly doing in the repositories, not just to speed up the process but also to limit some errors that I kept making.

### Andrea-proof functions

I wrote this first function, `mkbranch`, because I often found myself completing work on a branch and starting a new ticket on another.

Being dumb as only I can be, I would often create the new branch not from the main one, but from the feature branch I was on, forcing me to delete, reset, and curse among the various branches to fix everything when I realized my mistake.

Thanks to this function, I no longer have that problem, as it always creates branches starting from main.

```sh[class="line-numbers"]
# make new branch from main regardless of current branch
function mkbranch() {
    git switch main; echo;
    git pull; echo;
    git switch -c $1; echo;
    gpsup; echo;
}
```

I wrote this function instead because I was annoyed with always having to do the same roundabout to update my feature branches when my colleagues released something on main.

Now when I see that a PR has been approved and merged on main, I run this command and (after resolving any conflicts), go back to my code as if nothing happened.

```sh[class="line-numbers"]
# update the current branch with changes from main
function forward() {
    branch_name=$(git branch --show-current);
    git switch main; echo;
    git pull; echo;
    git switch $branch_name; echo;
    git merge main; echo;
}
```

### Hands off my 3000 port :rage:

Often, even when I close the terminal from which I launched the project I'm working on live, the node process remains active and occupies port 3000.

Usually, I don't realize it until I launch the development server again, and it tells me "port 3000 already in use, using port 3001 instead".

At this point, the hunt for the process that is occupying my precious port 3000 begins.

After googling twice for the command to find the disrespectful process, I decided to create a little function that is easier to remember.

```sh[class="line-numbers"]
# find who is using ports 3000 and 3001 (usually node)
function findPort() {
    echo "running on port " $1 ":"; echo;
    sudo lsof -t -i:$1; echo;
}
```

### Team work makes the dream work

I didn't create the last function, but rather my really skilled colleague, [LordGordon](https://github.com/lordgordon) did.

It's a simple function to be executed weekly (or maybe to be done by a cron job) to keep all the brew packages nice and updated.

Not only is it a really convenient function, but it was the function that inspired me to write all my personalized functions and aliases, so a big high five :hand: to LordGordon!

```sh[class="line-numbers"]
# update brew packages routine
function brewWeekly() {
    brew update; echo;
    brew outdated; echo;
    brew upgrade;
    brew cleanup --prune=0 -s; echo;
    brew doctor -v; echo;
}
```
