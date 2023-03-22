---
title: My shell functions and shortcuts
date: '2023-3-22'
description: A walkthrough of my shell aliases and functions.
tag: web development, shell, zsh, dev, setup
author: Andrea Bianchi
---

As a front-end web developer, I find myself using the shell quite a lot throughout the day, usually typing the same couple of commands. Therefore, I have created some aliases and functions to make my job easier and to type less. Here are some of my favorites:

## Alias

Let's start with the aliases. They are easier to write and understand, but they are the things that help me (and my keyboard) the most.

```sh
alias ts="ts() {tsc $1 && node $1;};ts()"
alias yd="yarn dev"
alias k="kubectl"
alias tiramisu="docker compose up"
alias post="curl -X POST"
```

### Easy config

```sh
alias zshconfig="vim ~/.zshrc"
alias ohmyzsh="vim ~/.oh-my-zsh"
```

The first two aliases, I don't use them often, but they are handy when I want to edit my zsh config files on the fly, and I'm too lazy to type the `~` character. When I wrote these two aliases, I still used the Italian keyboard - try typing `~` on that! - but nowadays, I use only the international keyboard layout. So, I guess I could get rid of those two aliases, but I keep them because it's more practical for me to type zshconfig. I guess it's the force of habit.

### Better safe than sorry

```sh
alias rm="rm -i"
alias rf="rm -rfi"
```

The next two aliases - `rm` and `rf` - are more of a precaution than a real shortcut. As you may know, the `rm` command is ruthless: it deletes the file or folder you pass to it without even going through the bin. So, sometimes, it has happened that I accidentally deleted some important files.

Learning from my mistakes, I used the aliases to overwrite the command and always use the `-i` flag, so that the shell asks me if I'm really sure before deleting the file(s).

The alias to remove folders is also a helpful shortcut that saves me from the hassle of pressing the mind-bending quantity of 4 key strokes (5 if you count the `-i` flag too).

### The triumph of lazyness
